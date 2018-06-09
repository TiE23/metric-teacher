const {
  getUserId,
} = require("../../utils");

const user = {
  /**
   * Standard 'me' query. Without needing to input anything returns PrivateUser type.
   * @param parent
   * @param args
   *        (none)
   * @param ctx
   * @param info
   * @returns PrivateUser
   */
  me(parent, args, ctx, info) {
    const id = getUserId(ctx);
    return ctx.db.query.user({ where: { id } }, info);
  },
};

module.exports = { user };
