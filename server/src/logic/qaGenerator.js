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


function qaGenerate(questionData, surveyResponseData = null) {
  const { questionPayload, answerPayload } = parseQAStrings(
    questionData.type,
    questionData.question,
    questionData.answer,
  );

  const generatedQuestion = generateQuestionData(
    questionPayload,
    answerPayload,
    surveyResponseData,
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


function generateQuestionData(questionPayload, answerPayload, surveyResponseData = null) {
  const answerUnit = (answerPayload.data && answerPayload.data.unit) || null;
  const questionUnit = questionPayload.data.unit;

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
    if (answerUnit === null) {
      throw new AnswerUnitMissing();
    }

    const value = makeValueFromRange(
      questionPayload.data.rangeBottom,
      questionPayload.data.rangeTop,
      questionPayload.data.step,
    );

    const questionText = makeConversionQuestion(
      value,
      questionPayload.data.unit,
      answerUnit,
    );

    return {
      type: questionPayload.type,
      text: questionText,
      detail: questionPayload.data.text || "",
      data: {
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
    if (answerUnit === null) {
      throw new AnswerUnitMissing();
    }
    // If the survey hasn't been taken, instruct the user.
    const surveyDetail = surveyResponseData ?
      "" :
      makeSurveyInstruction(UNITS[questionUnit].plural, questionPayload.data.step);

    // If the survey has been taken put the answer's info in new surveyResponse object. Else null.
    const surveyResponse = surveyResponseData ? parseUnitValue(surveyResponseData.answer) : null;

    // For the UI we might want to provide a reminder to the user's answer, so add English word.
    if (surveyResponse) {
      surveyResponse.unitWord =
        surveyResponse.value === 1 ?
          UNITS[questionUnit].singular :
          UNITS[questionUnit].plural;
    }

    return {
      type: questionPayload.type,
      text: questionPayload.data.text,
      detail: surveyDetail,
      data: {
        surveyResponseData: {
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
          surveyResponse, // Null or { value: 2, unit: "m", unitWord: "meters" }
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

    // Survey question
  } else if (questionPayload.type === QUESTION_TYPE_SURVEY) {
    // If the survey has been answered generate data.
    const { surveyResponse } = generatedQuestion.data.surveyResponseData;
    if (surveyResponse) {
      // Compose conversions
      generatedAnswer.data.conversionData = composeConversionAnswerData(
        surveyResponse.value,
        surveyResponse.unit,
        answerPayload.data.unit,
        answerPayload.data.accuracy,
      );

      // Compose survey data
      generatedAnswer.data.surveyData = composeSurveyAnswerData(
        surveyResponse.value,
        surveyResponse.unit,
        questionPayload.data.step,
      );
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
  const possibleSteps = Math.max((top - bottom) / step, 1);

  return Math.min(bottom + (step * random(possibleSteps)), top);
}


function makeConversionQuestion(value, fromUnit, toUnit) {
  const fromUnitWord = value === 1 ? UNITS[fromUnit].singular : UNITS[fromUnit].plural;
  const toUnitWord = UNITS[toUnit].plural;

  const questionForms = [
    `Convert ${value} ${fromUnitWord} to ${toUnitWord}.`,
    `What is ${value} ${fromUnitWord} in ${toUnitWord}?`,
  ];

  return questionForms[random(questionForms.length - 1)];
}


function makeSurveyInstruction(unitWord, step) {
  const stepDescription = step === 1 || step === 0 ?  // Handle 0 as a 1.
    "rounded to the nearest whole number" :
    `rounded to the nearest multiple of ${step}`;

  const instructionForms = [
    `Write your answer in ${unitWord}, ${stepDescription}.`,
    `Please give your answer in ${unitWord}, ${stepDescription}.`,
    `Please answer in ${unitWord} ${stepDescription}.`,
  ];

  return instructionForms[random(instructionForms.length - 1)];
}


module.exports = {
  qaGenerate,
};
