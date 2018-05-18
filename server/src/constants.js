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

  // Data constants
  // Units to English
  UNITS: {
    // Length - Metric
    mm: {
      family: "metric",
      subject: "length",
      singular: "millimeter",
      plural: "millimeters",
    },
    cm: {
      family: "metric",
      subject: "length",
      singular: "centimeter",
      plural: "centimeters",
    },
    m: {
      family: "metric",
      subject: "length",
      singular: "meter",
      plural: "meters",
    },
    km: {
      family: "metric",
      subject: "length",
      singular: "kilometer",
      plural: "kilometers",
    },
    // Length - Imperial
    in: {
      family: "imperial",
      subject: "length",
      singular: "inch",
      plural: "inches",
    },
    ft: {
      family: "imperial",
      subject: "length",
      singular: "foot",
      plural: "feet",
    },
    yd: {
      family: "imperial",
      subject: "length",
      singular: "yard",
      plural: "yards",
    },
    mi: {
      family: "imperial",
      subject: "length",
      singular: "mile",
      plural: "miles",
    },
    // Mass - Metric
    mg: {
      family: "metric",
      subject: "mass",
      singular: "milligram",
      plural: "milligrams",
    },
    g: {
      family: "metric",
      subject: "mass",
      singular: "gram",
      plural: "grams",
    },
    kg: {
      family: "metric",
      subject: "mass",
      singular: "kilogram",
      plural: "kilograms",
    },
    tonne: {
      family: "metric",
      subject: "mass",
      singular: "tonne",
      plural: "tonnes",
    },
    // Mass - Imperial
    oz: {
      family: "imperial",
      subject: "mass",
      singular: "ounce",
      plural: "ounces",
    },
    lb: {
      family: "imperial",
      subject: "mass",
      singular: "pound",
      plural: "pounds",
    },
    ton: {
      family: "imperial",
      subject: "mass",
      singular: "short ton",
      plural: "short tons",
    },
    lton: {
      family: "imperial",
      subject: "mass",
      singular: "long ton",
      plural: "long tons",
    },
    st: {
      family: "imperial",
      subject: "mass",
      singular: "stone",
      plural: "stone",
    },
    // Volume - Metric
    ml: {
      family: "metric",
      subject: "volume",
      singular: "milliliter",
      plural: "milliliters",
    },
    l: {
      family: "metric",
      subject: "volume",
      singular: "liter",
      plural: "liters",
    },
    // Volume - Imperial
    cuin: {
      family: "imperial",
      subject: "volume",
      singular: "cubic inch",
      plural: "cubic inches",
    },
    floz: {
      family: "imperial",
      subject: "volume",
      singular: "fluid ounce",
      plural: "fluid ounces",
    },
    cup: {
      family: "imperial",
      subject: "volume",
      singular: "cup",
      plural: "cups",
    },
    pint: {
      family: "imperial",
      subject: "volume",
      singular: "pint",
      plural: "pints",
    },
    gal: {
      family: "imperial",
      subject: "volume",
      singular: "gallon",
      plural: "gallons",
    },
    // Temperature - Metric
    c: {
      family: "metric",
      subject: "temperature",
      singular: "Celsius",
      plural: "Celsius",
    },
    // Temperature - Imperial
    f: {
      family: "imperial",
      subject: "temperature",
      singular: "Fahrenheit",
      plural: "Fahrenheit",
    },
    // Area - Metric
    sqm: {
      family: "metric",
      subject: "area",
      singular: "square meter",
      plural: "square meters",
    },
    ha: {
      family: "metric",
      subject: "area",
      singular: "hectare",
      plural: "hectares",
    },
    sqkm: {
      family: "metric",
      subject: "area",
      singular: "square kilometer",
      plural: "square kilometers",
    },
    // Area - Imperial
    sqft: {
      family: "imperial",
      subject: "area",
      singular: "square foot",
      plural: "square feet",
    },
    acre: {
      family: "imperial",
      subject: "area",
      singular: "acre",
      plural: "acres",
    },
    sqmi: {
      family: "imperial",
      subject: "area",
      singular: "square mile",
      plural: "square miles",
    },
    // Velocity - Metric
    ms: {
      family: "metric",
      subject: "velocity",
      singular: "meter per second",
      plural: "meters per second",
    },
    kmph: {
      family: "metric",
      subject: "velocity",
      singular: "kilometer per hour",
      plural: "kilometers per hour",
    },
    // Velocity - Imperial
    fps: {
      family: "imperial",
      subject: "velocity",
      singular: "foot per second",
      plural: "feet per second",
    },
    mph: {
      family: "imperial",
      subject: "velocity",
      singular: "mile per hour",
      plural: "miles per hour",
    },
  },

};

module.exports = constants;
