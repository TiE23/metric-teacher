const random = require("lodash/random");

const {
  QuestionTypeInvalid,
  AnswerUnitMissing,
} = require("../errors");
const {
  QUESTION_TYPE_WRITTEN,
  QUESTION_TYPE_CONVERSION,
  QUESTION_TYPE_SURVEY,
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

  return {
    questionId: questionData.id,
    subSubjectId: questionData.parent,
    difficulty: questionData.difficulty,
    question: composeQuestionData(
      questionPayload,
      (answerPayload.data && answerPayload.data.unit) || null,
      surveyData,
    ),
    answer: composeAnswerData(answerPayload),
  };
}


function composeQuestionData(questionPayload, answerUnit = null, survey = null) {
  // Written question
  if (questionPayload.type === QUESTION_TYPE_WRITTEN) {
    return {
      questionType: questionPayload.type,
      questionText: questionPayload.data.text,
      detail: null,
      questionData: null,
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
      questionType: questionPayload.type,
      questionText,
      detail: questionPayload.data.text || "",
      questionData: {
        step: questionPayload.data.step,
        exact: {
          value,
          unit: questionPayload.data.unit,
        },
      },
    };

  // Survey question
  } else if (questionPayload.type === QUESTION_TYPE_SURVEY) {
    // If the survey hasn't been taken, instruct the user.
    const surveyDetail = survey ? "" : generateSurveyInstruction(UNITS[answerUnit].plural);

    // If the survey has been taken put the answer's info in new surveyAnswer object. Else null.
    const surveyAnswer = survey ? parseUnitValue(survey.answer) : null;

    // For the UI we might want to provide a reminder to the user's answer, so add English word.
    if (surveyAnswer) {
      surveyAnswer.unitWord = surveyAnswer.value === 1 ?
        UNITS[surveyAnswer.unit].singular : UNITS[surveyAnswer.unit].plural;
    }

    return {
      questionType: questionPayload.type,
      questionText: questionPayload.data.text,
      detail: surveyDetail,
      questionData: {
        step: questionPayload.data.step,
        bottom: {
          value: questionPayload.data.rangeBottom,
          unit: questionPayload.data.unit,
        },
        top: {
          value: questionPayload.data.rangeTop,
          unit: questionPayload.data.unit,
        },
        surveyAnswer, // Null or { value: 2, unit: "m", unitWord: "meters" }
      },
    };
  } else {
    throw new QuestionTypeInvalid(questionPayload.type);
  }
}


function composeAnswerData(answerPayload, targetAnswerValue = null) {
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


function generateSurveyInstruction(unitWord) {
  const instructionForms = [
    `Write your answer in ${unitWord}.`,
    `Please give your answer in ${unitWord}.`,
    `Please answer in ${unitWord}.`,
  ];

  return instructionForms[random(instructionForms.length - 1)];
}


module.exports = {
  qaGenerate,
};
