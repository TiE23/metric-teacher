const {
  getUserData,
  checkAuth,
} = require("../../utils");

const {
  AuthError,
  GraphQlDumpWarning,
  UserNotFound,
  StudentNotOwner,
  MasteryNotFound,
} = require("../../errors");

const {
  USER_TYPE_STUDENT,
  USER_TYPE_MODERATOR,
  USER_TYPE_ADMIN,
  USER_STATUS_NORMAL,
  COURSE_STATUS_ACTIVE,
  MASTERY_STATUS_ACTIVE,
} = require("../../constants");

const mastery = {
  /**
   * Gives access to the active Masteries of a student. Will return [] if there are no active
   * Masteries.
   * For students checking themselves and mods or better only.
   * @param parent
   * @param args
   *        studentid: ID!
   * @param ctx
   * @param info
   * @returns [Mastery]!
   */
  async activeMasteries(parent, args, ctx, info) {
    // Exclude teachers. Students are only allowed to check themselves. Must be normal status.
    const callingUserData = await checkAuth(ctx, {
      type: [USER_TYPE_STUDENT, USER_TYPE_MODERATOR, USER_TYPE_ADMIN],
      status: USER_STATUS_NORMAL,
      action: "activeMasteries",
    });

    // A student can get their active Course and moderators or better can as well.
    if (callingUserData.id !== args.studentid &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthError(null, "activeMasteries");
    }

    // Need to get the active Masteries
    const studentData = await getUserData(
      ctx,
      args.studentid,
      `{
        type
        enrollment {
          courses( where: {
            status: ${COURSE_STATUS_ACTIVE},
          }, first: 1) {
            masteries( where: {
              status: ${MASTERY_STATUS_ACTIVE},
            }) {
              id
            }
          }
        }
      }`,
    );

    if (!studentData) {
      throw new UserNotFound(args.studentid);
    }

    // Instead of throwing errors just return an empty list.
    if (!studentData.enrollment) {
      return []; // Student is not Enrolled
    }
    if (studentData.enrollment.courses.length === 0) {
      return [];  // No Course is active
    }
    if (studentData.enrollment.courses[0].masteries.length === 0) {
      return [];  // No Mastery is active
    }

    const queryClause = {
      where: {
        OR: studentData.enrollment.courses[0].masteries.map(masteryObject =>
          ({ id: masteryObject.id })),
      },
    };

    return ctx.db.query.masteries(queryClause, info);
  },


  /**
   * Get a Mastery by a student ID and a Mastery ID. For students checking themselves and mods or
   * better only.
   * @param parent
   * @param args
   *        studentid: ID!
   *        masteryid: ID!
   * @param ctx
   * @param info
   * @returns Mastery
   */
  async mastery(parent, args, ctx, info) {
    // Exclude teachers. Students are only allowed to check themselves. Must be normal status.
    const callingUserData = await checkAuth(ctx, {
      type: [USER_TYPE_STUDENT, USER_TYPE_MODERATOR, USER_TYPE_ADMIN],
      status: USER_STATUS_NORMAL,
      action: "mastery",
    });

    // A student can get their active course and moderators or better can as well.
    if (callingUserData.id !== args.studentid &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthError(null, "mastery");
    }

    if (!args.masteryid) {
      throw new GraphQlDumpWarning("query", "mastery");
    }

    // Check to make sure that the Mastery belongs to the student.
    const masteryData = await ctx.db.query.mastery(
      { where: { id: args.masteryid } },
      `{
        parent {
          parent {
            student {
              id
            }
          }
        }
      }`,
    );

    if (!masteryData) {
      throw new MasteryNotFound(args.masteryid);
    }
    if (args.studentid !== masteryData.parent.parent.student.id) {
      throw new StudentNotOwner(args.studentid, args.masteryid, "Mastery");
    }

    return ctx.db.query.mastery({ where: { id: args.masteryid } }, info);
  },


  /**
   * Get a list of Masteries by a student ID and a list of Mastery IDs. For students checking
   * themselves and mods or better only.
   * @param parent
   * @param args
   *        studentid: ID!
   *        masteryids: [ID!]!
   * @param ctx
   * @param info
   * @returns [Mastery]!
   */
  async masteries(parent, args, ctx, info) {
    // Exclude teachers. Students are only allowed to check themselves. Must be normal status.
    const callingUserData = await checkAuth(ctx, {
      type: [USER_TYPE_STUDENT, USER_TYPE_MODERATOR, USER_TYPE_ADMIN],
      status: USER_STATUS_NORMAL,
      action: "masteries",
    });

    // A student can get their active course and moderators or better can as well.
    if (callingUserData.id !== args.studentid &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthError(null, "masteries");
    }

    if (!Array.isArray(args.masteryids) || args.masteryids.length < 1) {
      throw new GraphQlDumpWarning("query", "masteries");
    }

    const queryClause = {
      where: {
        OR: args.masteryids.map(masteryId => ({ id: masteryId })),
      },
    };

    // Check to make sure that the Masteries belong to the student.
    const masteriesData = await ctx.db.query.masteries(
      queryClause,
      `{
        id
        parent {
          parent {
            student {
              id
            }
          }
        }
      }`,
    );

    // Notify if some Masteries were owned by others.
    const wrongOwnerMasteries = masteriesData.filter(masteryObject =>
      masteryObject.parent.parent.student.id !== args.studentid).map(wrongMasteryObject =>
      wrongMasteryObject.id);
    if (wrongOwnerMasteries.length > 0) {
      throw new StudentNotOwner(args.studentid, wrongOwnerMasteries.join(", "), "Mastery");
    }

    // Notify if some Masteries didn't exist.
    const foundMasteries = masteriesData.map(masteryObject => masteryObject.id);
    const missingMasteries = args.masteryids.filter(masteryId =>
      !foundMasteries.includes(masteryId));
    if (missingMasteries.length > 0) {
      throw new MasteryNotFound(missingMasteries.join(", "));
    }

    return ctx.db.query.masteries(queryClause, info);
  },


  /**
   * Get a list of Masteries by Prisma query search parameters.
   * For moderators or better only because of potentially sensitive data.
   * Students can get through other options.
   * @param parent
   * @param args
   *        where: MasteryWhereInput
   *        orderBy: MasteryOrderByInput
   *        skip: Int
   *        after: String
   *        before: String
   *        first: Int
   *        last: Int
   * @param ctx
   * @param info
   * @returns [Mastery]!
   */
  async masterySearch(parent, args, ctx, info) {
    // Mods or better only. Must be normal.
    await checkAuth(ctx, {
      type: USER_TYPE_MODERATOR,
      status: USER_STATUS_NORMAL,
      action: "masterySearch",
    });

    return ctx.db.query.masteries(args, info);
  },
};

module.exports = { mastery };
