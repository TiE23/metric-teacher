const random = require("lodash/random");
const round = require("lodash/round");

const {
  convertValue,
} = require("./unitConverter");

const {
  QuestionTypeInvalid,
  AnswerUnitMissing,
} = require("../errors");

const {
  QUESTION_TYPE_WRITTEN,
  QUESTION_TYPE_CONVERSION,
  QUESTION_TYPE_SURVEY,
  SURVEY_STATUS_NORMAL,
  CONVERSION_CHOICE_OPTIONS_MULTIPLIERS,
  UNITS,
} = require("../constants");

const {
  parseQAStrings,
  parseSingleAnswer,
} = require("./qaSyntax");


/**
 * Main function takes in question data from the database and, optionally, a matching student
 * survey row of data. Using smaller functions returns a large constructed object containing
 * data that is intended for consumption by the client.
 * @param questionData
 * @param surveyData
 * @returns {{
 *  questionId: *,
 *  subSubjectId: *,
 *  difficulty: *
 *  question: {type, text, detail, data},
 *  answer: {type: *, data: {detail: *}}
 * }}
 */
function qaGenerate(questionData, surveyData = null) {
  if (!questionData) {
    return null;
  }

  const { questionPayload, answerPayload } = parseQAStrings(
    questionData.type,
    questionData.question,
    questionData.answer,
  );

  const generatedQuestion = generateQuestionData(
    questionPayload,
    answerPayload.data.unit,
    surveyData,
  );

  const generatedAnswer = generateAnswerData(
    questionPayload,
    answerPayload,
    generatedQuestion,
  );

  return {
    questionId: questionData.id,
    subSubjectId: questionData.parent.id,
    difficulty: questionData.difficulty,
    flags: questionData.flags,
    media: questionData.media,
    question: generatedQuestion,
    answer: generatedAnswer,
  };
}


/**
 * This function takes care of generating the content of the question object inside the QA object.
 * @param questionPayload
 * @param answerUnit
 * @param surveyData
 * @returns {*}
 */
function generateQuestionData(questionPayload, answerUnit = null, surveyData = null) {
  // Written question
  if (questionPayload.type === QUESTION_TYPE_WRITTEN) {
    return {
      type: questionPayload.type,
      text: questionPayload.data.text,
      detail: "",
      data: null,
    };

  // Conversion question
  } else if (questionPayload.type === QUESTION_TYPE_CONVERSION) {
    if (!answerUnit) {
      throw new AnswerUnitMissing();
    }

    const value = makeValueFromRange(
      questionPayload.data.rangeBottom,
      questionPayload.data.rangeTop,
      questionPayload.data.step,
    );

    return {
      type: questionPayload.type,
      text: "",
      detail: questionPayload.data.text || "",
      data: {
        fromUnitWord: {
          singular: UNITS[questionPayload.data.unit].singular,
          plural: UNITS[questionPayload.data.unit].plural,
        },
        conversion: {
          step: questionPayload.data.step,
          exact: {
            value,
            unit: questionPayload.data.unit,
          },
        },
      },
    };

  // Survey question
  } else if (questionPayload.type === QUESTION_TYPE_SURVEY) {
    if (!answerUnit) {
      throw new AnswerUnitMissing();
    }

    // If the survey has been taken put the answer's info in new response object. Else null.
    let response = null;
    let surveyStatus = null;
    if (surveyData) {
      response = {
        // When using parseSingleAnswer we must strip out square brackets.
        answer: surveyData.status === SURVEY_STATUS_NORMAL ?
          parseSingleAnswer(surveyData.answer.replace(/[[\]]/g, ""), surveyData.answer) :
          null,
        score: surveyData.score,
        id: surveyData.id,
        detail: surveyData.detail,
      };
      surveyStatus = surveyData.status;
    }

    return {
      type: questionPayload.type,
      text: questionPayload.data.text,
      detail: "",
      data: {
        fromUnitWord: {
          singular: UNITS[questionPayload.data.unit].singular,
          plural: UNITS[questionPayload.data.unit].plural,
        },
        survey: {
          status: surveyStatus,
          step: questionPayload.data.step,
          surveyRange: {
            bottom: {
              value: questionPayload.data.rangeBottom,
              unit: questionPayload.data.unit,
            },
            top: {
              value: questionPayload.data.rangeTop,
              unit: questionPayload.data.unit,
            },
          },
          response, // Null or { value: 2, unit: "m", score: 0, id: "someId", detail: "Foo" }
        },
      },
    };
  } else {  // eslint-disable-line no-else-return
    throw new QuestionTypeInvalid(questionPayload.type);
  }
}


/**
 * This function takes care of generating the content of the answer object inside the QA object.
 * It's mostly just organizing of other more important functions. If the question is a written
 * question, a conversion question, or a survey question will determine how the returned data
 * looks.
 * @param questionPayload
 * @param answerPayload
 * @param generatedQuestion
 * @returns {{type: *, data: {detail: *}}}
 */
function generateAnswerData(questionPayload, answerPayload, generatedQuestion) {
  const generatedAnswer = {
    type: answerPayload.type,
    detail: answerPayload.data.detail,
    data: {},
  };

  // Get multiple choice data
  if (questionPayload.type === QUESTION_TYPE_WRITTEN) {
    generatedAnswer.data.multiple = composeWrittenAnswerData(answerPayload);

    // Get conversion data
  } else if (questionPayload.type === QUESTION_TYPE_CONVERSION) {
    generatedAnswer.data.conversion = composeConversionAnswerData(
      generatedQuestion.data.conversion.exact.value,
      generatedQuestion.data.conversion.exact.unit,
      answerPayload.data.unit,
      answerPayload.data.accuracy,
    );

    generatedAnswer.data.toUnitWord = {
      singular: UNITS[answerPayload.data.unit].singular,
      plural: UNITS[answerPayload.data.unit].plural,
    };

    // Survey question
  } else if (questionPayload.type === QUESTION_TYPE_SURVEY) {
    // If the survey has been answered generate data.
    const { response } = generatedQuestion.data.survey;
    if (response && response.answer !== null) {
      // Compose conversions
      generatedAnswer.data.conversion = composeConversionAnswerData(
        response.answer.value,
        response.answer.unit,
        answerPayload.data.unit,
        answerPayload.data.accuracy,
      );

      // Compose survey data
      generatedAnswer.data.survey = {
        choices: makeChoices(
          response.answer.value,
          UNITS[response.answer.unit].round,
          response.answer.unit,
          questionPayload.data.step,
          UNITS[response.answer.unit].subject === "temperature",
        ),
      };

      generatedAnswer.data.toUnitWord = {
        singular: UNITS[answerPayload.data.unit].singular,
        plural: UNITS[answerPayload.data.unit].plural,
      };
    } else {
      // Otherwise set to null
      generatedAnswer.data.survey = null;
    }

    // Type not recognized!
  } else {
    throw new QuestionTypeInvalid(questionPayload.type);
  }

  return generatedAnswer;
}


/**
 * Simple function essentially just returns the answerPayload. I just wanted to give it its own
 * function to follow the pattern.
 * @param answerPayload
 * @returns {{choicesOffered: *, choices: *|*[]|string[]}}
 */
function composeWrittenAnswerData(answerPayload) {
  return {
    choicesOffered: answerPayload.data.choicesOffered,
    choices: answerPayload.data.choices,
  };
}


/**
 * This function takes care of generating the extact, rounded, friendly conversions values to the
 * question. Additionally, it calls makeChoices() to return the multiple choice answers as well.
 * @param fromValue
 * @param fromUnit
 * @param toUnit
 * @param toAccuracy
 * @returns {{
 *  accuracy: *,
 *  exact: *,
 *  rounded:   *,
 *  friendly: *,
 *  range: {
 *    bottom: {value, unit: *},
 *    top: {value, unit: *}
 *  },
 *  choices: *
 * }}
 */
function composeConversionAnswerData(fromValue, fromUnit, toUnit, toAccuracy) {
  const {
    exactValue,
    roundedValue,
    roundingLevel,
    friendlyValue,
  } = convertValue(fromValue, fromUnit, toUnit);

  const isTemperature = UNITS[toUnit].subject === "temperature";

  // Figure out the ranges.
  let bottomValue = round(friendlyValue - toAccuracy, roundingLevel);
  if (!isTemperature) {
    bottomValue = Math.max(bottomValue, 0); // When not temperature do not let bottom be negative.
  }
  const topValue = round(friendlyValue + toAccuracy, roundingLevel);

  const choices = makeChoices(
    friendlyValue,
    roundingLevel,
    toUnit,
    toAccuracy,
    isTemperature,
  );

  return {
    accuracy: toAccuracy,
    exact: exactValue,
    rounded: roundedValue,
    friendly: friendlyValue,
    range: {
      bottom: { value: bottomValue, unit: toUnit },
      top: { value: topValue, unit: toUnit },
    },
    choices,
  };
}


/**
 * Generate the nine choices.
 * If a generated choice is negative (and the units aren't temperature) it'll generate
 * a half-step answer. If roundedValue = 1 and accuracy = 1, it will generate for temperature:
 * [ 1, 0, 2,  -1, 3,  -2, 4,  -3, 5 ], else
 * [ 1, 0, 2, 2.5, 3, 3.5, 4, 4.5, 5 ] for everything else that cannot go negative.
 * @param value
 * @param roundingLevel
 * @param unit
 * @param step
 * @param isTemperature
 * @returns {*}
 */
function makeChoices(value, roundingLevel, unit, step, isTemperature) {
  const choiceValues = CONVERSION_CHOICE_OPTIONS_MULTIPLIERS.map((multiplier) => {
    let choiceValue = value + (step * multiplier);
    if (choiceValue < 0 && !isTemperature) {
      choiceValue = value + (step * (Math.abs(multiplier) - 0.5));
    }
    return round(choiceValue, roundingLevel);
  });

  return choiceValues.map(choice => ({ value: choice, unit }));
}


/**
 * Simple function randomly selects a value from a bottom value, a top value, and a step.
 * @param bottom
 * @param top
 * @param step
 * @returns {*}
 */
function makeValueFromRange(bottom, top, step) {
  if (step <= 0 || bottom === top) {
    return bottom;
  }

  // If the step is larger than the difference between top and bottom, still give 1 a chance.
  const possibleSteps = Math.max((top - bottom) / step, 1);

  // If the random value is higher than top, return top.
  // For example, a range of [0.5,1ft] with step of 1 can result in 0.5 or 1.5. This becomes
  // 0.5 or 1.0, so that a range always has a chance of returning more than one value EXCEPT
  // in the case where bottom and top are the SAME value.
  return Math.min(bottom + (step * random(possibleSteps)), top);
}


module.exports = {
  qaGenerate,
};
