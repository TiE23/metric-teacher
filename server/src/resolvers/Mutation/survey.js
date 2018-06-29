const {
  checkAuth,
} = require("../../utils");

const {
  minMax,
  surveyAnswerFormatter,
} = require("../../logic/utils");

const {
  AuthError,
  CourseNotFound,
  SurveyAnswerIncomplete,
  SurveyNotFound,
} = require("../../errors");

const {
  USER_TYPE_STUDENT,
  USER_TYPE_MODERATOR,
  USER_TYPE_ADMIN,
  USER_STATUS_NORMAL,
  SURVEY_DEFAULT_SCORE,
  SURVEY_MIN_SCORE,
  SURVEY_MAX_SCORE,
  SURVEY_STATUS_NORMAL,
  SURVEY_STATUS_SKIPPED,
} = require("../../constants");

const survey = {
  /**
   * Answer or re-answer a Survey question. Only the owning student (or moderators or better) can
   * do this.
   * @param parent
   * @param args
   *        courseid: ID!
   *        questionid: ID!
   *        skip: Boolean
   *        value: Float
   *        unit: String
   *        detail: String
   * @param ctx
   * @param info
   * @returns Survey!
   */
  async addSurveyAnswer(parent, args, ctx, info) {
    const callingUserData = await checkAuth(ctx, {
      type: [USER_TYPE_STUDENT, USER_TYPE_MODERATOR, USER_TYPE_ADMIN],
      status: USER_STATUS_NORMAL,
      action: "addSurveyAnswer",
    });

    const targetCourseData = await ctx.db.query.course({ where: { id: args.courseid } }, `
      {
        id
        parent {
          student {
            id
          }
        }
        surveys {
          id
          question {
            id
          }
        }
      }
    `);

    // Check the course exists.
    if (targetCourseData === null) {
      throw new CourseNotFound(args.courseid);
    }

    // A student can answer/re-answer Surveys and moderators or better can as well.
    if (callingUserData.id !== targetCourseData.parent.student.id &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthError(null, "answerSurvey");
    }

    // Reject an answer if missing value or unit arguments (and it's not being skipped)
    if (!((args.value && args.unit) || args.skip === true)) {
      throw new SurveyAnswerIncomplete(args.courseid, args.questionid);
    }

    // Check if the survey has been taken before. If so, grab the Survey's ID.
    let existingSurvey = null;
    for (let x = 0; x < targetCourseData.surveys.length; ++x) {
      if (targetCourseData.surveys[x].question.id === args.questionid) {
        existingSurvey = targetCourseData.surveys[x].id;
        break;
      }
    }

    // Construct data payload
    const surveyData = {
      status: args.skip === true ? SURVEY_STATUS_SKIPPED : SURVEY_STATUS_NORMAL,
      score: SURVEY_DEFAULT_SCORE,
      answer: args.skip === true ? "" : surveyAnswerFormatter(args.value, args.unit),
      detail: args.skip === true ? null : args.detail,
    };

    // If Survey has been filled already, let's update it.
    if (existingSurvey) {
      return ctx.db.mutation.updateSurvey({
        where: { id: existingSurvey },
        data: surveyData,
      }, info);

    // Otherwise we create a new Survey row.
    } else {
      surveyData.parent = {
        connect: {
          id: args.courseid,
        },
      };
      surveyData.question = {
        connect: {
          id: args.questionid,
        },
      };

      return ctx.db.mutation.createSurvey({ data: surveyData }, info);
    }
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
