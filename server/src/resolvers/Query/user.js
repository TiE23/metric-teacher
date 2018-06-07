const {
  getUserId,
} = require("../../utils");

const user = {
  me(parent, args, ctx, info) {
    const id = getUserId(ctx);
    return ctx.db.query.user({ where: { id } }, info);
  },
};

module.exports = { user };
