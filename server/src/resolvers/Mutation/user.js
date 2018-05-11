const {
  getUserId,
  getUserData,
  AuthErrorAction,
  UserMustBe,
  UserAlreadyEnrolled,
} = require("../../utils");
const {
  USER_TYPE_STUDENT,
  USER_TYPE_MODERATOR
} = require("../../constants");

const user = {
  async enrollStudent(parent, args, ctx, info) {
    const callingUserId = getUserId(ctx); // User must be logged in.
    const callingUserData = await getUserData(ctx, callingUserId, "{ id, type }");
    const targetUserData = await getUserData(ctx, args.studentid, "{ id, type, enrollment { id } }");

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
      throw new AuthErrorAction();
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
};


module.exports = { user };
