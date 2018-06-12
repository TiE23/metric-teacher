const {
  checkAuth,
} = require("../../utils");

const {
  GraphQlDumpWarning,
} = require("../../errors");

const {
  USER_TYPE_MODERATOR,
  USER_STATUS_NORMAL,
} = require("../../constants");

const classroom = {
  /**
   * Get a classroom by a single classroomid. For moderators or better only. Students and Teachers
   * can get it through me().
   * @param parent
   * @param args
   *        classroomid: ID!
   * @param ctx
   * @param info
   * @returns Classroom
   */
  async classroom(parent, args, ctx, info) {
    // Must be moderator or better and normal.
    await checkAuth(
      ctx,
      {
        type: USER_TYPE_MODERATOR,
        status: USER_STATUS_NORMAL,
        action: "classroom",
      },
    );

    if (!args.classroomid) {
      throw new GraphQlDumpWarning("query", "classroom");
    }

    return ctx.db.query.classroom({ where: { id: args.classroomid } }, info);
  },


  /**
   * Get a list of Classrooms by their IDs. For moderators or better only. Students and Teachers
   * can get them through me().
   * @param parent
   * @param args
   *        classroomids: [ID!]!
   * @param ctx
   * @param info
   * @returns [Classroom]!
   */
  async classrooms(parent, args, ctx, info) {
    // Must be moderator or better and normal.
    await checkAuth(
      ctx,
      {
        type: USER_TYPE_MODERATOR,
        status: USER_STATUS_NORMAL,
        action: "classrooms",
      },
    );

    if (!Array.isArray(args.classroomids) || args.classroomids.length < 1) {
      throw new GraphQlDumpWarning("query", "classrooms");
    }

    const queryClause = {
      where: {
        OR: args.classroomids.map(classroomId => ({ id: classroomId })),
      },
    };

    return ctx.db.query.classrooms(queryClause, info);
  },


  /**
   * Get a list of Classrooms by Prisma query search parameters. For Moderators or better only.
   * Students and Teachers can get them through me().
   * @param parent
   * @param args
   * @param ctx
   * @param info
   * @returns [Classroom]!
   */
  async classroomSearch(parent, args, ctx, info) {
    // Must be moderator or better and normal.
    await checkAuth(
      ctx,
      {
        type: USER_TYPE_MODERATOR,
        status: USER_STATUS_NORMAL,
        action: "classroomSearch",
      },
    );

    return ctx.db.query.subjects(args, info);
  },
};

module.export = { classroom };
