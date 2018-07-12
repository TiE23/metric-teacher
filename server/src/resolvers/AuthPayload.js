const AuthPayload = {
  async user(parent, args, ctx, info) {
    return ctx.db.query.user({ where: { id: parent.user.id } }, info);
  },
};

module.exports = { AuthPayload };
