const { getUserId } = require("../utils");

const Query = {
  me(parent, args, ctx, info) {
    const id = getUserId(ctx);
    return ctx.db.query.user({ where: { id } }, info);
  },

  async allSubjects(parent, args, ctx, info) {
    const subjects = await ctx.db.query.subjects({}, info);

    return subjects;
  },
};

module.exports = { Query };
