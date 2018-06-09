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
      action: "allSubjects",
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
};

module.exports = { subject };
