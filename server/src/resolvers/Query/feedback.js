const {
  checkAuth,
} = require("../../utils");

const {
  USER_TYPE_MODERATOR,
  USER_STATUS_NORMAL,
} = require("../../constants");

const feedback = {
  /**
   * Get a list of Feedbacks by Prisma query search parameters.
   * For Moderators or better only because Feedback is typically only a Moderator thing.
   * A Student, for example, can look at their own Feedback through their me() query.
   * @param parent
   * @param args
   *        where: FeedbackWhereInput
   *        orderBy: FeedbackOrderByInput
   *        skip: Int
   *        after: String
   *        before: String
   *        first: Int
   *        last: Int
   * @param ctx
   * @param info
   * @returns [Feedback]!
   */
  async feedbackSearch(parent, args, ctx, info) {
    // Must be moderator or better and normal.
    await checkAuth(ctx, {
      type: USER_TYPE_MODERATOR,
      status: USER_STATUS_NORMAL,
      action: "feedbackSearch",
    });

    return ctx.db.query.feedbacks(args, info);
  },
};

module.exports = { feedback };
