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

const subject = {
  /**
   * Get a list of all Subjects. For logged-in and normal users only.
   * @param parent
   * @param args
   *        (NONE)
   * @param ctx
   * @param info
   * @returns [Subject]!
   */
  async allSubjects(parent, args, ctx, info) {
    // Must be logged in and normal
    await checkAuth(ctx, {
      type: USER_TYPE_STUDENT,
      status: USER_STATUS_NORMAL,
      action: "allSubjects",
    });

    return ctx.db.query.subjects({}, info);
  },


  /**
   * Get a Subject by a single ID. For logged in and normal.
   * @param parent
   * @param args
   *        subjectid: ID!
   * @param ctx
   * @param info
   * @returns Subject
   */
  async subject(parent, args, ctx, info) {
    // Must be logged in and normal
    await checkAuth(ctx, {
      type: USER_TYPE_STUDENT,
      status: USER_STATUS_NORMAL,
      action: "subject",
    });

    if (!args.subjectid) {
      throw new GraphQlDumpWarning("query", "subject");
    }

    return ctx.db.query.subject({ where: { id: args.subjectid } }, info);
  },


  /**
   * Get a list of Subjects by their IDs. For logged-in and normal users only.
   * @param parent
   * @param args
   *        subjectids: [ID!]!
   * @param ctx
   * @param info
   * @returns [Subject]!
   */
  async subjects(parent, args, ctx, info) {
    // Must be logged in and normal
    await checkAuth(ctx, {
      type: USER_TYPE_STUDENT,
      status: USER_STATUS_NORMAL,
      action: "subjects",
    });

    if (!Array.isArray(args.subjectids) || args.subjectids.length < 1) {
      throw new GraphQlDumpWarning("query", "subjects");
    }

    const queryClause = {
      where: {
        OR: args.subjectids.map(subjectId => ({ id: subjectId })),
      },
    };

    return ctx.db.query.subjects(queryClause, info);
  },


  /**
   * Get a list of Subjects by Prisma query search parameters. For logged-in only.
   * @param parent
   * @param args
   *        where: SubjectWhereInput
   *        orderBy: SubjectOrderByInput
   *        skip: Int
   *        after: String
   *        before: String
   *        first: Int
   *        last: Int
   * @param ctx
   * @param info
   * @returns [Subject]!
   */
  async subjectSearch(parent, args, ctx, info) {
    // Must be logged in and normal
    await checkAuth(ctx, {
      type: USER_TYPE_STUDENT,
      status: USER_STATUS_NORMAL,
      action: "subjectSearch",
    });

    return ctx.db.query.subjects(args, info);
  },
};

module.exports = { subject };
