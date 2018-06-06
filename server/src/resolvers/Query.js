const {
  getUserId,
  checkAuth,
} = require("../utils");
const { qaGenerate } = require("../logic/qaGenerator");

const Query = {
  me(parent, args, ctx, info) {
    const id = getUserId(ctx);
    return ctx.db.query.user({ where: { id } }, info);
  },

  async allSubjects(parent, args, ctx, info) {
    // TODO No auth check
    const subjects = await ctx.db.query.subjects({}, info);

    return subjects;
  },

  async testGetQa(parent, args, ctx, info) {
    checkAuth(ctx, 0);  // Will throw AuthError if user is logged out
    const questionObject = await ctx.db.query.question(
      { where: { id: args.questionid } },
      `{
        id
        type
        status
        flags
        difficulty
        question
        answer
        media
        parent {
          id
        }
      }`,
    );

    // TODO support user survey responses

    return qaGenerate(questionObject);

  },
};

module.exports = { Query };
