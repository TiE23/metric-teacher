const {
  QuestionSyntaxError,
  AnswerSyntaxError,
  QuestionAnswerError,
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

/**
 * Returns two new objects for the question and the answer. The shape of the objects can vary, with
 * two different variations for each:
 * Question can be:
 *  Written (only compatible with multiple-choice answers)
 *  Range (only compatible with conversion answers)
 *  Survey (only compatible with conversion answers)
 *
 * Answer can be:
 *  Multiple-choice (only compatible with written questions)
 *  Conversion (only compatible with range or survey)
 *
 * Question: Written ("What temperature does water boil at in Celsius?")
 * {
 *   type: QUESTION_TYPE_WRITTEN,
 *   data: {
 *     syntax: "",
 *     text: "What temperature does water boil at in Celsius?",
 *   },
 * }
 *
 * Question: Range or Survey ("This is about room temperature. [22-25c(0.5)s]")
 * {
 *   type: QUESTION_TYPE_CONVERSION,             // Can also be QUESTION_TYPE_SURVEY
 *   data: {
 *     syntax: "[22-25c(0.5)s]",
 *     text: "This is about room temperature.",  // Defaults to blank if not defined.
 *     rangeBottom: 22,
 *     rangeTop: 25,*
 *     unit: "c",
 *     step: 0.5,                                // Defaults to 1 if not defined.
 *   },
 * }
 *
 * Answer: Multiple choice ("[50cm|1m|1.5m]2")
 * {
 *   type: ANSWER_TYPE_MULTIPLE_CHOICE,
 *   data: {
 *     syntax: "[50cm|1m|1.5m]2",
 *     choicesOffered: 2,          // This is always defined even if not written.
 *     choices : [
 *       {
 *         value: 50, unit: "cm",
 *       },
 *       {
 *         value: 1, unit: "m",
 *       },
 *       {
 *         value: 1.5, unit: "m",
 *       },
 *     ],
 *   },
 * }
 *
 * Answer: Conversion or survey ("[ft(2)a]")
 * {
 *   type: ANSWER_TYPE_CONVERSION, // Or ANSWER_TYPE_SURVEY (they look the same)
 *   data: {
 *     syntax: "[ft(2)a]"
 *     unit: "ft",
 *     accuracy: 2,               // Defaults to 1 if not defined.
 *   },
 * }
 * @param questionType
 * @param question
 * @param answer
 * @returns {{questionPayload, answerPayload}}
 */
function parseQAStrings(questionType, question, answer) {
  const questionPayload = parseQuestionString(questionType, question);
  const answerPayload = parseAnswerString(questionType, answer);

  // Check that the question/answer types make sense.
  switch (questionPayload.type) {
  case QUESTION_TYPE_WRITTEN:
    if (answerPayload.type !== ANSWER_TYPE_MULTIPLE_CHOICE) {
      throw new QuestionAnswerError(
        questionPayload.data.question || questionPayload.data.syntax,
        answerPayload.data.syntax,
        "Written questions must have multiple-choice answers.",
      );
    }
    break;
  case QUESTION_TYPE_CONVERSION:
    if (answerPayload.type !== ANSWER_TYPE_CONVERSION) {
      throw new QuestionAnswerError(
        questionPayload.data.syntax,
        answerPayload.data.syntax,
        "Conversion questions must have conversion answers.",
      );
    }
    break;
  case QUESTION_TYPE_SURVEY:
    if (answerPayload.type !== ANSWER_TYPE_SURVEY) {
      throw new QuestionAnswerError(
        questionPayload.data.syntax,
        answerPayload.data.syntax,
        "Survey questions must have survey answers.",
      );
    }
    break;
  default:
    break;
  }

  // Check that the units make sense.
  checkUnitCompatibility(questionPayload, answerPayload);

  return { questionPayload, answerPayload };
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
      data: {
        syntax: "",
        text: "",
      },
    };

    // If there was text before the pattern make it the question's text.
    if (baseResult.index !== 0) {
      questionPayload.data.text = baseResult.input.slice(0, baseResult.index - 1).trim();
    }

    // Add the question's syntax body to the payload.
    questionPayload.data.syntax = baseResult[0];

    const rangeResult = baseResult[0].match(rangePattern);

    // Make sure we have the expected number of results for range minimum, range maximum, and unit.
    if (rangeResult === null || !rangeResult[1] || !rangeResult[2] || !rangeResult[3]) {
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
  } else {  // eslint-disable-line no-else-return
    throw new QuestionSyntaxError(
      question,
      `Question type "${type}" was not expected with question "${question}"`,
    );
  }
}


function parseAnswerString(questionType, answer) {
  // Finds "[1m|2m]2"; Returns "1m|2m", "2" // Finds "[m(0.5)a]"; Returns "m(0.5)a"
  const basePattern = /\[([^\]]+)](\d{0,2})/;
  const multipleChoiceDelimiter = "|";          // Splits on |
  const unitPattern = /^(\w+)/;                 // Finds "m"; Returns "m"
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

  // Add the answer's syntax body to the payload.
  answerPayload.data.syntax = baseResult[0];

  // Multiple choice answer...
  if (baseResult[1].indexOf(multipleChoiceDelimiter) !== -1) {
    // Split the choices
    const multipleChoiceAnswers = baseResult[1].split(multipleChoiceDelimiter);

    // Parse the choices offered.
    const choicesOffered = baseResult[2] ?
      Number.parseInt(baseResult[2], 10) : multipleChoiceAnswers.length;
    if (Number.isNaN(choicesOffered)) {
      throw new AnswerSyntaxError(answer, "Invalid choice count defined");
    }
    if (choicesOffered < 2) {
      throw new AnswerSyntaxError(answer, "Must have at least two choices");
    }
    if (choicesOffered > multipleChoiceAnswers.length) {
      throw new AnswerSyntaxError(answer, "Cannot offer more choices than actually defined");
    }
    answerPayload.data.choicesOffered = choicesOffered;

    // Parse the choices for values and units.
    const parsedMultipleChoiceAnswers = multipleChoiceAnswers.map((singleAnswer) => {
      return parseUnitValue(singleAnswer, answer);
    });

    answerPayload.type = ANSWER_TYPE_MULTIPLE_CHOICE;
    answerPayload.data.choices = parsedMultipleChoiceAnswers;

    return answerPayload;

  // Conversion / Survey answer...
  } else {  // eslint-disable-line no-else-return
    // Parse the unit.
    const unitResult = baseResult[1].match(unitPattern);
    if (unitResult !== null) {
      const unit = unitResult[1];
      if (UNITS[unit] === undefined) {
        throw new AnswerSyntaxError(answer, `Unit "${unit}" not recognized`);
      }
      answerPayload.data.unit = unit;
    } else {
      throw new AnswerSyntaxError(answer, "No unit declared");
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

    answerPayload.type =
      questionType === QUESTION_TYPE_CONVERSION ?
        ANSWER_TYPE_CONVERSION :
        ANSWER_TYPE_SURVEY;

    return answerPayload;
  }
}


function parseUnitValue(unitValue, parentAnswer = "") {
  const unitValuePattern = /([\d.]+)(\w+)/;
  const answer = parentAnswer || unitValue;

  const unitValueResult = unitValue.match(unitValuePattern);
  if (unitValueResult === null) {
    throw new AnswerSyntaxError(answer, `Answer "${unitValue}" not valid`);
  }

  // Parse the value.
  const value = Number.parseFloat(unitValueResult[1]);
  const unit = unitValueResult[2];

  // Make sure the number was readable.
  if (Number.isNaN(value)) {
    throw new AnswerSyntaxError(answer,
      `Answer "${unitValue}" contains invalid number`);
  }

  // Make sure the unit is recognized.
  if (UNITS[unit] === undefined) {
    throw new AnswerSyntaxError(answer, `Answer "${unitValue}" unit not recognized`);
  }

  return {
    value,
    unit,
  };
}


function checkUnitCompatibility(questionPayload, answerPayload) {
  if (questionPayload.type === QUESTION_TYPE_CONVERSION ||
    questionPayload.type === QUESTION_TYPE_SURVEY) {
    // Conversion answer.
    const questionUnit = questionPayload.data.unit;
    const questionUnitSubject = UNITS[questionUnit].subject;
    const questionUnitFamily = UNITS[questionUnit].family;

    // Reject answers that are of the wrong subject.
    // Ex: Convert 10m to l.
    if (UNITS[answerPayload.data.unit].subject !== questionUnitSubject) {
      throw new QuestionAnswerError(
        questionPayload.data.syntax,
        answerPayload.data.syntax,
        `Answer unit "${answerPayload.data.unit}" incompatible with question unit "${questionUnit}"`,
      );
    }

    // Reject answers that are of the same family.
    // Ex: Convert 10m to km.
    if (UNITS[answerPayload.data.unit].family === questionUnitFamily) {
      throw new QuestionAnswerError(
        questionPayload.data.syntax,
        answerPayload.data.syntax,
        `Answer unit "${answerPayload.data.unit}" is the same family (${questionUnitFamily}) as question unit "${questionUnit}"`,
      );
    }
  } else {
    // Multiple-choice answer.
    const firstChoiceUnit = answerPayload.data.choices[0].unit;
    const firstChoiceSubject = UNITS[firstChoiceUnit].subject;
    const firstChoiceFamily = UNITS[firstChoiceUnit].family;

    // Need to check each answer for problems.
    answerPayload.data.choices.forEach((choice) => {
      // Reject multiple choice answers with mixed-up subjects.
      // Ex: Choices 10km, 10l.
      if (UNITS[choice.unit].subject !== firstChoiceSubject) {
        throw new AnswerSyntaxError(
          answerPayload.data.syntax,
          "Answer choices have mixed-up measurement subjects",
        );
      }

      // Reject multiple choice answers with mixed-up families.
      // Ex: Choices 10km, 10mi.
      if (UNITS[choice.unit].family !== firstChoiceFamily) {
        throw new AnswerSyntaxError(
          answerPayload.data.syntax,
          "Answer choices have mixed-up metric / imperial values",
        );
      }
    });
  }
}


module.exports = {
  parseQAStrings,
  parseUnitValue,
};
