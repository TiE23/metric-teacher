const {
  checkAuth,
} = require("../../utils");

const {
  FEEDBACK_MAXIMUM_LENGTH,
  USER_STATUS_NORMAL,
  USER_TYPE_STUDENT,
  USER_TYPE_MODERATOR,
  USER_FLAG_DISALLOW_FEEDBACK_SUBMISSION,
  FEEDBACK_STATUS_UNREVIEWED,
} = require("../../constants");

const {
  InputLengthAboveMaximum,
} = require("../../errors");

const feedback = {
  /**
   * Simple mutation allows one to submit Feedback for a Question. All normal users can use this.
   * @param parent
   * @param args
   *        questionid: ID!
   *        type: Int!
   *        text: String
   * @param ctx
   * @param info
   * @returns Feedback!
   */
  async submitFeedback(parent, args, ctx, info) {
    const callingUserData = await checkAuth(ctx, {
      type: USER_TYPE_STUDENT,
      status: USER_STATUS_NORMAL,
      flagExclude: USER_FLAG_DISALLOW_FEEDBACK_SUBMISSION,
      action: "submitFeedback",
    });

    if (args.text && args.text.length > FEEDBACK_MAXIMUM_LENGTH) {
      throw new InputLengthAboveMaximum("text", FEEDBACK_MAXIMUM_LENGTH);
    }

    // Fire off the mutation.
    return ctx.db.mutation.createFeedback({
      data: {
        question: {
          connect: { id: args.questionid },
        },
        author: {
          connect: { id: callingUserData.id },
        },
        type: args.type,
        status: FEEDBACK_STATUS_UNREVIEWED,
        text: args.text,
      },
    }, info);
  },


  /**
   * Simple mutation updates the status of a Feedback row. Useful if they've completed a review of
   * a piece of user-submitted Feedback.
   * For moderators or better only.
   * @param parent
   * @param args
   *        feedbackid: ID!
   *        status: Int!
   * @param ctx
   * @param info
   * @returns Feedback!
   */
  async updateFeedbackStatus(parent, args, ctx, info) {
    const callingUserData = await checkAuth(ctx, {
      type: USER_TYPE_MODERATOR,
      status: USER_STATUS_NORMAL,
      flagExclude: USER_FLAG_DISALLOW_FEEDBACK_SUBMISSION,
      action: "updateFeedbackStatus",
    });

    // Fire off the mutation.
    return ctx.db.mutation.updateFeedback({
      where: { id: args.feedbackid },
      data: {
        status: args.status,
        reviewer: {
          connect: {
            id: callingUserData.id,
          },
        },
      },
    }, info);
  },
};

module.exports = { feedback };
