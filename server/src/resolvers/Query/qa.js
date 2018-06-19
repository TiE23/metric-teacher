const {
  checkAuth,
} = require("../../utils");

const {
  AuthError,
  CourseNotFound,
  CourseInactive,
  QuestionNotFound,
  QuestionNotActive,
} = require("../../errors");

const {
  USER_TYPE_STUDENT,
  USER_STATUS_NORMAL,
  COURSE_STATUS_ACTIVE,
  QUESTION_STATUS_ACTIVE,
  QUESTION_TYPE_SURVEY,
} = require("../../constants");

const {
  qaGenerate,
} = require("../../logic/qaGenerator");

const {
  ChallengeGenerator,
} = require("../../logic/challengeGenerator");


const qa = {
  // TODO this needs to be polished - Likely in ISSUE-020.
  async getQa(parent, args, ctx) {
    const callingUserData = await checkAuth(ctx, {
      type: USER_TYPE_STUDENT,
      action: "testGetQa",
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


  /**
   *
   * @param parent
   * @param args
   *        courseid: ID!
   *        subjectids: [ID]
   *        subsubjectids: [ID]
   *        listSize: Int!
   *        ignorerarity: Boolean
   *        ignoredifficulty: Boolean
   *        ignorepreference: Boolean
   * @param ctx
   * @returns [QaObject]!
   */
  async generateChallenge(parent, args, ctx) {
    // Must be normal status.
    const callingUserData = await checkAuth(ctx, {
      type: USER_TYPE_STUDENT,
      status: USER_STATUS_NORMAL,
      action: "generateChallenge",
    });

    const courseData = await ctx.db.query.course(
      {
        where: { id: args.courseid },
      },
      `{
        status
        parent {
          student {
            id
          }
        }
      }`,
    );

    // If the Course cannot be found, stop here.
    if (!courseData) {
      throw new CourseNotFound(args.courseid);
    }

    // If calling user is a Student check that the Course belongs to the student.
    if (callingUserData.type === USER_TYPE_STUDENT &&
      callingUserData.id !== courseData.parent.student.id) {
      throw new AuthError(
        `Student ${callingUserData.id} cannot generate a Challenge for a Course (${args.courseid}) that doesn't belong to them`,
        "generateChallenge",
      );
    }

    if (courseData.status !== COURSE_STATUS_ACTIVE) {
      throw new CourseInactive(args.courseid);
    }

    const ChallengeGen = new ChallengeGenerator(ctx);
    return ChallengeGen.generateChallenge(
      args.courseid,
      args.subjectids || [],
      args.subsubjectids || [],
      args.listSize,
      args.ignorerarity || false,
      args.ignoredifficulty || false,
      args.ignorepreference || false,
    );
  },
};

module.exports = { qa };
