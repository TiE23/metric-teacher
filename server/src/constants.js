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

  // Answer
  ANSWER_TYPE_MULTIPLE_CHOICE: 0,
  ANSWER_TYPE_CONVERSION: 1,

  // Data constants
  // Units to English
  UNITS: {
    // Length - Metric
    mm: {
      singular: "millimeter",
      plural: "millimeters",
    },
    cm: {
      singular: "centimeter",
      plural: "centimeters",
    },
    m: {
      singular: "meter",
      plural: "meters",
    },
    km: {
      singular: "kilometer",
      plural: "kilometers",
    },
    // Length - Imperial
    in: {
      singular: "inch",
      plural: "inches",
    },
    ft: {
      singular: "foot",
      plural: "feet",
    },
    yd: {
      singular: "yard",
      plural: "yards",
    },
    mi: {
      singular: "mile",
      plural: "miles",
    },
    // Mass - Metric
    mg: {
      singular: "milligram",
      plural: "milligrams",
    },
    g: {
      singular: "gram",
      plural: "grams",
    },
    kg: {
      singular: "kilogram",
      plural: "kilograms",
    },
    tonne: {
      singular: "tonne",
      plural: "tonnes",
    },
    // Mass - Imperial
    oz: {
      singular: "ounce",
      plural: "ounces",
    },
    lb: {
      singular: "pound",
      plural: "pounds",
    },
    ton: {
      singular: "short ton",
      plural: "short tons",
    },
    lton: {
      singular: "long ton",
      plural: "long tons",
    },
    st: {
      singular: "stone",
      plural: "stone",
    },
    // Volume - Metric
    ml: {
      singular: "milliliter",
      plural: "milliliters",
    },
    l: {
      singular: "liter",
      plural: "liters",
    },
    // Volume - Imperial
    cuin: {
      singular: "cubic inch",
      plural: "cubic inches",
    },
    floz: {
      singular: "fluid ounce",
      plural: "fluid ounces",
    },
    cup: {
      singular: "cup",
      plural: "cups",
    },
    pint: {
      singular: "pint",
      plural: "pints",
    },
    gal: {
      singular: "gallon",
      plural: "gallons",
    },
    // Temperature - Metric
    c: {
      singular: "Celsius",
      plural: "Celsius",
    },
    // Temperature - Imperial
    f: {
      singular: "Fahrenheit",
      plural: "Fahrenheit",
    },
    // Area - Metric
    sqm: {
      singular: "square meter",
      plural: "square meters",
    },
    ha: {
      singular: "hectare",
      plural: "hectares",
    },
    sqkm: {
      singular: "square kilometer",
      plural: "square kilometers",
    },
    // Area - Imperial
    sqft: {
      singular: "square foot",
      plural: "square feet",
    },
    acre: {
      singular: "acre",
      plural: "acres",
    },
    sqmi: {
      singular: "square mile",
      plural: "square miles",
    },
    // Velocity - Metric
    ms: {
      singular: "meter per second",
      plural: "meters per second",
    },
    kmph: {
      singular: "kilometer per hour",
      plural: "kilometers per hour",
    },
    // Velocity - Imperial
    fps: {
      singular: "foot per second",
      plural: "feet per second",
    },
    mph: {
      singular: "mile per hour",
      plural: "miles per hour",
    },
  },

};

module.exports = constants;
