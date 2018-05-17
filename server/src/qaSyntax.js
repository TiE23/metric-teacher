const {
  QuestionSyntaxError,
  AnswerSyntaxError,
} = require("./errors");
const {
  QUESTION_TYPE_WRITTEN,
  QUESTION_TYPE_CONVERSION,
  QUESTION_TYPE_SURVEY,
  ANSWER_TYPE_MULTIPLE_CHOICE,
  ANSWER_TYPE_CONVERSION,
  UNITS,
} = require("./constants");

function parseQAStrings(type, question, answer) {
  const questionPayload = this.parseQuestionString(type, question);
  const answerPayload = this.parseAnswerString(answer);
}

function parseQuestionString(type, question) {
  const basePattern = /\[([^\]]+)]/;              // Finds "[20.5-30c(0.5)s]"; Returns "20-30c(0.5)s"
  const rangePattern = /([\d.]+)-([\d.]+)(\w+)/;  // Finds "20.5-30c"; Returns "20.5", "30", "c"
  const stepPattern = /\(([\d.]+)\)s/;            // Finds "(0.5)s"; Returns "0.5"

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
    if (!rangeResult[1] || !rangeResult[2] || !rangeResult[3]) {
      throw new QuestionSyntaxError(question, "Range syntax is invalid");
    }

    // Parse the range.
    const valueA = parseFloat(rangeResult[1]);
    const valueB = parseFloat(rangeResult[2]);
    const unit = rangeResult[3].toLowerCase();

    // Make sure the numbers were readable and in the correct order.
    if (Number.isNaN(valueA) || Number.isNaN(valueB)) {
      throw new QuestionSyntaxError(question, "Range contains invalid number(s)");
    }
    if (valueA > valueB) {
      throw new QuestionSyntaxError(question, "Range needs to be smaller-larger");
    }

    // Make sure the unit is recognized.
    if (UNITS[unit] === undefined) {
      throw new QuestionSyntaxError(question, `Unit "${unit}" not recognized`);
    }

    questionPayload.data.rangeBottom = valueA;
    questionPayload.data.rangeTop = valueB;
    questionPayload.data.unit = unit;

    // Parse the step.
    const stepResult = question.match(stepPattern);
    if (stepResult !== null) {
      const stepValue = parseFloat(stepResult[1]);
      if (Number.isNaN(stepValue)) {
        throw new QuestionSyntaxError(question, "Step value contains invalid number");
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

function parseAnswerString(answer) {
  const basePattern = /\[([^\]]+)](\d{0,2})/;   // Finds "[m(0.5)a]"; Returns "m(0.5)a"
  const multipleChoiceDelimiter = "|";          // Splits on |
  const answerPattern = /([\d.]+)(\w+)/;        // Finds "2.5m"; Returns "2.5", "m"
  const unitPattern = /%(\w+)/;                 // Finds "m"; Returns "m"
  const unitAccuracyPattern = /\(([\d.]+)\)a/;  // Finds "(0.5)a"; Returns "0.5"

  // Create the basic return payload now.
  const answerPayload = {
    type: null,
    data: {
    },
  };

  // Perform the base match.
  const baseResult = answer.match(basePattern);
  if (baseResult === null) {
    throw new AnswerSyntaxError(answer, "Invalid answer syntax");
  }

  // Multiple choice answer...
  if (baseResult[1].indexOf(multipleChoiceDelimiter) !== -1) {
    // Split the choices
    const multipleChoiceAnswers = baseResult[1].split(multipleChoiceDelimiter);

    // Parse the choices offered.
    const choicesOffered = baseResult[2] ?
      Number.parseInt(baseResult[2], 10) : multipleChoiceAnswers.length;
    if (Number.isNaN(choicesOffered) || choicesOffered <= 0) {
      throw new AnswerSyntaxError(answer, "Invalid choice count defined");
    }

    // Parse the choices for values and units.
    const parsedMultipleChoiceAnswers = multipleChoiceAnswers.map((singleAnswer) => {
      const answerResult = singleAnswer.match(answerPattern);
      if (answerResult === null) {
        throw new AnswerSyntaxError(answer, `Answer choice "${singleAnswer}" not valid`);
      }

      // Parse the value.
      const value = Number.parseFloat(answerResult[1]);
      const unit = answerResult[2];

      // Make sure the number was readable.
      if (Number.isNaN(value)) {
        throw new AnswerSyntaxError(answer,
          `Answer choice "${singleAnswer}" contains invalid number`);
      }

      // Make sure the unit is recognized.
      if (UNITS[unit] === undefined) {
        throw new AnswerSyntaxError(answer, `Answer choice "${singleAnswer}" unit not recognized`);
      }

      return {
        value,
        unit,
      };
    });

    answerPayload.type = ANSWER_TYPE_MULTIPLE_CHOICE;
    answerPayload.data.choices = parsedMultipleChoiceAnswers;

    return answerPayload;

  // Conversion answer...
  } else {
    // Parse the unit.
    const unitResult = baseResult[1].match(unitPattern);
    if (unitPattern !== null) {
      const unit = unitResult[1];
      if (UNITS[unit] === undefined) {
        throw new AnswerSyntaxError(answer, `Unit "${unit}" not recognized`);
      }
      answerPayload.data.unit = unit;
    }

    // Parse the accuracy.
    const accuracyResult = baseResult[1].match(unitAccuracyPattern);
    if (accuracyResult !== null) {
      const accuracyValue = parseFloat(accuracyResult[1]);
      if (Number.isNaN(accuracyValue)) {
        throw new AnswerSyntaxError(answer, "Accuracy value contains invalid number");
      }
      answerPayload.data.accuracy = accuracyValue;
    } else {
      answerPayload.data.accuracy = 1.0;  // Defaults to 1.0
    }

    answerPayload.type = ANSWER_TYPE_CONVERSION;

    return answerPayload;
  }
}
