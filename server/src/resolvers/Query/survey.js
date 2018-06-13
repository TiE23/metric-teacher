const {
  getUserData,
  checkAuth,
} = require("../../utils");

const {
  GraphQlDumpWarning,
  AuthErrorAction,
  UserNotFound,
  StudentNotOwner,
  SurveyNotFound,
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

    return ctx.db.query.surveys(queryClause, info);
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

    if (!args.surveyid) {
      throw new GraphQlDumpWarning("query", "survey");
    }

    // Check to make sure that the Survey belongs to the student.
    const surveyData = await ctx.db.query.survey(
      { where: { id: args.surveyid } },
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

    if (!surveyData) {
      throw new SurveyNotFound(args.surveyid);
    }
    if (args.studentid !== surveyData.parent.parent.student.id) {
      throw new StudentNotOwner(args.studentid, args.surveyid, "Survey");
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

    // Check to make sure that the Surveys belong to the student.
    const surveysData = await ctx.db.query.surveys(
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

    // Notify if some Surveys were owned by others.
    const wrongOwnerSurveys = surveysData.filter(surveyObject =>
      surveyObject.parent.parent.student.id !== args.studentid).map(wrongSurveyObject =>
      wrongSurveyObject.id);
    if (wrongOwnerSurveys.length > 0) {
      throw new StudentNotOwner(args.studentid, wrongOwnerSurveys.join(", "), "Survey");
    }

    // Notify if some Surveys didn't exist.
    const foundSurveys = surveysData.map(surveyObject => surveyObject.id);
    const missingSurveys = args.surveyids.filter(surveyId =>
      !foundSurveys.includes(surveyId));
    if (missingSurveys.length > 0) {
      throw new SurveyNotFound(missingSurveys.join(", "));
    }

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
