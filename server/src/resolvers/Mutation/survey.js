const queryCourse = require("../Query/course");

const {
  checkAuth,
} = require("../../utils");

const {
  minMax,
  surveyAnswerFormatter,
} = require("../../logic/utils");

const {
  AuthError,
  StudentNoActiveCourse,
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
   *        studentid: ID!
   *        answerinput: {
   *          questionid: ID!
   *          skip: Boolean
   *          value: Float
   *          unit: String
   *          score: Int
   *          detail: String
   *        }!
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

    // Students can only do this to themselves. Mods and better can access freely.
    if (callingUserData.id !== args.studentid &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthError(null, "addSurveyAnswers");
    }

    // Note: Does not check if the Survey is skipped or not, so it could affect skipped Surveys.
    const targetCourseData =
      await queryCourse.course.activeCourse(parent, { studentid: args.studentid }, ctx, `
        {
          id
          surveys(
            where: {
              question: {
                id: "${args.answerinput.questionid}"
              }
            }
          ) {
            id
            question {
              id
            }
          }
        }
      `);

    // Check the course exists.
    if (targetCourseData === null) {
      throw new StudentNoActiveCourse(args.studentid, "addSurveyAnswers");
    }

    // Reject an answer if missing value or unit arguments (and it's not being skipped)
    if (!((args.answerinput.value && args.answerinput.unit) || args.answerinput.skip === true)) {
      throw new SurveyAnswerIncomplete(targetCourseData.id, args.answerinput.questionid);
    }

    // Check if the survey has been taken before. If so, grab the Survey's ID.
    let existingSurvey;
    for (let x = 0; x < targetCourseData.surveys.length; ++x) {
      if (targetCourseData.surveys[x].question.id === args.answerinput.questionid) {
        existingSurvey = targetCourseData.surveys[x].id;
        break;
      }
    }

    // Construct data payload
    const surveyData = {
      status: args.answerinput.skip === true ? SURVEY_STATUS_SKIPPED : SURVEY_STATUS_NORMAL,
      score: (args.answerinput.score &&
        minMax(SURVEY_MIN_SCORE, args.answerinput.score, SURVEY_MAX_SCORE)
      ) || SURVEY_DEFAULT_SCORE,
      answer: args.answerinput.skip === true ?
        "" : surveyAnswerFormatter(args.answerinput.value, args.answerinput.unit),
      detail: args.answerinput.skip === true ? null : args.answerinput.detail,
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
          id: targetCourseData.id,
        },
      };
      surveyData.question = {
        connect: {
          id: args.answerinput.questionid,
        },
      };

      return ctx.db.mutation.createSurvey({ data: surveyData }, info);
    }
  },


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
