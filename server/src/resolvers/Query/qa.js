const find = require("lodash/find");
const difference = require("lodash/difference");

const {
  checkAuth,
} = require("../../utils");

const {
  AuthError,
  CourseNotFound,
  CourseInactive,
  QuestionNotFound,
} = require("../../errors");

const {
  USER_TYPE_STUDENT,
  USER_STATUS_NORMAL,
  COURSE_STATUS_ACTIVE,
  QUESTION_TYPE_SURVEY,
} = require("../../constants");

const {
  qaGenerate,
} = require("../../logic/qaGenerator");

const {
  ChallengeGenerator,
} = require("../../logic/challengeGenerator");


const qa = {
  /**
   * Generates a list of QAObjects from a list of Question IDs.
   * If studentid is defined it'll try to get Surveys from that student's active Course.
   * @param parent
   * @param args
   *        questionids: [ID!]!
   *        studentid: ID
   * @param ctx
   * @returns QaObject
   */
  async getQa(parent, args, ctx) {
    await checkAuth(ctx, {
      type: USER_TYPE_STUDENT,
      status: USER_STATUS_NORMAL,
      action: "getQa",
    });

    const questionObjects = await ctx.db.query.questions(
      { where: { id_in: args.questionids } },
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


    // If a question wasn't found, stop and report it immediately.
    const foundQuestionIds = questionObjects.map(questionObject => questionObject.id);
    const missingQuestions = difference(args.questionids, foundQuestionIds);
    if (!missingQuestions) {
      throw new QuestionNotFound(`["${missingQuestions.join(", ")}"]`);
    }

    // Get the survey type Question IDs, but only bother if we have a student ID inputted.
    const surveyQuestionIds = [];
    if (args.studentid) {
      questionObjects.forEach((questionObject) => {
        if (questionObject.type === QUESTION_TYPE_SURVEY) {
          surveyQuestionIds.push(questionObject.id);
        }
      });
    }

    // Find the survey entries for a student for any survey type Questions given.
    if (args.studentid && surveyQuestionIds) {
      const userSurveyObject = await ctx.db.query.user(
        { where: { id: args.studentid } },
        `{
          enrollment {
            courses( where: {
              status: ${COURSE_STATUS_ACTIVE}
            }, first: 1) {
              surveys( where: {
                question: {
                  id_in: [
                    ${`"${surveyQuestionIds.join("\",\"")}"`}
                  ]
                }
              }) {
                id
                status
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
        const surveyObjects = userSurveyObject.enrollment.courses[0].surveys;

        // Survey responses found! Feed it into qaGenerate and return results
        return questionObjects.map((questionObject) => {
          const matchingSurvey = find(surveyObjects, survey =>
            survey.question.id === questionObject.id);
          return qaGenerate(questionObject, matchingSurvey);  // If not found, will be undefined.
        });
      } catch (e) {
        // In the case that the user has no courses we catch and swallow TypeErrors.
        if (!(e instanceof TypeError)) {
          throw e;  // Other exceptions will still be thrown, though.
        }
      }
    }

    return questionObjects.map(questionObject => qaGenerate(questionObject));
  },


  /**
   * Generate an entire list of QAObjects (called a "Challenge") based off a Course ID and
   * a list of Subject or SubSubject IDs. Additional boolean arguments help customize the results.
   * @param parent
   * @param args
   *        courseid: ID!
   *        subjectids: [ID]
   *        subsubjectids: [ID]
   *        listsize: Int!
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
      args.listsize,
      args.ignorerarity || false,
      args.ignoredifficulty || false,
      args.ignorepreference || false,
    );
  },
};

module.exports = { qa };
