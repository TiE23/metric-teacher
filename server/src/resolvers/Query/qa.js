const {
  checkAuth,
} = require("../../utils");
const { qaGenerate } = require("../../logic/qaGenerator");
const {
  QuestionNotFound,
  QuestionNotActive,
} = require("../../errors");
const {
  USER_TYPE_STUDENT,
  COURSE_STATUS_ACTIVE,
  QUESTION_STATUS_ACTIVE,
  QUESTION_TYPE_SURVEY,
} = require("../../constants");

const qa = {
  // TODO this needs to be polished - Likely in ISSUE-020.
  async getQa(parent, args, ctx) {
    const callingUserData = await checkAuth(ctx, {
      type: USER_TYPE_STUDENT,
      action: "query testGetQa",
    }); // Must be logged in
    const questionObject = await ctx.db.query.question(
      { where: { id: args.questionid } },
      `{
        id
        type
        status
        flags
        difficulty
        question
        answer
        media
        parent {
          id
        }
      }`,
    );

    // If the question wasn't found
    if (!questionObject) {
      throw new QuestionNotFound(args.questionid);
    }

    // TODO Do I really want to prevent processing inactive questions?
    // Question isn't active
    if (questionObject.status !== QUESTION_STATUS_ACTIVE) {
      throw new QuestionNotActive(args.questionid);
    }

    // Check if the student has answered the survey. Don't bother for non-students.
    if (callingUserData.type === USER_TYPE_STUDENT &&
      questionObject.type === QUESTION_TYPE_SURVEY) {
      const userSurveyObject = await ctx.db.query.user(
        { where: { id: callingUserData.id } },
        `{
          enrollment {
            courses( where: {
              status: ${COURSE_STATUS_ACTIVE}
            }, first: 1) {
              surveys( where: {
                question: {
                  id: "${args.questionid}"
                }
              }) {
                id
                score
                answer
                detail
                parent {
                  id
                }
                question {
                  id
                }
              }
            }
          }
        }`,
      );

      // TODO Better error reporting, explain user doesn't have enrollment or course.
      try {
        // If the survey question was answered the surveyObject below will be defined.
        const surveyObject = userSurveyObject.enrollment.courses[0].surveys[0];

        // Survey response found! Feed it into qaGenerate and return results
        return qaGenerate(questionObject, surveyObject);
      } catch (e) {
        // In the case that the user has no courses we catch and swallow TypeErrors.
        if (!(e instanceof TypeError)) {
          throw e;  // Other exceptions will still be thrown, though.
        }
      }
    }

    return qaGenerate(questionObject);
  },
};

module.exports = { qa };
