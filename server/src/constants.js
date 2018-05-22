const constants = {

  // Database Constants
  // Generic
  FLAGS_NONE: 0,

  // User
  USER_TYPE_STUDENT: 0,
  USER_TYPE_TEACHER: 1,
  USER_TYPE_MODERATOR: 2,
  USER_TYPE_ADMIN: 3,

  USER_STATUS_NORMAL: 0,
  USER_STATUS_CLOSED: 1,

  // Classroom
  CLASSROOM_STATUS_ACTIVE: 0,
  CLASSROOM_STATUS_INACTIVE: 1,

  // Course
  COURSE_STATUS_ACTIVE: 0,
  COURSE_STATUS_INACTIVE: 1,

  // Mastery
  MASTERY_DEFAULT_SCORE: 0,
  MASTERY_STATUS_ACTIVE: 0,
  MASTERY_STATUS_INACTIVE: 1,

  // Question
  QUESTION_TYPE_WRITTEN: 0,
  QUESTION_TYPE_CONVERSION: 1,
  QUESTION_TYPE_SURVEY: 2,
  QUESTION_STATUS_ACTIVE: 0,
  QUESTION_STATUS_INACTIVE: 1,
  QUESTION_DIFFICULTY_EASY: 1,
  QUESTION_DIFFICULTY_EASY_MEDIUM: 2,
  QUESTION_DIFFICULTY_MEDIUM: 3,
  QUESTION_DIFFICULTY_MEDIUM_HARD: 4,
  QUESTION_DIFFICULTY_HARD: 5,

  // Answer (logic only)
  ANSWER_TYPE_MULTIPLE_CHOICE: 0,
  ANSWER_TYPE_CONVERSION: 1,
  ANSWER_TYPE_SURVEY: 2,

  // Data constants
  // Conversion multiple choice multipliers.
  CONVERSION_CHOICE_OPTIONS_MULTIPLIERS: [0, -1, 1, -2, 2, -3, 3, -4, 4],

  // Decimal Accuracy
  CONVERSION_DECIMAL_ACCURACY: 10,

  // Units to English
  // Preset is the name of the unit in https://github.com/javiercejudo/linear-presets
  // Round is the decimal places the unit will be rounded to in any returned value.
  // 0 = 10, 1 = 10.5, 2 = 10.54, 3 = 10.543, 4 = 10.5432, 5 = 10.54321
  // These round values are arbitrary and are decided by me. Comments are added for rationale.
  // I decided rounded on a combination of "Will this represent a common conversion accurately?",
  // "Would anyone find a more accurate value useful?", and "Do we commonly see these decimals in
  // internal conversions?"
  // Conversion example: cm has 2, in has 3. Because 1 in = 2.54 cm, but 1 cm = 0.394 in.
  // Usefulness example: mg is -2 because anything smaller than 100mg is inconsequential in
  // daily life. kg is 2 because no one is concerned if their weight is 74.255 kg and not 74.26 kg
  // Internal example: lb is 3 because 1 oz = 0.125 lb
  UNITS: {
    // Length - Metric
    mm: {
      family: "metric",
      subject: "length",
      singular: "millimeter",
      plural: "millimeters",
      preset: "millimetre",
      round: 1,
    },
    cm: {
      family: "metric",
      subject: "length",
      singular: "centimeter",
      plural: "centimeters",
      preset: "centimetre",
      round: 2, // 1 in = 2.54 cm
    },
    m: {
      family: "metric",
      subject: "length",
      singular: "meter",
      plural: "meters",
      preset: "metre",
      round: 2, // Accurate to 1 cm
    },
    km: {
      family: "metric",
      subject: "length",
      singular: "kilometer",
      plural: "kilometers",
      preset: "kilometre",
      round: 3, // Accurate to 1 m
    },
    // Length - Imperial
    in: {
      family: "imperial",
      subject: "length",
      singular: "inch",
      plural: "inches",
      preset: "inch",
      round: 3, // 1 cm = 0.394 in, 1 mm = 0.039 in
    },
    ft: {
      family: "imperial",
      subject: "length",
      singular: "foot",
      plural: "feet",
      preset: "foot",
      round: 2, // 30 cm = 0.98 ft, 1 m = 3.28 ft
    },
    yd: {
      family: "imperial",
      subject: "length",
      singular: "yard",
      plural: "yards",
      preset: "yard",
      round: 2, // 1 m = 1.09 yd
    },
    mi: {
      family: "imperial",
      subject: "length",
      singular: "mile",
      plural: "miles",
      preset: "mile",
      round: 2, // 1 km = 0.62 mi, 100 m = 0.062 mi
    },
    nmi: {
      family: "imperial",
      subject: "length",
      singular: "nautical mile",
      plural: "nautical miles",
      preset: "nauticalMile",
      round: 2,
    },
    // Mass - Metric
    mg: {
      family: "metric",
      subject: "mass",
      singular: "milligram",
      plural: "milligrams",
      preset: "milligram",
      round: -2, // 0.1 oz = 2834.95 mg - this will round it to 2800 mg - 100's of mg
    },
    g: {
      family: "metric",
      subject: "mass",
      singular: "gram",
      plural: "grams",
      preset: "gram",
      round: 1, // 0.1 oz = 2.8 g, accurate to 100 mg
    },
    kg: {
      family: "metric",
      subject: "mass",
      singular: "kilogram",
      plural: "kilograms",
      preset: "kilogram",
      round: 2, // Accurate to 10 g
    },
    tonne: {
      family: "metric",
      subject: "mass",
      singular: "tonne",
      plural: "tonnes",
      preset: "metricTon",
      round: 3, // Accurate to 1 kg
    },
    // Mass - Imperial
    oz: {
      family: "imperial",
      subject: "mass",
      singular: "ounce",
      plural: "ounces",
      preset: "ounce",
      round: 3, // 1 g = 0.035 oz
    },
    lb: {
      family: "imperial",
      subject: "mass",
      singular: "pound",
      plural: "pounds",
      preset: "pound",
      round: 3, // 125 g = 0.276 lb, 1 oz = 0.125 lb
    },
    ton: {
      family: "imperial",
      subject: "mass",
      singular: "short ton",
      plural: "short tons",
      preset: "shortTon",
      round: 3, // Accurate to 2 lb
    },
    lton: {
      family: "imperial",
      subject: "mass",
      singular: "long ton",
      plural: "long tons",
      preset: "longTon",
      round: 3, // Accurate to 2.24 lb
    },
    st: {
      family: "imperial",
      subject: "mass",
      singular: "stone",
      plural: "stone",
      preset: "stone",
      round: 2, // Accurate to 2.24 oz or 0.14 lb, 1 lb = 0.07 st
    },
    // Volume - Metric
    ml: {
      family: "metric",
      subject: "volume",
      singular: "milliliter",
      plural: "milliliters",
      preset: "millilitre",
      round: 0, // 1 oz = 29.6 ml, 0.1 ml are for scientists and doctors
    },
    l: {
      family: "metric",
      subject: "volume",
      singular: "liter",
      plural: "liters",
      preset: "litre",
      round: 3, // Accurate to 1 ml
    },
    cum: {
      family: "metric",
      subject: "volume",
      singular: "cubic meter",
      plural: "cubic meters",
      preset: "cubicMetre",
      round: 3, // Accurate to 1 l
    },
    // Volume - Imperial (Well, US...)
    // No teaspoons (5 ml) or tablespoons (15 ml)
    cuin: {
      family: "imperial",
      subject: "volume",
      singular: "cubic inch",
      plural: "cubic inches",
      preset: "cubicInch",
      round: 2, // 1 ml = 0.06 cuin
    },
    floz: { // US fluid ounce
      family: "imperial",
      subject: "volume",
      singular: "fluid ounce",
      plural: "fluid ounces",
      preset: "USFluidOunce",
      round: 2, // 1 ml = 0.03 floz
    },
    cup: {  // US Customary Cup
      family: "imperial",
      subject: "volume",
      singular: "cup",
      plural: "cups",
      preset: "USCup",
      round: 3, // 1 floz = 0.125 cup
    },
    pt: { // US Customary Pint
      family: "imperial",
      subject: "volume",
      singular: "pint",
      plural: "pints",
      preset: "USPint",
      round: 2, // 1 floz = 0.06 pt, 1 l = 2.11 pt
    },
    qt: { // US Customary quart
      family: "imperial",
      subject: "volume",
      singular: "quart",
      plural: "quarts",
      preset: "USQuart",
      round: 2, // 1 floz = 0.03 qt, 1 l = 1.06 qt
    },
    gal: {  // US Customary Gallon
      family: "imperial",
      subject: "volume",
      singular: "gallon",
      plural: "gallons",
      preset: "USGallon",
      round: 2, // 1 l = 0.26 gal, 1 oz = 0.01 gal
    },
    // Temperature - Metric
    c: {
      family: "metric",
      subject: "temperature",
      singular: "Celsius",
      plural: "Celsius",
      preset: "celsius",
      round: 1, // Tenth of a degree is plenty accurate
    },
    // Temperature - Imperial
    f: {
      family: "imperial",
      subject: "temperature",
      singular: "Fahrenheit",
      plural: "Fahrenheit",
      preset: "fahrenheit",
      round: 1, // Tenth of a degree is plenty accurate
    },
    // Area - Metric
    // No square centimeters since the it's rarely used in daily life. Also, no preset for it!
    sqm: {
      family: "metric",
      subject: "area",
      singular: "square meter",
      plural: "square meters",
      preset: "squareMetre",
      round: 2, // 1 sqft = 0.09 sqm
    },
    ha: {
      family: "metric",
      subject: "area",
      singular: "hectare",
      plural: "hectares",
      preset: "hectare",
      round: 3, // Accurate to 10 sqm
    },
    sqkm: {
      family: "metric",
      subject: "area",
      singular: "square kilometer",
      plural: "square kilometers",
      preset: "squareKilometre",
      round: 2, // Accurate to 10,000 sqm or 1 ha, 1 sqmi = 2.59 sqkm
    },
    // Area - Imperial
    sqft: {
      family: "imperial",
      subject: "area",
      singular: "square foot",
      plural: "square feet",
      preset: "squareFoot",
      round: 2, // 1 sqm = 10.76 sqft
    },
    acre: {
      family: "imperial",
      subject: "area",
      singular: "acre",
      plural: "acres",
      preset: "acre",
      round: 2, // 1000 sqm = 0.25 acre, 10,000 sqft = 0.23 acre
    },
    sqmi: {
      family: "imperial",
      subject: "area",
      singular: "square mile",
      plural: "square miles",
      preset: "squareMile",
      round: 2, // Accurate to 10 acres (0.02 sqmi), 1 sqkm = 0.39 sqmi
    },
    // Velocity - Metric
    ms: {
      family: "metric",
      subject: "velocity",
      singular: "meter per second",
      plural: "meters per second",
      preset: "metresSecond",
      round: 2, // 1 mph = 0.45 ms, 1 fps = 0.30 ms
    },
    kmph: {
      family: "metric",
      subject: "velocity",
      singular: "kilometer per hour",
      plural: "kilometers per hour",
      preset: "kilometresHour",
      round: 1, // 10 mph = 16.1 kmph. Daily use wouldn't need any more detail.
    },
    // Velocity - Imperial
    fps: {
      family: "imperial",
      subject: "velocity",
      singular: "foot per second",
      plural: "feet per second",
      preset: "feetSecond",
      round: 2, // 1 kmph = 0.91 fps, 1 ms = 3.28 fps
    },
    mph: {
      family: "imperial",
      subject: "velocity",
      singular: "mile per hour",
      plural: "miles per hour",
      preset: "milesHour",
      round: 1, // 10 kmph = 6.2 mph. Daily use wouldn't need any more detail.
    },
    kn: {
      family: "imperial",
      subject: "velocity",
      singular: "knot",
      plural: "knots",
      preset: "knot",
      round: 1, // 10 kmph = 5.4 kn, 10 mph = 8.7 kn. Daily use wouldn't need any more detail.
    },
  },

  // Base unit organization for https://github.com/javiercejudo/linear-presets
  BASE_UNITS: {
    length: "metre",
    mass: "kilogram",
    volume: "cubicMetre",
    temperature: "celsius",
    area: "squareMetre",
    velocity: "metresSecond",
  },

};

module.exports = constants;
