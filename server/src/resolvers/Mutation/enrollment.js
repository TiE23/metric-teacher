const {
  targetStudentDataHelper,
  checkAuth,
} = require("../../utils");

const {
  AuthError,
  UserMustBe,
  StudentAlreadyEnrolled,
} = require("../../errors");

const {
  USER_STATUS_NORMAL,
  USER_TYPE_STUDENT,
  USER_TYPE_MODERATOR,
  USER_TYPE_ADMIN,
} = require("../../constants");


const enrollment = {
  /**
   * Gives a student a new Enrollment and immediately gives them a new Course and sets it as active.
   * @param parent
   * @param args
   *        studentid: ID!
   * @param ctx
   * @param info
   * @returns Enrollment!
   */
  async enrollStudent(parent, args, ctx, info) {
    // Block teachers and non-normal users.
    await checkAuth(ctx, {
      type: [USER_TYPE_STUDENT, USER_TYPE_MODERATOR, USER_TYPE_ADMIN],
      status: USER_STATUS_NORMAL,
      action: "deactivateCourse",
    });

    const { callingUserData, targetUserData } =
      await targetStudentDataHelper(ctx, args.studentid, "{ id, type, enrollment { id } }");

    // Only a student can be enrolled.
    if (targetUserData.type !== USER_TYPE_STUDENT) {
      throw new UserMustBe(targetUserData.id, "STUDENT");
    }
    // A student can enroll themselves and moderators or better can can as well.
    if (callingUserData.id !== targetUserData.id &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthError(null, "enrollStudent");
    }
    // They cannot already be enrolled.
    if (targetUserData.enrollment !== null) {
      throw new StudentAlreadyEnrolled(targetUserData.id);
    }

    // Create new Enrollment, connecting to targeted user.
    return ctx.db.mutation.createEnrollment({
      data: {
        student: {
          connect: {
            id: targetUserData.id,
          },
        },
      },
    }, info);
  },
};


module.exports = { enrollment };
