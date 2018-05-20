const round = require("lodash/round");
const converter =
  require("linear-converter")(require("arbitrary-precision")(require("floating-adapter")));

const length = require("linear-preset-factory")(
  require("linear-presets").PRESETS.length);        // Based on meter
const mass = require("linear-preset-factory")(
  require("linear-presets").PRESETS.mass);          // Based on kilogram
const volume = require("linear-preset-factory")(
  require("linear-presets").PRESETS.volume);        // Based on cubic meter
const temperature = require("linear-preset-factory")(
  require("linear-presets").PRESETS.temperature);   // Based on Celsius
const velocity = require("linear-preset-factory")(
  require("linear-presets").PRESETS.velocity);      // Based on meters per second
const area = require("linear-preset-factory")(
  require("linear-presets").PRESETS.area);          // Based on square meter

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
  UNITS,
  BASE_UNITS,
} = require("../constants");

const { convert, invertConversion, composeConversions } = converter;

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
 * @returns { exactValue, roundedValue }
 */
function convertValue(fromValue, fromUnit, toUnit) {
  if (fromUnit === toUnit) {
    return {
      exactValue: fromValue,
      roundedValue: fromValue,
    };
  }

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
  } else {  // eslint-disable-line no-else-return
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
  if ((roundedValue === 0 && smoothedValue !== 0) || roundedValue > Math.ceil(smoothedValue)) {
    let rounding = toUnitDetail.round;
    do {
      rounding += 1;
      roundedValue = round(smoothedValue, rounding);
    } while (rounding <= 10 && (roundedValue === 0 || roundedValue > Math.ceil(smoothedValue)));
  }

  return {
    exactValue: smoothedValue,
    roundedValue,
  };
}


module.exports = {
  convertValue,
};
