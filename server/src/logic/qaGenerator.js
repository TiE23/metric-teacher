const random = require("lodash/random");

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

  const composedQuestionData = composeQuestionData(
    questionPayload,
    answerPayload,
    surveyData,
  );

  let composedAnswerData = null;

  // Written question
  if (questionPayload.type === QUESTION_TYPE_WRITTEN) {
    composedAnswerData = composeWrittenAnswerData(answerPayload);

  // Conversion question
  } else if (questionPayload.type === QUESTION_TYPE_CONVERSION) {
    const composedConversionData =
      (composedQuestionData.questionData &&
        composedQuestionData.questionData.conversionData) || null;
    composedAnswerData = null;

  // Survey question
  } else if (questionPayload.type === QUESTION_TYPE_SURVEY) {
    const composedSurveyData =
      (composedQuestionData.questionData &&
        composedQuestionData.questionData.surveyData) || null;
    composedAnswerData = null;

  // Type not recognized!
  } else {  // eslint-disable-line no-else-return
    throw new QuestionTypeInvalid(questionPayload.type);
  }


  return {
    questionId: questionData.id,
    subSubjectId: questionData.parent,
    difficulty: questionData.difficulty,
    question: composedQuestionData,
    answer: composedAnswerData,
  };
}


function composeQuestionData(questionPayload, answerPayload, surveyData = null) {
  const answerUnit = (answerPayload.data && answerPayload.data.unit) || null;

  // Written question
  if (questionPayload.type === QUESTION_TYPE_WRITTEN) {
    return {
      questionType: questionPayload.type,
      questionText: questionPayload.data.text,
      detail: "",
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
      questionType: questionPayload.type,
      questionText: questionPayload.data.text,
      detail: surveyDetail,
      questionData: {
        surveyData: {
          step: questionPayload.data.step,
          surveyRange: {
            rangeBottom: {
              value: questionPayload.data.rangeBottom,
              unit: questionPayload.data.unit,
            },
            rangeTop: {
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
  const { choicesOffered, choices } = answerPayload.data;

  return {
    answerType: ANSWER_TYPE_MULTIPLE_CHOICE,
    answerData: {
      multipleChoiceData: {
        choicesOffered,
        choices,
      },
    },
  };
}


function composeConversionAnswerData(answerPayload, questionPayload, composedConversionData) {
  //
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
