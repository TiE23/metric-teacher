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
  ANSWER_TYPE_MULTIPLE_CHOICE,
  ANSWER_TYPE_CONVERSION,
  ANSWER_TYPE_SURVEY,
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

  const composedQuestion = composeQuestionData(
    questionPayload,
    answerPayload,
    surveyData,
  );

  const composedAnswer = {
    type: answerPayload.type,
    data: {},
  };

  // Get multiple choice data
  if (questionPayload.type === QUESTION_TYPE_WRITTEN) {
    composedAnswer.data.multipleChoiceData = composeWrittenAnswerData(answerPayload);

  // Get conversion data
  } else if (questionPayload.type === QUESTION_TYPE_CONVERSION ||
    questionPayload.type === QUESTION_TYPE_SURVEY) {
    const composedConversionData = composedQuestion.data.conversionData;
    composedAnswer.data.conversionData = composeConversionAnswerData(
      answerPayload,
      questionPayload,
      composedConversionData,
    );

  // Survey question
  } else if (questionPayload.type === QUESTION_TYPE_SURVEY) {
    const composedSurveyData = composedQuestion.data.surveyData;

    composedAnswer.data.surveyData = null;

  // Type not recognized!
  } else {  // eslint-disable-line no-else-return
    throw new QuestionTypeInvalid(questionPayload.type);
  }


  return {
    questionId: questionData.id,
    subSubjectId: questionData.parent,
    difficulty: questionData.difficulty,
    question: composedQuestion,
    answer: composedAnswer,
  };
}


function composeQuestionData(questionPayload, answerPayload, surveyData = null) {
  const answerUnit = (answerPayload.data && answerPayload.data.unit) || null;

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

    const value = generateValueFromRange(
      questionPayload.data.rangeBottom,
      questionPayload.data.rangeTop,
      questionPayload.data.step,
    );

    const questionText = generateConversionQuestion(
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
    const surveyDetail = surveyData ?
      "" :
      generateSurveyInstruction(UNITS[answerUnit].plural, questionPayload.data.step);

    // If the survey has been taken put the answer's info in new surveyAnswer object. Else null.
    const surveyAnswer = surveyData ? parseUnitValue(surveyData.answer) : null;

    // For the UI we might want to provide a reminder to the user's answer, so add English word.
    if (surveyAnswer) {
      surveyAnswer.unitWord =
        surveyAnswer.value === 1 ?
          UNITS[surveyAnswer.unit].singular :
          UNITS[surveyAnswer.unit].plural;
    }

    return {
      type: questionPayload.type,
      text: questionPayload.data.text,
      detail: surveyDetail,
      data: {
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
          surveyAnswer, // Null or { value: 2, unit: "m", unitWord: "meters" }
        },
      },
    };
  } else {  // eslint-disable-line no-else-return
    throw new QuestionTypeInvalid(questionPayload.type);
  }
}


function composeWrittenAnswerData(answerPayload) {
  return {
    choicesOffered: answerPayload.data.choicesOffered,
    choices: answerPayload.data.choices,
  };
}


function composeConversionAnswerData(answerPayload, questionPayload, composedConversionData) {
  const answerUnit = answerPayload.data.unit;
  const { value, unit } = composedConversionData.exact;
  const { roundedValue, exactValue, roundingLevel } = convertValue(value, unit, answerUnit);
  const { accuracy } = answerPayload.data;
  const isTemperature = UNITS[answerUnit].subject === "temperature";

  // Figure out the ranges.
  let bottomValue = round(roundedValue - accuracy, roundingLevel);
  if (!isTemperature) {
    bottomValue = Math.max(bottomValue, 0); // When not temperature do not let bottom be negative.
  }
  const topValue = round(roundedValue + accuracy, roundingLevel);

  // Generate the nine choices.
  // If a generated choice is negative (and the units aren't temperature) it'll generate
  // a half-step answer. If roundedValue = 1 and accuracy = 1, it will generate for temperature:
  // [ 1, 0, 2,  -1, 3,  -2, 4,  -3, 5 ], else
  // [ 1, 0, 2, 2.5, 3, 3.5, 4, 4.5, 5 ] for everything else that cannot go negative.
  const choiceValues = CONVERSION_CHOICE_OPTIONS_MULTIPLIERS.map((multiplier) => {
    let choiceValue = roundedValue + (accuracy * multiplier);
    if (choiceValue < 0 && !isTemperature) {
      choiceValue = roundedValue + (accuracy * (Math.abs(multiplier) - 0.5));
    }
    return round(choiceValue, roundingLevel);
  });
  const choices = choiceValues.map(choice => ({ value: choice, unit: answerUnit }));

  return {
    accuracy,
    exact: exactValue,
    rounded: roundedValue,
    range: {
      bottom: { value: bottomValue, unit: answerUnit },
      top: { value: topValue, unit: answerUnit },
    },
    choices,
  };
}


function composeSurveyAnswerData(answerPayload, questionPayload, composedSurveyData) {
  //
}


function generateValueFromRange(bottom, top, step) {
  if (step <= 0 || bottom === top) {
    return bottom;
  }
  const possibleSteps = Math.max((top - bottom) / step, 1);

  return Math.min(bottom + (step * random(possibleSteps)), top);
}


function generateConversionQuestion(value, fromUnit, toUnit) {
  const fromUnitWord = value === 1 ? UNITS[fromUnit].singular : UNITS[fromUnit].plural;
  const toUnitWord = UNITS[toUnit].plural;

  const questionForms = [
    `Convert ${value} ${fromUnitWord} to ${toUnitWord}.`,
    `What is ${value} ${fromUnitWord} in ${toUnitWord}?`,
  ];

  return questionForms[random(questionForms.length - 1)];
}


function generateSurveyInstruction(unitWord, step) {
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
