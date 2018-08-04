const {
  checkAuth,
} = require("../../utils");

const {
  minMax,
} = require("../../logic/utils");

const {
  AuthError,
  SurveyNotFound,
} = require("../../errors");

const {
  USER_TYPE_STUDENT,
  USER_TYPE_MODERATOR,
  USER_TYPE_ADMIN,
  USER_STATUS_NORMAL,
  SURVEY_MIN_SCORE,
  SURVEY_MAX_SCORE,
} = require("../../constants");

const survey = {
  /**
   * Update a Survey's status. Only the owning student (or moderators or better) can do this.
   * @param parent
   * @param args
   *        surveyid: ID!
   *        status: Int!
   * @param ctx
   * @param info
   * @returns Survey!
   */
  async updateSurveyStatus(parent, args, ctx, info) {
    const callingUserData = await checkAuth(ctx, {
      type: [USER_TYPE_STUDENT, USER_TYPE_MODERATOR, USER_TYPE_ADMIN],
      status: USER_STATUS_NORMAL,
      action: "updateSurveyStatus",
    });

    const targetSurveyData = await ctx.db.query.survey({ where: { id: args.surveyid } }, `
      {
        id
        status
        parent {
          parent {
            student {
              id
            }
          }
        }
      }
    `);

    // Check the Survey exists.
    if (targetSurveyData === null) {
      throw new SurveyNotFound(args.surveyid);
    }

    // A student can change the status of a Survey and moderators or better can as well.
    if (callingUserData.id !== targetSurveyData.parent.parent.student.id &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthError(null, "updateSurveyStatus");
    }

    // Perform the update.
    return ctx.db.mutation.updateSurvey({
      where: { id: args.surveyid },
      data: {
        status: args.status,
      },
    }, info);
  },


  /**
   * Add a score value to a Survey's score field. Only the owning student (or moderators or better)
   * can do this. The value can be negative to remove points.
   * It will not be possible to make the score below the minimum (0) nor above the max (1000).
   * If you want to set a score to 0, send -1000. If you want to set the score to 1000, send 1000.
   * @param parent
   * @param args
   *        surveyid: ID!
   *        score: Int!
   * @param ctx
   * @param info
   * @returns Survey!
   */
  async addSurveyScore(parent, args, ctx, info) {
    const callingUserData = await checkAuth(ctx, {
      type: [USER_TYPE_STUDENT, USER_TYPE_MODERATOR, USER_TYPE_ADMIN],
      status: USER_STATUS_NORMAL,
      action: "addSurveyScore",
    });

    const targetSurveyData = await ctx.db.query.survey({ where: { id: args.surveyid } }, `
      {
        id
        score
        parent {
          parent {
            student {
              id
            }
          }
        }
      }
    `);

    // Check the course exists.
    if (targetSurveyData === null) {
      throw new SurveyNotFound(args.surveyid);
    }

    // A student can modify Surveys and moderators or better can as well.
    if (callingUserData.id !== targetSurveyData.parent.parent.student.id &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthError(null, "addSurveyScore");
    }

    // Use parseInt to smooth any floats that could've been sent.
    const newScore = minMax(
      SURVEY_MIN_SCORE,
      targetSurveyData.score + Number.parseInt(args.score, 10),
      SURVEY_MAX_SCORE,
    );

    return ctx.db.mutation.updateSurvey({
      where: { id: args.surveyid },
      data: { score: newScore },
    }, info);
  },
};

module.exports = { survey };
