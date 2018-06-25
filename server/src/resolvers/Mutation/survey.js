const {
  checkAuth,
} = require("../../utils");

const {
  AuthError,
  CourseNotFound,
  SurveyIncomplete,
  SurveyAnswerUnitInvalid,
  SurveyAnswerValueInvalid,
} = require("../../errors");

const {
  USER_TYPE_STUDENT,
  USER_TYPE_MODERATOR,
  USER_TYPE_ADMIN,
  USER_STATUS_NORMAL,
  SURVEY_DEFAULT_SCORE,
  SURVEY_STATUS_NORMAL,
  SURVEY_STATUS_SKIPPED,
  UNITS,
} = require("../../constants");

const survey = {
  /**
   * Answer or re-answer a Survey question.
   * @param parent
   * @param args
   *        studentid: ID!
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
  async answerSurvey(parent, args, ctx, info) {
    const callingUserData = await checkAuth(ctx, {
      type: [USER_TYPE_STUDENT, USER_TYPE_MODERATOR, USER_TYPE_ADMIN],
      status: USER_STATUS_NORMAL,
      action: "answerSurvey",
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

    // Course must belong to the targeted student.
    if (args.studentid !== targetCourseData.parent.student.id) {
      throw new CourseNotFound(`${args.courseid} for student ${args.studentid}`);
    }

    // A student can assign new SubSubjects and moderators or better can as well.
    if (callingUserData.id !== targetCourseData.parent.student.id &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthError(null, "answerSurvey");
    }

    // Reject an answer if missing value or unit arguments (and it's not being skipped)
    if (!((args.value && args.unit) || args.skip === true)) {
      throw new SurveyIncomplete(args.courseid, args.questionid);
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
      detail: args.detail,
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
};


/**
 * Very simple function returns the format used by Survey answers. Ex: [1.65m]
 * @param value
 * @param unit  Needs to be lower case, it will not.
 * @returns {string}
 */
function surveyAnswerFormatter(value, unit) {
  if (Number.isNaN(value)) {
    throw new SurveyAnswerValueInvalid(value);
  }
  if (UNITS[unit] === undefined) {
    throw new SurveyAnswerUnitInvalid(unit);
  }

  return `[${value}${unit}]`;
}

module.exports = { survey };
