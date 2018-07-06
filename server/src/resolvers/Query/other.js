const {
  QUESTION_STATUS_ACTIVE,
} = require("../../constants");

const other = {
  /**
   * Simple query that returns a string containing the date (to show freshness) and the number of
   * active questions in the database (to show actual database information) without requiring any
   * authorization as a way to provide an easy API access point for very early testing purposes.
   * TODO - Remove this when the client is working.
   * @param parent
   * @param args
   * @param ctx
   * @returns String!
   */
  async ping(parent, args, ctx) {
    const questions =
      await ctx.db.query.questions({ where: { status: QUESTION_STATUS_ACTIVE } }, "{ id }");

    const now = new Date(Date.now());
    return `Hello! It is ${now.toString()} and there are ${questions.length} questions!`;
  },
};

module.exports = { other };
