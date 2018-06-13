const {
  checkAuth,
} = require("../../utils");

const {
  GraphQlDumpWarning,
} = require("../../errors");

const {
  USER_TYPE_TEACHER,
  USER_STATUS_NORMAL,
} = require("../../constants");

const question = {
  /**
   * Get a Question by ID. For teachers and better only.
   * @param parent
   * @param args
   *        questionid: ID!
   * @param ctx
   * @param info
   * @returns Question
   */
  async question(parent, args, ctx, info) {
    // Need to be teacher or better and normal.
    await checkAuth(ctx, {
      type: USER_TYPE_TEACHER,
      status: USER_STATUS_NORMAL,
      action: "question",
    });

    if (!args.questionid) {
      throw new GraphQlDumpWarning("query", "question");
    }

    return ctx.db.query.question({ where: { id: args.questionid } }, info);
  },


  /**
   * Get a list of Questions by a list of IDs. For teachers and better only.
   * @param parent
   * @param args
   *        questionids: [ID!]!
   * @param ctx
   * @param info
   * @returns [Question]!
   */
  async questions(parent, args, ctx, info) {
    // Need to be teacher or better and normal.
    await checkAuth(ctx, {
      type: USER_TYPE_TEACHER,
      status: USER_STATUS_NORMAL,
      action: "questions",
    });

    if (!Array.isArray(args.questionids) || args.questionids.length < 1) {
      throw new GraphQlDumpWarning("query", "questions");
    }

    const queryClause = {
      where: {
        OR: args.questionids.map(questionId => ({ id: questionId })),
      },
    };

    return ctx.db.query.question(queryClause, info);
  },


  /**
   * Get a list of Questions by Prisma query search parameters. For teachers and better only.
   * @param parent
   * @param args
   *        where: QuestionWhereInput
   *        orderBy: QuestionOrderByInput
   *        skip: Int
   *        after: String
   *        before: String
   *        first: Int
   *        last: Int
   * @param ctx
   * @param info
   * @returns [Question]!
   */
  async questionSearch(parent, args, ctx, info) {
    // Need to be teacher or better and normal.
    await checkAuth(ctx, {
      type: USER_TYPE_TEACHER,
      status: USER_STATUS_NORMAL,
      action: "questionSearch",
    });

    return ctx.db.quesy.question(args, info);
  },
};

module.exports = { question };
