const {
  QuestionSyntaxError,
  AnswerSyntaxError,
} = require("./errors");
const {
  QUESTION_TYPE_WRITTEN,
  QUESTION_TYPE_CONVERSION,
  QUESTION_TYPE_SURVEY,
} = require("./constants");

function parseQAStrings(type, question, answer) {
  const questionPayload = this.parseQuestionString(type, question);
  const answerPayload = this.parseAnswerString(answer, questionPayload);
}

function parseQuestionString(type, question) {
  const basePattern = /\[([^\]]+)]/;        // Finds "[20.5-30c(0.5)s]"; Returns "20-30c(0.5)s"
  const rangePattern = /[\d.]+-[\d.]+\w+/;  // Finds "20.5-30c"; Returns "20.5", "30", "c"
  const stepPattern = /\(([\d.]+)\)s/;      // Finds "(0.5)s"; Returns "0.5"

  const baseResult = question.match(basePattern);

  // The question has special syntax in it.
  if (baseResult !== null && (type === QUESTION_TYPE_CONVERSION || type === QUESTION_TYPE_SURVEY)) {
    // Create the basic return payload now.
    const questionPayload = {
      type,
      data: {},
    };

    // If there was text before the pattern make it the question's text.
    if (baseResult.index !== 1) {
      questionPayload.data.text = baseResult.input.slice(0, baseResult.index - 1).trim();
    }

    const rangeResult = baseResult[0].match(rangePattern);

    // Make sure we have the expected number of results for range minimum, range maximum, and unit.
    if (rangeResult.length !== 4) {
      throw new QuestionSyntaxError(question, "Range syntax is invalid");
    }

    // Parse the range.
    const valueA = parseFloat(rangeResult[1]);
    const valueB = parseFloat(rangeResult[2]);
    const unit = rangeResult[3];
    if (Number.isNaN(valueA) || Number.isNaN(valueB)) {
      throw new QuestionSyntaxError(question, "Range contains invalid number(s)");
    }
    if (valueA > valueB) {
      throw new QuestionSyntaxError(question, "Range needs to be smaller-larger");
    }

    questionPayload.data.rangeBottom = valueA;
    questionPayload.data.rangeTop = valueB;
    questionPayload.data.unit = unit;

    // Parse the step.
    const stepResult = question.match(stepPattern);
    if (stepResult !== null) {
      const stepValue = parseFloat(stepResult[1]);
      if (Number.isNaN(stepValue)) {
        throw new QuestionSyntaxError(question, "Step contains invalid number");
      }
      questionPayload.data.step = stepValue;
    } else {
      questionPayload.data.step = 1.0;  // Defaults to 1.0
    }

    // We're done. Return the parsed payload of this question.
    return questionPayload;

  // Text question. Return quickly.
  } else if (baseResult === null && type === QUESTION_TYPE_WRITTEN) {
    const trimmedQuestion = question.trim();
    if (trimmedQuestion.length === 0) {
      throw new QuestionSyntaxError(question, "Question is blank");
    }

    return {
      type,
      data: {
        text: trimmedQuestion,
      },
    };

  // Detected syntax and reported type not as expected.
  } else {
    throw new QuestionSyntaxError(question, `Question type "${type}" was not expected`);
  }
}

function parseAnswerString(answer, questionPayload) {
  //
}
