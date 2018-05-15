const {
  targetStudentDataHelper,
} = require("../../utils");
const {
  AuthErrorAction,
  UserMustBe,
  UserAlreadyEnrolled,
} = require("../../errors");
const {
  FLAGS_NONE,
  USER_TYPE_STUDENT,
  USER_TYPE_TEACHER,
  USER_TYPE_MODERATOR,
  COURSE_STATUS_ACTIVE,
} = require("../../constants");

const student = {
  async enrollStudent(parent, args, ctx, info) {
    const { callingUserData, targetUserData } =
      await targetStudentDataHelper(ctx, args.studentid, "{ id, type, enrollment { id } }");

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
    }, info);

    return enrollment;
  },

  async assignStudentNewCourse(parent, args, ctx, info) {
    const { callingUserData, targetUserData } =
      await targetStudentDataHelper(ctx, args.studentid, `
        {
          id
          type
          enrollment {
            id
          }
          classrooms {
            id
            users {
              id
              type
            }
          }
        }
      `);

    // Only a student can be assigned a course.
    if (targetUserData.type !== USER_TYPE_STUDENT) {
      throw new UserMustBe(targetUserData.id, "STUDENT");
    }

    // We grab the target student's classrooms' teachers
    const teachers = [];
    targetUserData.classrooms.forEach((classroom) => {
      teachers.push(...classroom.users.filter(user =>
        user.type === USER_TYPE_TEACHER).map(user => user.id));
    });
    // A student can assign themselves a Course and their teacher, moderators, or better can as well
    if (callingUserData.id !== targetUserData.id &&
      !teachers.includes(callingUserData.id) &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthErrorAction("assignStudentNewCourse");
    }

    // Create new Course, connecting to targeted Enrollment.
    const course = await ctx.db.mutation.createCourse({
      data: {
        status: FLAGS_NONE,
        flags: COURSE_STATUS_ACTIVE,
        parent: {
          connect: {
            id: targetUserData.enrollment.id,
          },
        },
      },
    }, info);

    return course;
  },

};


module.exports = { student };
