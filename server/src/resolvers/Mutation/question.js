const queryQa = require("../Query/qa");

const {
  checkAuth,
} = require("../../utils");

const {
  customMerge,
  checkAndParseQuestionAnswerInputs,
} = require("../../logic/utils");

const {
  USER_STATUS_NORMAL,
  USER_TYPE_STUDENT,
  USER_STATUS_MODERATOR,
  QUESTION_STATUS_REVIEW_PENDING,
  QUESTION_TYPE_WRITTEN,
  QUESTION_TYPE_CONVERSION,
  QUESTION_TYPE_SURVEY,
} = require("../../constants");

const {
  QuestionNotFound,
} = require("../../errors");

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
   *          conversioninput: ConversionQuestionInput: {
   *            lower: Float!
   *            upper: Float!
   *            unit: String!
   *            step: Float
   *          }
   *          surveyrangeinput: RangeQuestionInput: {
   *            lower: Float!
   *            upper: Float!
   *            unit: String!
   *            step: Float
   *          }
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
      checkAndParseQuestionAnswerInputs(args.type, args.questioninput, args.answerinput);

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
   * Mutation that updates an existing Question row from multiple inputs and with heavy checking
   * will immediately change the question.
   *
   * Everything in questioninput and answerinput is optional - allowing you to create incremental
   * updates. EXCEPT for one thing:
   *  answerinput.multiplechoiceinput.choices must be defined anew all together. You need to
   *  re-define all your answers at once, you cannot, say, only update the first item.
   *
   * For moderator and admin users only.
   * @param parent
   * @param args
   *        questionid: ID!
   *        subsubjectid: ID
   *        type: Int
   *        flags: Int
   *        status: Int
   *        difficulty: Int
   *        media: String
   *        questioninput: QuestionQuestionInput {
   *          text: String
   *          conversioninput: ConversionQuestionInput: {
   *            lower: Float!
   *            upper: Float!
   *            unit: String!
   *            step: Float
   *          }
   *          surveyrangeinput: RangeQuestionInput: {
   *            lower: Float!
   *            upper: Float!
   *            unit: String!
   *            step: Float
   *          }
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
  async updateQuestion(parent, args, ctx, info) {
    const callingUserData = await checkAuth(ctx, {
      type: USER_STATUS_MODERATOR,
      status: USER_STATUS_NORMAL,
      action: "updateQuestion",
    });

    const targetQaList =
      await queryQa.qa.getQa(parent, { questionids: [args.questionid] }, ctx, `
      {
        questionId
        subSubjectId
        difficulty
        flags
        media
        question {
          text
          detail
          type
          data {
            conversion {
              step
              range {
                bottom {
                  value
                }
                top {
                  value
                  unit
                }
              }
            }
            survey {
              range {
                bottom {
                  value
                }
                top {
                  value
                  unit
                }
              }
              step
            }
          }
        }
        answer {
          detail
          data {
            multiple {
              choices {
                unit
                written
                value
              }
              choicesOffered
            }
            conversion {
              accuracy
              range {
                bottom {
                  unit
                }
              }
            }
          }
        }
      }
    `);


    if (!targetQaList.length) {
      throw new QuestionNotFound(args.questionid);
    }

    const targetQa = targetQaList[0];

    // Construct an existing set of input data from existing QA data.
    const existingQuestionInput = {
      text: targetQa.question.text || targetQa.question.detail,
      conversionInput: (targetQa.question.data && targetQa.question.data.conversion) ? {
        lower: targetQa.question.data.conversion.range.bottom.value,
        upper: targetQa.question.data.conversion.range.top.value,
        unit: targetQa.question.data.conversion.range.top.unit,
        step: targetQa.question.data.conversion.step,
      } : undefined,
      surveyrangeinput: (targetQa.question.data && targetQa.question.data.survey) ? {
        lower: targetQa.question.data.survey.range.bottom.value,
        upper: targetQa.question.data.survey.range.top.value,
        unit: targetQa.question.data.survey.range.top.unit,
        step: targetQa.question.data.survey.step,
      } : undefined,
    };

    const existingAnswerInput = {
      text: targetQa.answer.detail,
      multiplechoiceinput: targetQa.answer.data.multiple ? {
        choices: targetQa.answer.data.multiple.choices.map(choice => ({
          value: choice.value || undefined,
          written: choice.written || undefined,
          unit: choice.unit,
        })),
        choicesoffered: targetQa.answer.data.multiple.choicesOffered,
      } : undefined,
      conversioninput: targetQa.answer.data.conversion ? {
        unit: targetQa.answer.data.conversion.range.bottom.unit,
        accuracy: targetQa.answer.data.conversion.accuracy,
      } : undefined,
    };

    // Now merge inputted data with existing data.
    // Use custom merge, which doesn't merge arrays (very very important for
    // multiplechoiceinput.choices) and does NOT overwrite with undefined nor null values.
    customMerge(existingQuestionInput, args.questioninput || {});
    customMerge(existingAnswerInput, args.answerinput || {});

    // Now read to the type the question will be and remove incompatible data.
    const newType = args.type || targetQa.question.type;
    switch (newType) {
    case QUESTION_TYPE_WRITTEN:
      if (existingQuestionInput.conversioninput) {
        existingQuestionInput.conversioninput = undefined;
      }
      if (existingQuestionInput.surveyrangeinput) {
        existingQuestionInput.surveyrangeinput = undefined;
      }
      if (existingAnswerInput.conversioninput) {
        existingAnswerInput.conversioninput = undefined;
      }
      break;
    case QUESTION_TYPE_CONVERSION:
      if (existingQuestionInput.surveyrangeinput) {
        existingQuestionInput.surveyrangeinput = undefined;
      }
      if (existingAnswerInput.multiplechoiceinput) {
        existingAnswerInput.multiplechoiceinput = undefined;
      }
      break;
    case QUESTION_TYPE_SURVEY:
      if (existingQuestionInput.conversioninput) {
        existingQuestionInput.conversioninput = undefined;
      }
      if (existingAnswerInput.multiplechoiceinput) {
        existingAnswerInput.multiplechoiceinput = undefined;
      }
      break;
    default:
      break;
    }

    // Process the input to make the syntax strings and check for any mistakes.
    const { questionSyntaxString, answerSyntaxString } =
      checkAndParseQuestionAnswerInputs(
        newType,
        existingQuestionInput,
        existingAnswerInput,
      );

    // Update the question.
    return ctx.db.mutation.updateQuestion({
      where: {
        id: args.questionid,
      },
      data: {
        type: args.type,
        flags: args.flags,
        status: args.status,
        difficulty: args.difficulty,
        media: args.media,
        answer: answerSyntaxString,
        question: questionSyntaxString,
        parent: (args.subsubjectid && args.subsubjectid !== targetQa.subSubjectId) ?
          {
            connect: {
              id: args.subsubjectid,
            },
          }
          :
          undefined,
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
