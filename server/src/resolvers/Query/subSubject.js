const {
  checkAuth,
} = require("../../utils");

const {
  GraphQlDumpWarning,
} = require("../../errors");

const {
  USER_TYPE_STUDENT,
  USER_STATUS_NORMAL,
} = require("../../constants");

const subSubject = {
  /**
   * Get all SubSubjects. For anyone logged-in and normal.
   * @param parent
   * @param args
   * @param ctx
   * @param info
   * @returns [SubSubject]!
   */
  async allSubSubjects(parent, args, ctx, info) {
    // Need to be logged-in and normal.
    await checkAuth(ctx, {
      type: USER_TYPE_STUDENT,
      status: USER_STATUS_NORMAL,
      action: "allSubSubjects",
    });

    return ctx.db.query.subSubjects({}, info);
  },


  /**
   * Get a SubSubject by ID. For anyone logged-in and normal.
   * @param parent
   * @param args
   *        subsubjectid: ID!
   * @param ctx
   * @param info
   * @returns SubSubject
   */
  async subSubject(parent, args, ctx, info) {
    // Need to be logged-in and normal.
    await checkAuth(ctx, {
      type: USER_TYPE_STUDENT,
      status: USER_STATUS_NORMAL,
      action: "subSubject",
    });

    if (!args.subsubjectid) {
      throw new GraphQlDumpWarning("query", "subsubject");
    }

    return ctx.db.query.subSubject({ where: { id: args.subsubjectid } }, info);
  },


  /**
   * Get a list of SubSubjects by a list of IDs. For anyone logged-in and normal.
   * @param parent
   * @param args
   *        subsubjectids: [ID!]!
   * @param ctx
   * @param info
   * @returns [SubSubject]!
   */
  async subSubjects(parent, args, ctx, info) {
    // Need to be logged-in and normal.
    await checkAuth(ctx, {
      type: USER_TYPE_STUDENT,
      status: USER_STATUS_NORMAL,
      action: "subSubjects",
    });

    if (!Array.isArray(args.subsubjectids) || args.subsubjectids.length < 1) {
      throw new GraphQlDumpWarning("query", "subSubjects");
    }

    const queryClause = {
      where: {
        OR: args.subsubjectids.map(subSubjectId => ({ id: subSubjectId })),
      },
    };

    return ctx.db.query.subSubjects(queryClause, info);
  },


  /**
   * Get a list of SubSubjects by Prisma query search parameters. For anyone logged-in and normal.
   * @param parent
   * @param args
   *        where: SubSubjectWhereInput
   *        orderBy: SubSubjectOrderByInput
   *        skip: Int
   *        after: String
   *        before: String
   *        first: Int
   *        last: Int
   * @param ctx
   * @param info
   * @returns [SubSubject]!
   */
  async subSubjectSearch(parent, args, ctx, info) {
    // Need to be logged-in and normal.
    await checkAuth(ctx, {
      type: USER_TYPE_STUDENT,
      status: USER_STATUS_NORMAL,
      action: "allSubSubjects",
    });

    return ctx.db.query.subSubjects(args, info);
  },
};

module.exports = { subSubject };
