const {
  targetStudentDataHelper,
  AuthErrorAction,
  UserMustBe,
  UserAlreadyEnrolled,
} = require("../../utils");
const {
  FLAGS_NONE,
  USER_TYPE_STUDENT,
  USER_TYPE_MODERATOR,
  COURSE_STATUS_NORMAL,
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
    // A student can enroll themselves and moderators or better can enroll students.
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
    // A student can enroll themselves and moderators or better can enroll students.
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

};


module.exports = { user };
