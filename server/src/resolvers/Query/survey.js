const {
  getUserData,
  checkAuth,
} = require("../../utils");

const {
  GraphQlDumpWarning,
  AuthErrorAction,
  UserNotFound,
} = require("../../errors");

const {
  USER_TYPE_STUDENT,
  USER_TYPE_MODERATOR,
  USER_TYPE_ADMIN,
  USER_STATUS_NORMAL,
  COURSE_STATUS_ACTIVE,
} = require("../../constants");

const survey = {
  /**
   * Give access to the active Surveys of a student. Will return [] if there are no active Surveys.
   * For students checking themselves and mods or better only.
   * @param parent
   * @param args
   *        studentid: ID!
   * @param ctx
   * @param info
   * @returns [Survey]!
   */
  async activeSurveys(parent, args, ctx, info) {
    // Exclude teachers. Students are only allowed to check themselves. Must be normal status.
    const callingUserData = await checkAuth(ctx, {
      type: [USER_TYPE_STUDENT, USER_TYPE_MODERATOR, USER_TYPE_ADMIN],
      status: USER_STATUS_NORMAL,
      action: "activeSurveys",
    });

    // A student can get their active Course and moderators or better can as well.
    if (callingUserData.id !== args.studentid &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthErrorAction("activeSurveys");
    }

    // Need to get active Surveys
    const studentData = await getUserData(
      ctx,
      args.studentid,
      `{
        type
        enrollment {
          courses( where: {
            status: ${COURSE_STATUS_ACTIVE}
          }, first: 1) {
            surveys {
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
    if (studentData.enrollment.courses[0].surveys.length === 0) {
      return [];  // No Surveys available
    }

    const queryClause = {
      where: {
        OR: studentData.enrollment.courses[0].surveys.map(surveyObject =>
          ({ id: surveyObject.id })),
      },
    };

    return ctx.db.query.masteries(queryClause, info);
  },


  /**
   * Get a Survey by a student ID and a Survey ID. For students checking themselves and mods or
   * better only.
   * @param parent
   * @param args
   *        studentid: ID!
   *        surveyid: ID!
   * @param ctx
   * @param info
   * @returns Survey
   */
  async survey(parent, args, ctx, info) {
    // Exclude teachers. Students are only allowed to check themselves. Must be normal status.
    const callingUserData = await checkAuth(ctx, {
      type: [USER_TYPE_STUDENT, USER_TYPE_MODERATOR, USER_TYPE_ADMIN],
      status: USER_STATUS_NORMAL,
      action: "survey",
    });

    // A student can get their active course and moderators or better can as well.
    if (callingUserData.id !== args.studentid &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthErrorAction("survey");
    }

    if (!args.masteryid) {
      throw new GraphQlDumpWarning("query", "survey");
    }

    return ctx.db.query.survey({ where: { id: args.surveyid } }, info);
  },


  /**
   * Get a list of Surveys by a student ID and a list of Survey IDs. For students checking
   * themselves and mods or better only.
   * @param parent
   * @param args
   *        studentid: ID!
   *        surveyids: [ID!]!
   * @param ctx
   * @param info
   * @returns [Survey]!
   */
  async surveys(parent, args, ctx, info) {
    // Exclude teachers. Students are only allowed to check themselves. Must be normal status.
    const callingUserData = await checkAuth(ctx, {
      type: [USER_TYPE_STUDENT, USER_TYPE_MODERATOR, USER_TYPE_ADMIN],
      status: USER_STATUS_NORMAL,
      action: "surveys",
    });

    // A student can get their active course and moderators or better can as well.
    if (callingUserData.id !== args.studentid &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthErrorAction("surveys");
    }

    if (!Array.isArray(args.surveyids) || args.surveyids.length < 1) {
      throw new GraphQlDumpWarning("query", "surveys");
    }

    const queryClause = {
      where: {
        OR: args.surveyids.map(surveyId => ({ id: surveyId })),
      },
    };

    return ctx.db.query.surveys(queryClause, info);
  },


  /**
   * Get a list of Surveys by Prisma query search parameters.
   * For moderators or better only because of potentially sensitive data.
   * Students can get through other options.
   * @param parent
   * @param args
   *        where: SurveyWhereInput
   *        orderBy: SurveyOrderByInput
   *        skip: Int
   *        after: String
   *        before: String
   *        first: Int
   *        last: Int
   * @param ctx
   * @param info
   * @returns [Survey]!
   */
  async surveySearch(parent, args, ctx, info) {
    // Mods or better only. Must be normal.
    await checkAuth(ctx, {
      type: USER_TYPE_MODERATOR,
      status: USER_STATUS_NORMAL,
      action: "surveySearch",
    });

    return ctx.db.query.surveys(args, info);
  },
};

module.exports = { survey };
