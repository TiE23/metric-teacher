const {
  checkAuth,
} = require("../../utils");

const {
  questionSyntaxFormatter,
  answerSyntaxFormatter,
} = require("../../logic/utils");

const {
  parseQAStrings,
} = require("../../logic/qaSyntax");

const {
  QuestionGenericError,
} = require("../../errors");

const {
  USER_STATUS_NORMAL,
  USER_TYPE_STUDENT,
  QUESTION_STATUS_REVIEW_PENDING,
} = require("../../constants");

const question = {
  /**
   * Mutation that creates a new Question row from multiple inputs and with heavy checking will
   * submit the question with a status putting it up for review.
   * For normal users only.
   * @param parent
   * @param args
   *        subsubjectid: ID!
   *        type: Int!
   *        flags: Int!
   *        difficulty: Int!
   *        media: String
   *        questioninput: QuestionQuestionInput {
   *          text: String
   *            conversioninput: ConversionQuestionInput: {
   *              lower: Float!
   *              upper: Float!
   *              unit: String!
   *              step: Float
   *            }
   *            surveyrangeinput: RangeQuestionInput: {
   *              lower: Float!
   *              upper: Float!
   *              unit: String!
   *              step: Float
   *            }
   *        }!
   *        answerinput: QuestionAnswerInput: {
   *          text: String
   *          multiplechoiceinput: MultipleChoiceInput: {
   *            choices: [
   *              MultipleChoiceInputRow: {
   *                value: Float
   *                written: String
   *                unit: String!
   *              }!
   *            ]!
   *            choicesoffered: Int
   *          }
   *          conversioninput: ConversionAnswerInput: {
   *            unit: String!
   *            accuracy: Float
   *          }
   *        }!
   * @param ctx
   * @param info
   * @returns Question!
   */
  async submitQuestion(parent, args, ctx, info) {
    const callingUserData = await checkAuth(ctx, {
      type: USER_TYPE_STUDENT,
      status: USER_STATUS_NORMAL,
      action: "submitQuestion",
    });

    // Process the input to make the syntax strings and check for any mistakes.
    const { questionSyntaxString, answerSyntaxString } =
      checkAndParseInputs(args.type, args.questioninput, args.answerinput);

    // Create the question.
    return ctx.db.mutation.createQuestion({
      data: {
        status: QUESTION_STATUS_REVIEW_PENDING,
        type: args.type,
        flags: args.flags,
        difficulty: args.difficulty,
        media: args.media,
        answer: answerSyntaxString,
        question: questionSyntaxString,
        parent: {
          connect: {
            id: args.subsubjectid,
          },
        },
        author: {
          connect: {
            id: callingUserData.id,
          },
        },
      },
    }, info);
  },


  /**
   * Provide a quick dry-run of submitQuestion. It'll throw up a bunch of errors if something is
   * wronge, otherwise it'll return true. If this returns true, the question will be accepted
   * TODO - This should probably be a Query instead of a Mutation... if you care, that is...
   * @param parent
   * @param args
   *        type: Int!
   *        questioninput: QuestionQuestionInput {
   *          text: String
   *            conversioninput: ConversionQuestionInput: {
   *              lower: Float!
   *              upper: Float!
   *              unit: String!
   *              step: Float
   *            }
   *            surveyrangeinput: RangeQuestionInput: {
   *              lower: Float!
   *              upper: Float!
   *              unit: String!
   *              step: Float
   *            }
   *        }!
   *        answerinput: QuestionAnswerInput: {
   *          text: String
   *          multiplechoiceinput: MultipleChoiceInput: {
   *            choices: [
   *              MultipleChoiceInputRow: {
   *                value: Float
   *                written: String
   *                unit: String!
   *              }!
   *            ]!
   *            choicesoffered: Int
   *          }
   *          conversioninput: ConversionAnswerInput: {
   *            unit: String!
   *            accuracy: Float
   *          }
   *        }!
   * @param ctx
   * @returns {boolean}
   */
  async checkSubmitQuestion(parent, args, ctx) {
    await checkAuth(ctx, {
      type: USER_TYPE_STUDENT,
      status: USER_STATUS_NORMAL,
      action: "checkSubmitQuestion",
    });

    // Throws the input through the gauntlet. Anything wrong? Errors!
    checkAndParseInputs(args.type, args.questioninput, args.answerinput);

    // If it reaches this point the inputs were acceptable. Return true.
    return true;
  },
};


/**
 * Helper function takes in the question's type, questioninput, and answerinput from the mutation
 * inputs and does a ton of formatting and finally QA parse checking for acceptance.
 * @param type
 * @param questionInput
 * @param answerInput
 * @returns {{questionSyntaxString: string, answerSyntaxString: string}}
 */
function checkAndParseInputs(type, questionInput, answerInput) {
  // Make sure that question input doesn't have multiple things in it.
  if (questionInput &&
    questionInput.conversioninput &&
    questionInput.surveyrangeinput) {
    throw new QuestionGenericError("Cannot have both conversioninput and surveyrangeinput defined");
  }

  // Create the question syntax string.
  const questionSyntaxString = questionSyntaxFormatter(
    questionInput.text,
    questionInput.conversioninput || questionInput.surveyrangeinput,
  );

  // Create the answer syntax string.
  const answerSyntaxString = answerSyntaxFormatter(
    answerInput.string,
    answerInput.multiplechoiceinput,
    answerInput.conversioninput,
  );

  // Feed the inputted type, the question text, and the answer text into the parser.
  // If there are any problems that were not caught in the syntax formatters above will
  // throw errors now.
  parseQAStrings(
    type,
    questionSyntaxString,
    answerSyntaxString,
  );

  return { questionSyntaxString, answerSyntaxString };
}

module.exports = { question };
