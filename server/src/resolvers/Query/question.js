const {
  checkAuth,
} = require("../../utils");

const {
  checkAndParseQuestionAnswerInputs,
} = require("../../logic/utils");

const {
  GraphQlDumpWarning,
} = require("../../errors");

const {
  USER_TYPE_STUDENT,
  USER_TYPE_TEACHER,
  USER_STATUS_NORMAL,
} = require("../../constants");

const question = {
  /**
   * Get a Question by ID. For teachers and better only.
   * @param parent
   * @param args
   *        questionid: ID!
   * @param ctx
   * @param info
   * @returns Question
   */
  async question(parent, args, ctx, info) {
    // Need to be teacher or better and normal.
    await checkAuth(ctx, {
      type: USER_TYPE_TEACHER,
      status: USER_STATUS_NORMAL,
      action: "question",
    });

    if (!args.questionid) {
      throw new GraphQlDumpWarning("query", "question");
    }

    return ctx.db.query.question({ where: { id: args.questionid } }, info);
  },


  /**
   * Get a list of Questions by a list of IDs. For teachers and better only.
   * @param parent
   * @param args
   *        questionids: [ID!]!
   * @param ctx
   * @param info
   * @returns [Question]!
   */
  async questions(parent, args, ctx, info) {
    // Need to be teacher or better and normal.
    await checkAuth(ctx, {
      type: USER_TYPE_TEACHER,
      status: USER_STATUS_NORMAL,
      action: "questions",
    });

    if (!Array.isArray(args.questionids) || args.questionids.length < 1) {
      throw new GraphQlDumpWarning("query", "questions");
    }

    const queryClause = {
      where: {
        OR: args.questionids.map(questionId => ({ id: questionId })),
      },
    };

    return ctx.db.query.questions(queryClause, info);
  },


  /**
   * Get a list of Questions by Prisma query search parameters. For teachers and better only.
   * @param parent
   * @param args
   *        where: QuestionWhereInput
   *        orderBy: QuestionOrderByInput
   *        skip: Int
   *        after: String
   *        before: String
   *        first: Int
   *        last: Int
   * @param ctx
   * @param info
   * @returns [Question]!
   */
  async questionSearch(parent, args, ctx, info) {
    // Need to be teacher or better and normal.
    await checkAuth(ctx, {
      type: USER_TYPE_TEACHER,
      status: USER_STATUS_NORMAL,
      action: "questionSearch",
    });

    return ctx.db.query.questions(args, info);
  },


  /**
   * Provide a quick dry-run of submitQuestion. It'll throw up a bunch of errors if something is
   * wrong, otherwise it'll return true. If this returns true, the question will be accepted.
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
    checkAndParseQuestionAnswerInputs(args.type, args.questioninput, args.answerinput);

    // If it reaches this point the inputs were acceptable. Return true.
    return true;
  },
};

module.exports = { question };
