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

    // Make sure that question input doesn't have multiple things in it.
    if (args.questioninput &&
      args.questioninput.conversioninput &&
      args.questioninput.surveyrangeinput) {
      throw new QuestionGenericError("Cannot have both conversioninput and surveyrangeinput defined");
    }

    // Create the question syntax string.
    const questionSyntaxString = questionSyntaxFormatter(
      args.questioninput.text,
      args.questioninput.conversioninput || args.questioninput.surveyrangeinput,
    );

    // Create the answer syntax string.
    const answerSyntaxString = answerSyntaxFormatter(
      args.answerinput.string,
      args.answerinput.multiplechoiceinput,
      args.answerinput.conversioninput,
    );

    // Feed the inputted type, the question text, and the answer text into the parser.
    // If there are any problems that were not caught in the syntax formatters above will
    // throw errors now.
    parseQAStrings(
      args.type,
      questionSyntaxString,
      answerSyntaxString,
    );

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
};

module.exports = { question };
