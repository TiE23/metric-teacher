const {
  getUserData,
  getUsersData,
  checkAuth,
} = require("../../utils");

const {
  AuthErrorAction,
  UserMustBe,
  ClassroomNotFound,
  ClassroomNoUsersAdded,
  ClassroomNoUsersRemoved,
} = require("../../errors");

const {
  FLAGS_NONE,
  USER_TYPE_TEACHER,
  USER_TYPE_MODERATOR,
  CLASSROOM_STATUS_ACTIVE,
  COURSE_STATUS_ACTIVE,
} = require("../../constants");


const classroom = {
  /**
   * Create a classroom for a teacher. This is typically expected behavior for Teachers
   * @param parent
   * @param args
   *        name: String!
   *        description: String!
   *        teacherid: ID!
   * @param ctx
   * @param info
   * @returns Classroom!
   */
  async createClassroom(parent, args, ctx, info) {
    const callingUserData = await checkAuth(ctx, {
      type: USER_TYPE_TEACHER,
      action: "createClassroom",
    });

    // A teacher can create new Classrooms and moderators or better can as well.
    if (callingUserData.id !== args.teacherid &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthErrorAction("createClassroom");
    }

    // Only teachers can be teachers of a classroom, so make sure the teacherid
    // does indeed belong to a teacher.
    const teacherData = await getUserData(ctx, args.teacherid, "{ type }");
    if (teacherData.type !== USER_TYPE_TEACHER) {
      throw new UserMustBe(args.teacherid, "TEACHER");
    }

    return ctx.db.mutation.createClassroom({
      data: {
        name: args.name,
        description: args.description || "",
        status: CLASSROOM_STATUS_ACTIVE,
        flags: FLAGS_NONE,
        notes: "",
        teachers: {
          connect: {
            id: args.teacherid,
          },
        },
      },
    }, info);
  },


  /**
   * Add users (students or teachers) to a classroom.
   * Uses helper function changeClassroomMembers.
   * @param parent
   * @param args
   *        classroomid: ID!
   *        userids: [ID!]!
   * @param ctx
   * @param info
   * @returns Classroom!
   */
  async addUsersToClassroom(parent, args, ctx, info) {
    return changeClassroomMembers(parent, args, ctx, info, true, "addUsersToClassroom");
  },


  /**
   * Remove users (students or teachers) from a classroom.
   * Uses helper function changeClassroomMembers.
   * @param parent
   * @param args
   *        classroomid: ID!
   *        userids: [ID!]!
   * @param ctx
   * @param info
   * @returns Classroom!
   */
  async removeUsersFromClassroom(parent, args, ctx, info) {
    return changeClassroomMembers(parent, args, ctx, info, false, "removeUsersFromClassroom");
  },
};

/**
 * Only teachers (or better) can add students to classrooms they are teachers of.
 * Teachers cannot remove students from classrooms where the student's active course is not
 * in that classroom.
 * @param parent
 * @param args
 *        classroomid: ID!
 *        userids: [ID!]!
 * @param ctx
 * @param info
 * @param addUsers
 * @returns Classroom!
 */
async function changeClassroomMembers(parent, args, ctx, info, addUsers, actionName) {
  const callingUserData = await checkAuth(ctx, {
    type: USER_TYPE_TEACHER,
    action: actionName,
  });

  // TODO add support for adding by email in addition to by ID
  // Big note: Only grabs students where their course that connects to the classroom is active.
  const targetClassroomData = await ctx.db.query.classroom(
    { where: { id: args.classroomid } },
    `{
      id
      studentCourses (where: {
        status: ${COURSE_STATUS_ACTIVE}
      }) {
        id
        parent {
          student {
            id 
          }
        }
      }
      teachers {
        id
      }
    }`,
  );

  // Check the Classroom exists.
  if (targetClassroomData === null) {
    throw new ClassroomNotFound(args.classroomid);
  }
  // Grab the existing teachers and students.
  const classroomTeachers = targetClassroomData.teachers.map(teacher => teacher.id);
  const classroomStudents = targetClassroomData.studentCourses.map(course =>
    course.parent.student.id);

  // A teacher of the classroom can change a Classroom and moderators or better can as well.
  if (!classroomTeachers.includes(callingUserData.id) &&
    callingUserData.type < USER_TYPE_MODERATOR) {
    if (addUsers) {
      throw new AuthErrorAction("addUsersToClassroom");
    } else {
      throw new AuthErrorAction("removeUsersFromClassroom");
    }
  }

  let targetUserIds = null;
  if (addUsers) {
    // Don't attempt to add any teachers/students a second time.
    targetUserIds = args.userids.filter(userId =>
      !classroomTeachers.includes(userId) && !classroomStudents.includes(userId));
  } else {
    // Don't attempt to remove any teachers/students not in the Classroom.
    targetUserIds = args.userids.filter(userId =>
      classroomTeachers.includes(userId) || classroomStudents.includes(userId));
  }

  // If no Users are being added/removed throw an error. Common situation might be where this
  // mutation is run twice in a row by accident.
  if (targetUserIds.length === 0) {
    if (addUsers) {
      throw new ClassroomNoUsersAdded(targetClassroomData.id);
    } else {
      throw new ClassroomNoUsersRemoved(targetClassroomData.id);
    }
  }

  // Now we need to figure out which userIds are students and which are teachers.
  const targetUsersData = await getUsersData(
    ctx,
    targetUserIds,
    `{
      id
      type
      enrollment {
        courses (where: {
          status: ${COURSE_STATUS_ACTIVE}
        }, first: 1) {
          id
        }
      } 
    }`,
  );

  // Grab the course IDs
  const targetCourses = targetUsersData.map(user =>
    (user.enrollment && user.enrollment.courses &&
      user.enrollment.courses.length && user.enrollment.courses[0].id)).filter(id => id !== false);

  // Grab the teacher IDs
  const targetTeachers = targetUsersData.filter(user =>
    user.type === USER_TYPE_TEACHER).map(user => user.id);

  // Construct connect statements for each targeted User
  const targetCoursesIdList = targetCourses.map(id => ({ id }));
  const targetTeachersIdList = targetTeachers.map(id => ({ id }));

  let courseList = null;
  let teacherList = null;
  if (addUsers) {
    courseList = { connect: targetCoursesIdList };
    teacherList = { connect: targetTeachersIdList };
  } else {
    courseList = { disconnect: targetCoursesIdList };
    teacherList = { disconnect: targetTeachersIdList };
  }

  // Perform the update
  return ctx.db.mutation.updateClassroom({
    where: { id: targetClassroomData.id },
    data: {
      studentCourses: courseList,
      teachers: teacherList,
    },
  }, info);
}


module.exports = { classroom };
