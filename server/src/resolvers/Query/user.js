const {
  getUserId,
  checkAuth,
} = require("../../utils");

const {
  GraphQlDumpWarning,
} = require("../../errors");

const {
  USER_STATUS_NORMAL,
  USER_TYPE_MODERATOR,
} = require("../../constants");

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


  /**
   * Get the PrivateUser data of a user account. For moderators and better only.
   * @param parent
   * @param args
   *        userid: ID!
   * @param ctx
   * @param info
   * @return PrivateUser
   */
  async user(parent, args, ctx, info) {
    // Must be logged in moderator or better and normal
    await checkAuth(
      ctx,
      {
        type: USER_TYPE_MODERATOR,
        status: USER_STATUS_NORMAL,
        action: "user",
      },
    );

    if (!args.userid) {
      throw new GraphQlDumpWarning("query", "user");
    }

    // TODO teacher support

    return ctx.db.query.user({ where: { id: args.userid } }, info);
  },


  /**
   * Get the PrivateUser data of multiple user accounts by their ID. For moderators and better only.
   * @param parent
   * @param args
   *        userids: [ID!]!
   * @param ctx
   * @param info
   * @returns [PrivateUser!]!
   */
  async users(parent, args, ctx, info) {
    // Must be logged in moderator or better and normal
    await checkAuth(
      ctx,
      {
        type: USER_TYPE_MODERATOR,
        status: USER_STATUS_NORMAL,
        action: "users",
      },
    );

    if (!Array.isArray(args.userids) || args.userids.length < 1) {
      throw new GraphQlDumpWarning("query", "users");
    }

    // TODO teacher support

    const queryClause = {
      where: {
        OR: args.userids.map(userId => ({ id: userId })),
      },
    };

    return ctx.db.query.users(queryClause, info);
  },


  /**
   * Get the PrivateUser data of multiple user accounts. For moderators and better only.
   * Exposes Prisma Query parameters.
   * @param parent
   * @param args
   *        where: UserWhereInput
   *        orderBy: UserOrderByInput
   *        skip: Int
   *        after: String
   *        before: String
   *        first: Int
   *        last: Int
   * @param ctx
   * @param info
   * @returns [PrivateUser]!
   */
  async userSearch(parent, args, ctx, info) {
    // Must be logged in moderator or better and normal
    await checkAuth(
      ctx,
      {
        type: USER_TYPE_MODERATOR,
        status: USER_STATUS_NORMAL,
        action: "userSearch",
      },
    );

    return ctx.db.query.users(args, info);
  },
};

module.exports = { user };
