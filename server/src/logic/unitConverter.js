const round = require("lodash/round");
const converter =
  require("linear-converter")(require("arbitrary-precision")(require("floating-adapter")));

const {
  convert,
  invertConversion,
  composeConversions,
} = converter;

const length = require("linear-preset-factory")(require("linear-presets").PRESETS.length);
const mass = require("linear-preset-factory")(require("linear-presets").PRESETS.mass);
const volume = require("linear-preset-factory")(require("linear-presets").PRESETS.volume);
const temperature = require("linear-preset-factory")(require("linear-presets").PRESETS.temperature);
const velocity = require("linear-preset-factory")(require("linear-presets").PRESETS.velocity);
const area = require("linear-preset-factory")(require("linear-presets").PRESETS.area);

const presets = {
  length,
  mass,
  volume,
  temperature,
  velocity,
  area,
};

const {
  floatSmoother,
} = require("./utils");

const {
  UnitTypeUnrecognized,
  ConversionIncompatible,
  ConversionNegativeValue,
} = require("../errors");

const {
  FRIENDLY_DIGIT_COUNT,
  UNITS,
  BASE_UNITS,
} = require("../constants");


/**
 * Convert a value of one unit to another. Returns an exact value and a rounded value, the rounding
 * of which is determined by round value in UNITS constant.
 * Note: If data loss is detected, as in, if the rounded value is so small that it'll be rounded to
 * zero, it will instead return the exact value. If a value is inflated over a whole number when
 * rounding, it will instead return the exact value.
 * Ex 1: 1 square meter is 0.0001 hectares. Hectares are rounded to 3 decimals, which would round
 * the conversion to 0 hectares. 1 square meter is NOT 0 hectares, so it will return 0.0001.
 * Ex 2: 0.099 grams is 99 milligrams. Milligrams is rounded to -2 decimals (100s of milligrams),
 * which would round the conversion to 100 milligrams. 0.099 grams is NOT 100 milligrams, so it will
 * return 99 milligrams. This is separate from rounding 99 milligrams to grams. You will get the
 * rounded value of 0.1 grams, NOT 0.099 grams
 * @param fromValue
 * @param fromUnit
 * @param toUnit
 * @returns { exactValue, roundedValue, roundingLevel, friendlyValue }
 */
function convertValue(fromValue, fromUnit, toUnit) {
  // Grab unit details
  const fromUnitDetail = UNITS[fromUnit];
  const toUnitDetail = UNITS[toUnit];

  // Check for errors.
  if (fromUnitDetail === undefined) {
    throw new UnitTypeUnrecognized(fromUnit);
  }
  if (toUnitDetail === undefined) {
    throw new UnitTypeUnrecognized(toUnit);
  }
  if (fromUnitDetail.subject !== toUnitDetail.subject) {
    throw new ConversionIncompatible(
      fromUnitDetail.subject, fromUnitDetail.singular,
      toUnitDetail.subject, toUnitDetail.singular,
    );
  }
  if (fromValue < 0 && fromUnitDetail.subject !== "temperature") {
    throw new ConversionNegativeValue(fromValue, fromUnitDetail.plural);
  }

  // If the units are the same there is no need to convert.
  if (fromUnit === toUnit) {
    // For consistency we need to find the rounding level. This is quite annoying to discover.
    // If the number is whole, just return the unit's configured rounding level.
    // If the number is not whole, go to string and split on "." and count digits after the decimal.
    // But if the number is so small that toString() returns scientific notation we split on "e".
    let roundingLevel = null;
    if (Math.floor(fromValue) === fromValue) {        // Whole number
      roundingLevel = fromUnitDetail.round;
    } else {
      const stringValue = fromValue.toString();
      const decimalNotation = stringValue.split("."); // 0.00001234 = 8
      if (decimalNotation.length > 1) {
        roundingLevel = decimalNotation[1].length;
      } else {                                        // 1e-10 = 10
        const scientificNotation = stringValue.split("e");
        if (scientificNotation.length > 1) {
          roundingLevel = Math.abs(Number.parseInt(scientificNotation[1], 10));
        } else {                                      // No idea.
          roundingLevel = 0;
        }
      }
    }

    return {
      exactValue: fromValue,
      roundedValue: fromValue,
      roundingLevel,
      friendlyValue: fromValue,
    };
  }

  // Get the subject of the conversion and the base unit used in the conversions
  const { subject } = fromUnitDetail;
  const baseUnit = BASE_UNITS[subject];
  let exactValue = 0;

  // Converting base unit to not base unit (ex: meters to feet)
  if (fromUnitDetail.preset === baseUnit) {
    exactValue = convert(
      presets[subject][`${fromUnitDetail.preset}_${toUnitDetail.preset}`],
      fromValue,
    ).valueOf();

    // Converting not base unit to base unit (ex: feet to meters)
  } else if (toUnitDetail.preset === baseUnit) {
    exactValue = convert(
      invertConversion(presets[subject][`${toUnitDetail.preset}_${fromUnitDetail.preset}`]),
      fromValue,
    ).valueOf();

    // Converting not base unit to not base unit (ex: inches (to meters) to feet)
  } else {
    exactValue = convert(
      composeConversions(
        invertConversion(presets[subject][`${baseUnit}_${fromUnitDetail.preset}`]),
        presets[subject][`${baseUnit}_${toUnitDetail.preset}`],
      ),
      fromValue,
    ).valueOf();
  }

  // Gently smooth-over messy floats
  const smoothedValue = floatSmoother(exactValue);

  // Perform unit rounding
  let roundedValue = round(smoothedValue, toUnitDetail.round);

  // Methodically reduce rounding aggressiveness until a non-zero value is returned OR
  // a non-inflated value is returned. But give up after 10 decimal places have been tried.
  // There is a special edge-case where converting -17.78 Celsius to Fahrenheit this whole system
  // refuses to return 0, instead 0.004 because when round() rounds it to zero, it will decide
  // this is wrong. In the case where toUnit is Fahrenheit, allow to round to zero. This is the ONLY
  // unit where this is allowed. 0 C is easy to get with 32 F, so exact and rounding would be zero.
  // Note: Would need this same exception for Kelvin and Rankine.
  let rounding = toUnitDetail.round;
  if (((roundedValue === 0 && toUnit !== "f") && smoothedValue !== 0) ||
    roundedValue > Math.ceil(smoothedValue)
  ) {
    do {
      ++rounding;
      roundedValue = round(smoothedValue, rounding);
    } while (rounding <= 10 && (roundedValue === 0 || roundedValue > Math.ceil(smoothedValue)));
  }

  // Edge case where rounding generates a -0 value.
  if (roundedValue === 0) {
    roundedValue = Math.abs(roundedValue);
  }

  // Create the human friendly value
  let friendlyValue = 0;
  let power = 0;
  for (; power <= 308; ++power) {  // Limit to approximately Number.MAX_VALUE (1.798e+308)
    if (Math.abs(roundedValue) < 10 ** power) {
      break;
    }
  }

  if (FRIENDLY_DIGIT_COUNT - power >= 0) {
    // Do not friendly round any value less than number of digits.
    friendlyValue = roundedValue;
  } else {
    // Because rounding acts differently with negative values, just use Math.abs().
    friendlyValue = round(Math.abs(roundedValue), FRIENDLY_DIGIT_COUNT - power);
    if (roundedValue < 0) {
      friendlyValue *= -1;  // Flip back to negative if rounded is negative.
    }
  }

  return {
    exactValue: smoothedValue,
    roundedValue,
    roundingLevel: rounding,
    friendlyValue,
  };
}


module.exports = {
  convertValue,
};
