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
  CONVERSION_CHOICE_OPTIONS_MULTIPLIERS,
  UNITS,
} = require("../constants");
const {
  parseQAStrings,
  parseUnitValue,
} = require("./qaSyntax");


function qaGenerate(questionData, surveyData = null) {
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
    subSubjectId: questionData.parent,
    difficulty: questionData.difficulty,
    question: generatedQuestion,
    answer: generatedAnswer,
  };
}


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
        conversionData: {
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
    const response = surveyData ? parseUnitValue(surveyData.answer) : null;
    if (response) {
      response.score = surveyData.score;
      response.id = surveyData.id;
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
        surveyData: {
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
          response, // Null or { value: 2, unit: "m", score: 0, id: "someSurveyId" }
        },
      },
    };
  } else {  // eslint-disable-line no-else-return
    throw new QuestionTypeInvalid(questionPayload.type);
  }
}


function generateAnswerData(questionPayload, answerPayload, generatedQuestion) {
  const generatedAnswer = {
    type: answerPayload.type,
    data: {},
  };

  // Get multiple choice data
  if (questionPayload.type === QUESTION_TYPE_WRITTEN) {
    generatedAnswer.data.multipleChoiceData = composeWrittenAnswerData(answerPayload);

    // Get conversion data
  } else if (questionPayload.type === QUESTION_TYPE_CONVERSION) {
    generatedAnswer.data.conversionData = composeConversionAnswerData(
      generatedQuestion.data.conversionData.exact.value,
      generatedQuestion.data.conversionData.exact.unit,
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
    const { response } = generatedQuestion.data.surveyData;
    if (response) {
      // Compose conversions
      generatedAnswer.data.conversionData = composeConversionAnswerData(
        response.value,
        response.unit,
        answerPayload.data.unit,
        answerPayload.data.accuracy,
      );

      // Compose survey data
      generatedAnswer.data.surveyData = composeSurveyAnswerData(
        response.value,
        response.unit,
        questionPayload.data.step,
      );

      generatedAnswer.data.toUnitWord = {
        singular: UNITS[answerPayload.data.unit].singular,
        plural: UNITS[answerPayload.data.unit].plural,
      };
    } else {
      // Otherwise set to null
      generatedAnswer.data.surveyData = null;
    }

    // Type not recognized!
  } else {
    throw new QuestionTypeInvalid(questionPayload.type);
  }

  return generatedAnswer;
}


function composeWrittenAnswerData(answerPayload) {
  return {
    choicesOffered: answerPayload.data.choicesOffered,
    choices: answerPayload.data.choices,
  };
}


function composeConversionAnswerData(fromValue, fromUnit, toUnit, toAccuracy) {
  const { roundedValue, exactValue, roundingLevel } = convertValue(fromValue, fromUnit, toUnit);
  const isTemperature = UNITS[toUnit].subject === "temperature";

  // Figure out the ranges.
  let bottomValue = round(roundedValue - toAccuracy, roundingLevel);
  if (!isTemperature) {
    bottomValue = Math.max(bottomValue, 0); // When not temperature do not let bottom be negative.
  }
  const topValue = round(roundedValue + toAccuracy, roundingLevel);

  // roundedValue, accuracy, isTemperature
  const choices = makeChoices(
    roundedValue,
    roundingLevel,
    toUnit,
    toAccuracy,
    isTemperature,
  );

  return {
    accuracy: toAccuracy,
    exact: exactValue,
    rounded: roundedValue,
    range: {
      bottom: { value: bottomValue, unit: toUnit },
      top: { value: topValue, unit: toUnit },
    },
    choices,
  };
}


function composeSurveyAnswerData(value, unit, step) {
  const roundingLevel = UNITS[unit].round;
  const isTemperature = UNITS[unit].subject === "temperature";
  return {
    choices: makeChoices(value, roundingLevel, unit, step, isTemperature),
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
