const round = require("lodash/round");

const {
  SurveyAnswerUnitInvalid,
  SurveyAnswerValueInvalid,
  QuestionSyntaxError,
  QuestionTextSyntaxError,
  QuestionConversionSyntaxError,
  AnswerGenericError,
  AnswerTextSyntaxError,
  AnswerMultipleChoiceSyntaxError,
  AnswerConversionSyntaxError,
} = require("../errors");

const {
  CONVERSION_DECIMAL_ACCURACY,
  QUESTION_DIFFICULTY_RANGES,
  WRITTEN_ANSWER_UNIT,
  UNITS,
} = require("../constants");


/**
 * Basic helper function returns a the value gated between a minimum and maxiumum. Very simple.
 * For example, if your min is 0 and your max is 1000...
 * Example A: 501 returns 501   (no change)
 * Example B: 2501 returns 1000 (maxxed out)
 * Example C: -15 returns 0     (minned in)
 * @param min
 * @param value
 * @param max
 * @returns {number}
 */
function minMax(min, value, max) {
  return Math.max(
    min,
    Math.min(
      value,
      max,
    ),
  );
}


/**
 * In the comments for this function we assume CONVERSION_DECIMAL_ACCURACY is set to 10. This could
 * be changed.
 * This performs two smoothing actions on floats: Finds whole numbers and deals with repeating 9s.
 * If a float number is within 1e-10 (0.0000000001) of a whole number, make it a whole number,
 * it's likely float inaccuracy. Ex: 89.99999999999999 (14 decimals) will be made 90.
 * If a float number is repeating 9s beyond the 10th decimal place.
 * @param value
 * @returns {Number}
 */
function floatSmoother(value) {
  if (value % 1 === 0) {
    return value;
  }

  // Smooth out repeating 9s to the 10th decimal place by adding 1e-11 and then rounding to
  // 10 places.
  // Ex: 0.04999999999999 (14 decimals) will have 0.00000000001 (11 decimals) added, which equals
  // 0.05000000000999. Round to 10 decimals you get 0.0500000000 (0999 chopped off)
  const roundedDecimal = round(
    value + parseFloat(`1e-${CONVERSION_DECIMAL_ACCURACY + 1}`),
    CONVERSION_DECIMAL_ACCURACY,
  );

  // This just rounds to a whole number.
  const roundedWhole = round(roundedDecimal);

  // If the difference between the whole and decimal number is small enough simply return the whole.
  return Math.abs(roundedWhole - roundedDecimal) < parseFloat(`1e-${CONVERSION_DECIMAL_ACCURACY}`) ?
    roundedWhole :
    roundedDecimal;
}


/**
 * ToDo - this functionality might be needed in the client to round user's answers in the UI.
 * Simple function rounds a value to the desired step.
 * Ex: value = 20.1, step = 0.25: returns 20.0
 * Ex: value = 20.2, step = 0.25: returns 20.25
 * Ex: value = 51, step = 10: returns 50
 * Ex: value = 57, step = 10: returns 60
 * Keep in mind that on 0.5 and -0.5 the answer will ROUND UP. As in, they will
 * return 1.0 and 0, respectively.
 * A step of 0 will return the value unchanged.
 * A step with a negative value will be flipped to positive.
 * @param value
 * @param step
 * @returns {Number}
 */
function stepSmoother(value, step) {
  if (step === 0) {
    return value;
  }

  if (step < 0) {
    step = Math.abs(step);  // eslint-disable-line no-param-reassign
  }

  const steps = floatSmoother(value / step);
  if (steps % 1 === 0) {
    return value;
  }

  const smoothedValue = round(steps, 0) * step;

  if (Object.is(-0, smoothedValue)) { // _.round can generate a -0, this checks for that.
    return Math.abs(smoothedValue); // Switch -0 to 0
  }
  return smoothedValue;
}


/**
 * Basic function takes a Mastery score for a SubSubject in and returns the desired difficulty
 * levels (an array of ints) according to the defined difficulty ranges.
 * @param score
 * @returns {Array}
 */
function difficultyFinder(score) {
  const difficultyScores = [];
  for (let x = 0; x < QUESTION_DIFFICULTY_RANGES.length; ++x) {
    if (score >= QUESTION_DIFFICULTY_RANGES[x][0] &&
    score <= QUESTION_DIFFICULTY_RANGES[x][1]) {
      difficultyScores.push(x + 1);
    }
  }
  return difficultyScores;
}


/**
 * Very simple function returns the format used by Survey answers.
 * Ex: 1.65, and "m" returns "[1.65m]"
 * @param value
 * @param unit  Needs to be lower case.
 * @returns {string}
 */
function surveyAnswerFormatter(value, unit) {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(value)) {
    throw new SurveyAnswerValueInvalid(value);
  }
  if (UNITS[unit] === undefined) {
    throw new SurveyAnswerUnitInvalid(unit);
  }

  return `[${value}${unit}]`;
}


/**
 * Helper function formats incoming question data and puts it into the string syntax format that
 * is used in the database.
 * @param text  Written and Survey question text. Optional for Conversions.
 * @param rangeInput {{
 *                     lower: {float}
 *                     upper: {float}
 *                     unit: {string}
 *                     step: {float or null}
 *                   }}
 * @returns {string}
 */
function questionSyntaxFormatter(text = null, rangeInput = null) {
  let questionSyntax = "";
  if (text) {
    if (text.search(/[[\]]/) !== -1) {
      throw new QuestionTextSyntaxError(text, "Cannot contain square brackets");
    }
    questionSyntax += text.trim();
  }

  if (rangeInput) {
    const conversionInputErrors = [];
    if (!rangeInput.lower) conversionInputErrors.push("Lower value not defined.");
    if (!rangeInput.upper) conversionInputErrors.push("Upper value not defined.");
    if (!rangeInput.unit) conversionInputErrors.push("Unit not defined.");
    if (conversionInputErrors.length) {
      throw new QuestionConversionSyntaxError(conversionInputErrors.join(" "));
    }

    const stepSyntax = rangeInput.step ? `(${rangeInput.step})a` : "";
    const spacer = questionSyntax.length ? " " : "";
    questionSyntax +=
      `${spacer}[${rangeInput.lower},${rangeInput.upper}${rangeInput.unit}${stepSyntax}]`;
  }
  if (questionSyntax.length === 0) {
    throw new QuestionSyntaxError(questionSyntax, "It cannot be blank");
  }

  return questionSyntax;
}


/**
 * Helper function formats incoming answer data and puts it into the string syntax format that
 * is used in the database.
 * @param text
 * @param choicesInput
 * @param conversionInput
 * @returns {string}
 */
function answerSyntaxFormatter(text = null, choicesInput = null, conversionInput = null) {
  if (choicesInput && conversionInput) {
    throw new AnswerGenericError("Cannot have both multiplechoiceinput AND conversioninput defined");
  }
  if (!choicesInput && !conversionInput) {
    throw new AnswerGenericError("Must have at least multiplechoiceinput OR conversioninput defined");
  }

  let answerSyntax = "";

  if (text) {
    if (text.search(/[[\]]/) !== -1) {
      throw new AnswerTextSyntaxError(text, "Cannot contain square brackets");
    }
    answerSyntax += text.trim();
  }

  const spacer = answerSyntax.length ? " " : "";

  // The answer is multiple choice...
  if (choicesInput) {
    const choicesInputErrors = [];
    if (!choicesInput.choices || choicesInput.choices.length < 2) {
      choicesInputErrors.push("Must have at least two choices.");
    }

    // Check each multiple choice for mistakes...
    choicesInput.choices.forEach((choice) => {
      if (choice.written === undefined && choice.value === undefined) {
        choicesInputErrors.push("Must have written OR value rows defined for every multiple choice option.");
      }
      if (choice.written !== undefined && choice.value !== undefined) {
        choicesInputErrors.push("Must not have written AND value rows defined in any multiple choice options.");
      }
      if (choice.unit !== WRITTEN_ANSWER_UNIT && choice.written !== undefined) {
        choicesInputErrors.push(`Written choice '${choice.written}' must have unit '${WRITTEN_ANSWER_UNIT}'.`);
      }
      if (choice.unit !== WRITTEN_ANSWER_UNIT && !UNITS[choice.unit]) {
        choicesInputErrors.push(`Unit '${choice.unit}' is not a recognized unit.`);
      }
      if (choice.unit === WRITTEN_ANSWER_UNIT && choice.written.trim().length === 0) {
        choicesInputErrors.push("Written choices cannot be blank.");
      }
      if (choice.unit === WRITTEN_ANSWER_UNIT && choice.written.search(/\|/) !== -1) {
        choicesInputErrors.push(`Written choice ${choice.written} cannot have pipes (|) in them.`);
      }
    });
    if (choicesInputErrors.length) {
      throw new AnswerMultipleChoiceSyntaxError(choicesInputErrors.join(" "));
    }

    // eslint-disable-next-line no-confusing-arrow
    const choicesSyntax = choicesInput.choices.map(choice =>
      choice.unit === WRITTEN_ANSWER_UNIT ?
        choice.written : `${choice.value}${choice.unit}`).join("|");
    const choicesOffered = choicesInput.choicesoffered || "";

    answerSyntax += `${spacer}[${choicesSyntax}]${choicesOffered}`;
  }

  // The answer is for a Conversion or Survey.
  if (conversionInput) {
    if (!UNITS[conversionInput.unit]) {
      throw new AnswerConversionSyntaxError(`Unit '${conversionInput.unit} is not a recognized unit`);
    }
    const accuracySyntax = conversionInput.accuracy ? `(${conversionInput.accuracy})a` : "";

    answerSyntax += `${spacer}[${conversionInput.unit}${accuracySyntax}]`;
  }

  return answerSyntax;
}

module.exports = {
  minMax,
  floatSmoother,
  stepSmoother,
  difficultyFinder,
  surveyAnswerFormatter,
  questionSyntaxFormatter,
  answerSyntaxFormatter,
};
