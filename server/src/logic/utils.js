const round = require("lodash/round");

const {
  SurveyAnswerUnitInvalid,
  SurveyAnswerValueInvalid,
} = require("../errors");

const {
  CONVERSION_DECIMAL_ACCURACY,
  QUESTION_DIFFICULTY_RANGES,
  UNITS,
} = require("../constants");


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


module.exports = {
  floatSmoother,
  stepSmoother,
  difficultyFinder,
  surveyAnswerFormatter,
};
