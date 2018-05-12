const {
  getUserId,
  getUserData,
  targetStudentDataHelper,
  AuthErrorAction,
  CourseNotFound,
  CourseNoSubSubjectsAdded,
  UserMustBe,
  UserAlreadyEnrolled,
} = require("../../utils");
const {
  FLAGS_NONE,
  USER_TYPE_STUDENT,
  USER_TYPE_MODERATOR,
  COURSE_STATUS_NORMAL,
  MASTERY_DEFAULT_SCORE,
  MASTERY_STATUS_ENABLED,
} = require("../../constants");

const user = {
  async enrollStudent(parent, args, ctx, info) {
    const { callingUserData, targetUserData } =
      targetStudentDataHelper(ctx, args.studentid, "{ id, type, enrollment { id } }");

    // Only a student can be enrolled.
    if (targetUserData.type !== USER_TYPE_STUDENT) {
      throw new UserMustBe(targetUserData.id, "STUDENT");
    }
    // They cannot already be enrolled.
    if (targetUserData.enrollment !== null) {
      throw new UserAlreadyEnrolled(targetUserData.id);
    }
    // A student can enroll themselves and moderators or better can can as well.
    if (callingUserData.id !== targetUserData.id && callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthErrorAction("enrollStudent");
    }

    // Create new Enrollment, connecting to targeted user.
    const enrollment = await ctx.db.mutation.createEnrollment({
      data: {
        student: {
          connect: {
            id: targetUserData.id,
          },
        },
      },
    });

    return {
      id: enrollment.id,
    };
  },

  async assignStudentNewCourse(parent, args, ctx, info) {
    const { callingUserData, targetUserData } =
      await targetStudentDataHelper(ctx, args.studentid, "{ id, type, enrollment { id } }");

    // Only a student can be assigned a course.
    if (targetUserData.type !== USER_TYPE_STUDENT) {
      throw new UserMustBe(targetUserData.id, "STUDENT");
    }
    // A student can assign themselves a Course and moderators or better can as well.
    // TODO let teachers (who are in the SAME CLASSROOM) also assign Courses.
    if (callingUserData.id !== targetUserData.id && callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthErrorAction("assignStudentNewCourse");
    }

    // Create new Course, connecting to targeted Enrollment.
    const course = await ctx.db.mutation.createCourse({
      data: {
        status: FLAGS_NONE,
        flags: COURSE_STATUS_NORMAL,
        parent: {
          connect: {
            id: targetUserData.enrollment.id,
          },
        },
      },
    });

    return {
      id: course.id,
    };
  },

  async assignCourseNewSubSubjects(parent, args, ctx, info) {
    const callingUserId = await getUserId(ctx);
    const callingUserData = await getUserData(ctx, callingUserId, "{ id, type }");
    const targetCourseData = await ctx.db.query.course({ where: { id: args.courseid } }, `
      {
        id
        parent {
          student {
            id
          }
        }
        masteries {
          subSubject {
            id 
          }
        }
      }
    `);

    // Check the course exists.
    if (targetCourseData === null) {
      throw new CourseNotFound(args.courseid);
    }
    // A student can assign new SubSubjects and moderators or better can as well.
    // TODO let teachers (who are in the SAME CLASSROOM) also assign SubSubjects.
    if (callingUserData.id !== targetCourseData.parent.student.id &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthErrorAction("assignCourseNewSubSubjects");
    }

    // Only act on SubSubjects that are not already listed in masteries
    const existingSubSubjectIds =
      targetCourseData.masteries.map(mastery => mastery.subSubject.id);
    const newSubSubjectIds =
      args.subsubjects.filter(newSubSubjectId => !existingSubSubjectIds.includes(newSubSubjectId));

    // If no SubSubjects are being added throw an error. Common situation might be where this
    // mutation is run twice by accident.
    if (newSubSubjectIds.length === 0) {
      throw new CourseNoSubSubjectsAdded(targetCourseData.id);
    }

    // Construct create statements for each targeted SubSubject
    const newMasteries = newSubSubjectIds.map(subSubjectId => (
      {
        status: MASTERY_STATUS_ENABLED,
        score: MASTERY_DEFAULT_SCORE,
        subSubject: {
          connect: {
            id: subSubjectId,
          },
        },
      }
    ));

    const updateCourse = ctx.db.mutation.updateCourse({
      where: { id: args.courseid },
      data: {
        masteries: {
          create: newMasteries,
        },
      },
    });

    return {
      success: true,
    };
  },

};


module.exports = { user };
