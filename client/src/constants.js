import round from "lodash/round";
import random from "lodash/random";

// Standard names
export const AUTH_TOKEN = "auth-token";
export const CHALLENGE_STATE = "challenge-state";

// Styling
export const SITE_NAME = "Metric-Teacher";
export const PAGE_TITLE_HEADER_SIZE = "huge";
export const PAGE_ICON_COLOR_HOME = "olive";
export const PAGE_ICON_COLOR_LOGIN = "blue";
export const PAGE_ICON_COLOR_CHALLENGE = "yellow";
export const PAGE_ICON_COLOR_SUBJECTS = "orange";
export const PAGE_ICON_COLOR_DOCUMENTATION = "purple";
export const PAGE_ICON_COLOR_PROFILE = "blue";
export const PAGE_ICON_COLOR_CREDITS = "teal";
export const PAGE_ICON_COLOR_ADMIN = "grey";
export const RANDOM_HOME_MASCOT_IMAGE = [
  "/img/challenge/r-correct-a.gif",
  "/img/challenge/r-correct-b.gif",
  "/img/challenge/r-correct-c.gif",
][random(2)];
export const RANDOM_HOME_MASCOT_QUOTE = [
  "Let's learn!",
  "What will you master today?",
  "Challenge yourself!",
][random(2)];
export const MASCOT_NAME_SHORT = "Meti";
export const MASCOT_NAME_LONG = "Meti the Metric Macaw";

// Responsive Sizing
export const FLOATING_CENTER_GRID_COLUMN_WIDTH_MEDIUM = { mobile: 16, tablet: 8, computer: 8 };
export const FLOATING_CENTER_GRID_COLUMN_WIDTH_LARGE = { mobile: 16, tablet: 12, computer: 10 };
export const FLOATING_CENTER_GRID_COLUMN_WIDTH_WIDE = { mobile: 16, tablet: 14, computer: 14 };
export const FLOATING_CENTER_GRID_COLUMN_WIDTH_FULL = { mobile: 16, tablet: 16, computer: 16 };
export const CHALLENGE_DETAILS_GRID_COLUMN_LEFT = { mobile: 5, tablet: 4, computer: 3 };
export const CHALLENGE_DETAILS_GRID_COLUMN_RIGHT = { mobile: 11, tablet: 12, computer: 13 };
export const CHALLENGE_KEYPAD_COLUMN_WIDTH = { mobile: 12, tablet: 6, computer: 5 };
export const CHALLENGE_DISPLAY_SINGLE_INPUT_COLUMN_WIDTH = { mobile: 8, tablet: 4, computer: 3 };
export const CHALLENGE_DISPLAY_SINGLE_DELETE_COLUMN_WIDTH = { mobile: 4, tablet: 2, computer: 1 };
export const CHALLENGE_DISPLAY_SPLIT_INPUT_COLUMN_WIDTH = { mobile: 13, tablet: 10, computer: 7 };
export const CHALLENGE_DISPLAY_SPLIT_DELETE_COLUMN_WIDTH = { mobile: 2, tablet: 1, computer: 1 };
export const CHALLENGE_MEDIA_MIN_WIDTH = 575;

// Documentation Settings
export const DOCUMENTATION_HEADER_OFFSET = -90;

// Challenge Settings
export const CHALLENGE_KICKOFF_IGNORE_DIFFICULTY_DEFAULT = false;
export const CHALLENGE_CLEAR_INCORRECT_ANSWERS_ON_CORRECT = true;
export const CHALLENGE_REPEATS_WRITTEN_CHOICES = true;
export const CHALLENGE_REPEATS_CONVERSION_MODE = false;
export const CHALLENGE_REPEATS_CONVERSION_CHOICES = false;
export const CHALLENGE_REPEATS_CONVERSION_RANGE = false;
export const CHALLENGE_KICKOFF_LENGTH_DEFAULT = 8;
export const CHALLENGE_KICKOFF_LENGTH_OPTIONS = [
  {
    key: 1,
    value: Math.ceil(CHALLENGE_KICKOFF_LENGTH_DEFAULT / 2),
    text: "Short Length",
  },
  {
    key: 2,
    value: CHALLENGE_KICKOFF_LENGTH_DEFAULT,
    text: "Regular Length",
  },
  {
    key: 3,
    value: Math.floor(CHALLENGE_KICKOFF_LENGTH_DEFAULT * 1.5),
    text: "Long Length",
  },
  {
    key: 4,
    value: CHALLENGE_KICKOFF_LENGTH_DEFAULT * 2,
    text: "Extra Long Length",
  },
];

export const CHALLENGE_COMPLETE_SMALL_SCORE_COUNT_MINIMUM = 5;

export const CHALLENGE_CHOICES_MULTIPLE_GENERATED_LIBRARIES = [
  // true = even, false = odd
  // Close <------------> Distant
  // 1/2   3/4   5/6   7/8
  [true, true, true, true],     // Correct answer is lowest.
  [false, true, true, true],    // Correct answer is second lowest.
  [false, false, true, true],   // Correct answer is in the middle.
  [false, false, false, true],  // Correct answer is second highest.
  [false, false, false, false], // Correct answer is highest.
];

export const CHALLENGE_KEYPAD_NEGATIVE = "(-)";
export const CHALLENGE_KEYPAD_LAYOUT = [
  ["7", "8", "9"],
  ["4", "5", "6"],
  ["1", "2", "3"],
  ["0", ".", CHALLENGE_KEYPAD_NEGATIVE],
];

export const CHALLENGE_ALMOST_EXACT_FRACTION = 200;
export const CHALLENGE_ALMOST_EXACT_CLOSE = 0.1;

export const CHALLENGE_TRANSITION_PROPS = {
  animation: "fly left",
  duration: { show: 500, hide: 0 },
};

export const CHALLENGE_DIMMER_TIME_NO_EXTRA = 1000;
export const CHALLENGE_DIMMER_TIME_EXTRA = 5000;
export const CHALLENGE_DIMMER_TRANSITION_PROPS = {
  animation: "drop",
  duration: 500,
};

export const CHALLENGE_IMAGES_MODE = [
  "challenge/m-written.gif",
  "challenge/m-conversion.gif",
  "challenge/m-survey.gif",
];

export const CHALLENGE_STREAK_HOT = 10;
export const CHALLENGE_STREAK_WARM = 5;
export const CHALLENGE_STREAK_COOL = -2;
export const CHALLENGE_STREAK_COLD = -3;

export const CHALLENGE_IMAGES_DIMMER_SURVEY_FILLED = "challenge/r-surveyfilled.gif";
export const CHALLENGE_IMAGES_DIMMER_SKIPPED = "challenge/r-skipped.gif";
export const CHALLENGE_IMAGES_DIMMER_CORRECT_STREAK = (streak) => {
  if (streak > CHALLENGE_STREAK_HOT) {
    return [
      "challenge/r-correct-a1.gif",
      "challenge/r-correct-b1.gif",
    ][random(1)];
  } else if (streak === CHALLENGE_STREAK_HOT) {
    return "challenge/r-correct-d.gif";
  } else if (streak === CHALLENGE_STREAK_WARM) {
    return "challenge/r-correct-c.gif";
  } else {
    return [
      "challenge/r-correct-a.gif",
      "challenge/r-correct-b.gif",
    ][random(1)];
  }
};

export const CHALLENGE_IMAGES_DIMMER_INCORRECT_STREAK = (streak) => {
  if (streak <= CHALLENGE_STREAK_COLD) {
    return "challenge/r-incorrect-c.gif";
  } else if (streak <= CHALLENGE_STREAK_COOL) {
    return "challenge/r-incorrect-b.gif";
  } else {
    return "challenge/r-incorrect-a.gif";
  }
};

export const CHALLENGE_RESPONSE_MULTIPLE_WRITTEN = 0;
export const CHALLENGE_RESPONSE_MULTIPLE_GENERATED = 1;
export const CHALLENGE_RESPONSE_INPUT_DIRECT = 2;
export const CHALLENGE_RESPONSE_INPUT_SLIDER = 3;
export const CHALLENGE_RESPONSE_INPUT_SLIDER_SURVEY_FILLER = 4;

export const CHALLENGE_RESULTS_MASTERY_SCORE = 0;
export const CHALLENGE_RESULTS_SURVEY_SCORE = 1;
export const CHALLENGE_RESULTS_SURVEY_FILLED = 2;
export const CHALLENGE_RESULTS_SURVEY_FILL_SKIPPED = 3;

export const CHALLENGE_RESOLUTION_SKIP = 0;
export const CHALLENGE_RESOLUTION_CORRECT = 1;
export const CHALLENGE_RESOLUTION_INCORRECT = 2;
export const CHALLENGE_RESOLUTION_SURVEY_FILLED = 3;
export const CHALLENGE_RESOLUTION_SURVEY_ANSWER_LATER = 4;

export const CHALLENGE_RANGE_STEPS = 20;

export const CHALLENGE_SCORES = {
  // Correct answers.
  // Fully mastered = 1000 points. Repeated correct answers should decrease score.
  correct: {
    mastery: [
      // Difficulties 0, 1, 2, 3, 4, 5.
      [0, 10, 10, 12, 15, 30],  // Written
      [0, 10, 10, 12, 15, 30],  // Conversion
      [0, 10, 10, 12, 15, 30],  // Survey
    ],

    // Difficulties 0, 1, 2, 3, 4, 5.
    survey: [0, 125, 100, 90, 75, 60],
  },

  // Incorrect answers.
  // Each incorrect answer stacks. So that one wrong damages your gains, two takes slightly,
  // and three takes a lot.
  incorrect: {
    mastery: [
      // Difficulties 0, 1, 2, 3, 4, 5.
      [0, -4, -6, -8, -10, -20],  // Written
      [0, -4, -6, -8, -10, -20],  // Conversion
      [0, -4, -6, -8, -10, -20],  // Survey
    ],

    // Difficulties 0, 1, 2, 3, 4, 5.
    survey: [0, -80, -65, -60, -50, -40],
  },

  // Question was skipped.
  // These punishments are only applied when skipping the question at first appearance.
  // Easy questions can be skipped with little punishment. Difficult questions will be punished
  // more severely.
  skipped: {
    mastery: [
      // Difficulties 0, 1, 2, 3, 4, 5.
      [0, 0, -1, -3, -8, -12, -30], // Written
      [0, 0, -1, -3, -8, -12, -30], // Conversion
      [0, 0, -1, -3, -8, -12, -30], // Survey
    ],

    // Difficulties 0, 1, 2, 3, 4, 5.
    survey: [0, 0, -20, -80, -75, -60],
  },
};

export const CHALLENGE_MAX_STRIKES = [
  // 3 = "3 strikes you're out."
  // Difficulties 0, 1, 2, 3, 4, 5.
  [1, 3, 3, 2, 2, 2], // Written
  [1, 5, 3, 3, 3, 2], // Conversion
  [1, 4, 3, 3, 2, 2], // Survey
];

export const CHALLENGE_QUESTION_REPEAT = [
  // This is a config to determine how many times a question might be asked again even after a
  // correct answer. Minimum is 1.
  [1, 2, 2, 1, 1, 1], // Written
  [1, 3, 2, 2, 2, 1], // Conversion
  [1, 3, 2, 2, 2, 1], // Survey
];

// Password
export const PASSWORD_MINIMUM_LENGTH = 6;
export const PASSWORD_MAXIMUM_LENGTH = 128;
export const BAD_PASSWORDS = [
  "password",
  "letmein",
  "asdasd",
  "abcdef",
  "qweqwe",
  "qwerty",
  "abc123",
  "123456",
  "1234567",
  "12345678",
];

// Email
// export const EMAIL_MAXIMUM_LENGTH = 76; // No need as validator/lib/isEmail enforces this limit.
export const EMAIL_NORMALIZE_OPTIONS = {
  all_lowercase: true,
  gmail_lowercase: true,
  gmail_remove_dots: false,
  gmail_remove_subaddress: true,
  gmail_convert_googlemaildotcom: false,
  outlookdotcom_lowercase: true,
  outlookdotcom_remove_subaddress: true,
  yahoo_lowercase: true,
  yahoo_remove_subaddress: true,
  icloud_lowercase: true,
  icloud_remove_subaddress: true,
};
export const EMAIL_SECRET_PREFIXES = [
  "594613e2c5679b0d25e8912b0523b5a9",
  "806158031bb277505a058d0e4e07cff9",
];

// User Information
export const NAME_FIRST_MAXIMUM_LENGTH = 32;
export const NAME_LAST_MAXIMUM_LENGTH = 32;
export const NAME_HONORIFIC_MAXIMUM_LENGTH = 32;

// Question Input
export const QUESTION_TEXT_MAXIMUM_LENGTH = 300;
export const QUESTION_ANSWER_DETAIL_MAXIMUM_LENGTH = 300;
export const QUESTION_ANSWER_CHOICE_MAXIMUM_LENGTH = 64;

// Survey Input
export const SURVEY_DETAIL_MAXIMUM_LENGTH = 128;

// Feedback Input
export const FEEDBACK_MAXIMUM_LENGTH = 500;

// Interface
// Max multiple choice options we can show (including correct answer).
export const MAX_CHOICES = 6;
// Max multiple choice options that can be defined (including correct answer).
export const MAX_CHOICES_DEFINED = 10;

// These are based off DB data so they are subject to change.
export const SUBJECT_ICONS = {
  Length: "arrows alternate horizontal",
  Mass: "balance scale",
  Volume: "cube",
  Temperature: "thermometer three quarters",
  Velocity: "location arrow",
  Area: "clone outline",
};

export const SUBJECT_DROPDOWN = [
  { value: "Length", text: "Length", icon: "arrows alternate horizontal" },
  { value: "Mass", text: "Mass", icon: "balance scale" },
  { value: "Volume", text: "Volume", icon: "cube" },
  { value: "Temperature", text: "Temperature", icon: "thermometer three quarters" },
  { value: "Velocity", text: "Velocity", icon: "location arrow" },
  { value: "Area", text: "Area", icon: "clone outline" },
];

// These are based off DB data so they are subject to change.
export const SCALE_ICONS = {
  // Generic
  hand: "hand paper",
  human: "male",
  room: "bed",
  building: "building",
  // Length
  //  hand, human, room, building
  local: "map signs",
  geographic: "map",
  astronomical: "sun",
  // Mass
  //  hand, human
  street: "truck",
  //  building
  // Volume
  //  hand, room, building
  // Temperature
  weather: "cloud",
  cooking: "food",
  chemistry: "fire",
  // Velocity
  pedestrian: "bicycle",
  transit: "bus",
  racing: "car",
  air: "plane",
  rocket: "rocket",
  // Area
  home: "home",
  commercial: "industry",
  land: "tree",
  jurisdiction: "flag",
  territory: "globe",
};

export const DIRECTION_DROPDOWN = [
  { value: false, text: "From Metric", icon: "undo alternate" },
  { value: true, text: "To Metric", icon: "redo alternate" },
];

// Database Constants
export const FLAGS_NONE = 0;

// User
export const USER_STATUS_NAMES = [
  "Normal",
  "Closed",
];
export const USER_STATUS_NORMAL = 0;
export const USER_STATUS_CLOSED = 1;
export const USER_STATUS_DROPDOWN = [
  { value: USER_STATUS_NORMAL, text: "Normal", icon: "check" },
  { value: USER_STATUS_CLOSED, text: "Closed", icon: "close" },
];
export const USER_TYPE_NAMES = [
  "Student",
  "Teacher",
  "Moderator",
  "Admin",
];
export const USER_TYPE_STUDENT = 0;
export const USER_TYPE_TEACHER = 1;
export const USER_TYPE_MODERATOR = 2;
export const USER_TYPE_ADMIN = 3;
export const USER_TYPE_DROPDOWN = [
  { value: USER_TYPE_STUDENT, text: "Student", icon: "users" },
  { value: USER_TYPE_TEACHER, text: "Teacher", icon: "university" },
  { value: USER_TYPE_MODERATOR, text: "Moderator", icon: "user secret" },
  { value: USER_TYPE_ADMIN, text: "Admin", icon: "chess king" },
];
export const USER_FLAG_DISALLOW_QUESTION_SUBMISSION = 0x01;
export const USER_FLAG_DISALLOW_FEEDBACK_SUBMISSION = 0x02;
export const USER_FLAG_DROPDOWN = [
  { value: USER_FLAG_DISALLOW_QUESTION_SUBMISSION, text: "Disallow Question Submission", icon: "plus" },
  { value: USER_FLAG_DISALLOW_FEEDBACK_SUBMISSION, text: "Disallow Feedback Submission", icon: "paper plane" },
];

// Mastery
export const MASTERY_STATUS_ACTIVE = 0;
export const MASTERY_STATUS_INACTIVE = 1;
export const MASTERY_DEFAULT_SCORE = 0;
export const MASTERY_MIN_SCORE = 0;
export const MASTERY_MAX_SCORE = 1000;

// Survey
export const SURVEY_DEFAULT_SCORE = 0;
export const SURVEY_MIN_SCORE = 0;
export const SURVEY_MAX_SCORE = 1000;
export const SURVEY_STATUS_NORMAL = 0;
export const SURVEY_STATUS_SKIPPED = 1;

// Course
export const COURSE_STATUS_ACTIVE = 0;
export const COURSE_STATUS_INACTIVE = 1;
export const COURSE_FLAG_PREFER_METRIC = 0x01;

// Question
export const QUESTION_TYPE_WRITTEN = 0;
export const QUESTION_TYPE_CONVERSION = 1;
export const QUESTION_TYPE_SURVEY = 2;
export const QUESTION_TYPE_NAMES = [
  "Written",
  "Conversion",
  "Survey",
];
export const QUESTION_TYPE_DROPDOWN = [
  { value: QUESTION_TYPE_WRITTEN, text: "Written", icon: "bullseye" },
  { value: QUESTION_TYPE_CONVERSION, text: "Conversion", icon: "calculator" },
  { value: QUESTION_TYPE_SURVEY, text: "Survey", icon: "edit" },
];
export const QUESTION_STATUS_ACTIVE = 0;
export const QUESTION_STATUS_INACTIVE = 1;
export const QUESTION_STATUS_REVIEW_PENDING = 2;
export const QUESTION_STATUS_REVIEW_REJECTED = 3;
export const QUESTION_STATUS_DROPDOWN = [
  { value: QUESTION_STATUS_ACTIVE, text: "Active", icon: "play" },
  { value: QUESTION_STATUS_INACTIVE, text: "Inactive", icon: "stop" },
  { value: QUESTION_STATUS_REVIEW_PENDING, text: "Review pending", icon: "ellipsis horizontal" },
  { value: QUESTION_STATUS_REVIEW_REJECTED, text: "Review rejected", icon: "ban" },
];
export const QUESTION_DIFFICULTY_NONE = 0;
export const QUESTION_DIFFICULTY_EASY = 1;
export const QUESTION_DIFFICULTY_EASY_MEDIUM = 2;
export const QUESTION_DIFFICULTY_MEDIUM = 3;
export const QUESTION_DIFFICULTY_MEDIUM_HARD = 4;
export const QUESTION_DIFFICULTY_HARD = 5;
export const QUESTION_DIFFICULTY_DROPDOWN = [
  { value: QUESTION_DIFFICULTY_NONE, text: "None", icon: "thermometer empty" },
  { value: QUESTION_DIFFICULTY_EASY, text: "Easy", icon: "thermometer empty" },
  { value: QUESTION_DIFFICULTY_EASY_MEDIUM, text: "Easy/Medium", icon: "thermometer quarter" },
  { value: QUESTION_DIFFICULTY_MEDIUM, text: "Medium", icon: "thermometer half" },
  { value: QUESTION_DIFFICULTY_MEDIUM_HARD, text: "Medium/Hard", icon: "thermometer three quarters" },
  { value: QUESTION_DIFFICULTY_HARD, text: "Hard", icon: "thermometer full" },
];
export const QUESTION_FLAG_USER_DETAIL_OPTIONAL = 0x01; // Survey requests user note (optional)
export const QUESTION_FLAG_USER_DETAIL_REQUIRED = 0x02; // Survey requests user note (required)
export const QUESTION_FLAG_DROPDOWN = [
  {
    value: QUESTION_FLAG_USER_DETAIL_OPTIONAL,
    text: "User note optional",
    icon: "file outline",
  },
  {
    value: QUESTION_FLAG_USER_DETAIL_REQUIRED,
    text: "User note required",
    icon: "file alternate outline",
  },
];

// Feedback
export const FEEDBACK_TYPE_GENERAL = 0;
export const FEEDBACK_TYPE_INCORRECT = 1;
export const FEEDBACK_TYPE_CONFUSING = 2;
export const FEEDBACK_TYPE_TYPO = 3;
export const FEEDBACK_TYPE_TOO_EASY = 4;
export const FEEDBACK_TYPE_TOO_HARD = 5;
export const FEEDBACK_TYPE_DROPDOWN = [
  { value: FEEDBACK_TYPE_GENERAL, text: "General", icon: "envelope" },
  { value: FEEDBACK_TYPE_INCORRECT, text: "Question or answer is incorrect", icon: "erase" },
  { value: FEEDBACK_TYPE_CONFUSING, text: "Question or answer is confusing/misleading", icon: "cogs" },
  { value: FEEDBACK_TYPE_TYPO, text: "Question or answer has a typo/mistake", icon: "keyboard" },
  { value: FEEDBACK_TYPE_TOO_EASY, text: "Question is too easy", icon: "snowflake" },
  { value: FEEDBACK_TYPE_TOO_HARD, text: "Question is too hard", icon: "fire" },
];
export const FEEDBACK_STATUS_UNREVIEWED = 0;
export const FEEDBACK_STATUS_REVIEWED_APPROVED = 1;
export const FEEDBACK_STATUS_REVIEWED_REJECTED = 2;
export const FEEDBACK_STATUS_DROPDOWN = [
  { value: FEEDBACK_STATUS_UNREVIEWED, text: "Unreviewed", icon: "question" },
  { value: FEEDBACK_STATUS_REVIEWED_APPROVED, text: "Reviewed - Approved", icon: "checkmark" },
  { value: FEEDBACK_STATUS_REVIEWED_REJECTED, text: "Reviewed - Rejected", icon: "remove" },
];

// Unit initials
export const UNIT_INITIALISMS = {
  cum: "m³",
  cuin: "in³",
  floz: "fl oz",  // Uses non-breaking space 00A0.
  c: "°C",
  f: "°F",
  sqm: "m²",
  sqkm: "km²",
  sqft: "ft²",
  sqmi: "mi²",
  kmph: "km/h",
};

export const UNIT_WORDS = {
  mm: { singular: "Millimeter", plural: "Millimeters" },
  cm: { singular: "Centimeter", plural: "Centimeters" },
  m: { singular: "Meter", plural: "Meters" },
  km: { singular: "Kilometer", plural: "Kilometers" },
  in: { singular: "Inch", plural: "Inches" },
  ft: { singular: "Foot", plural: "Feet" },
  yd: { singular: "Yard", plural: "Yards" },
  mi: { singular: "Mile", plural: "Miles" },
  nmi: { singular: "Nautical Mile", plural: "Nautical Miles" },
  mg: { singular: "Milligram", plural: "Milligrams" },
  g: { singular: "Gram", plural: "Grams" },
  kg: { singular: "Kilogram", plural: "Kilograms" },
  t: { singular: "Tonne", plural: "Tonnes" },
  oz: { singular: "Ounce", plural: "Ounces" },
  lb: { singular: "Pound", plural: "Pounds" },
  st: { singular: "Stone", plural: "Stone" },
  ton: { singular: "Short Ton", plural: "Short Tons" },
  lton: { singular: "Long Ton", plural: "Long Tons" },
  ml: { singular: "Milliliter", plural: "Milliliters" },
  l: { singular: "Liter", plural: "Liters" },
  cum: { singular: "Cubic Meter", plural: "Cubic Meters" },
  cuin: { singular: "Cubic Inch", plural: "Cubic Inches" },
  floz: { singular: "Fluid Ounce", plural: "Fluid Ounces" },
  cup: { singular: "Cup", plural: "Cups" },
  pt: { singular: "Pint", plural: "Pints" },
  qt: { singular: "Quart", plural: "Quarts" },
  gal: { singular: "Gallon", plural: "Gallons" },
  c: { singular: "Celsius", plural: "Celsius" },
  f: { singular: "Fahrenheit", plural: "Fahrenheit" },
  sqm: { singular: "Square Meter", plural: "Square Meters" },
  ha: { singular: "Hectare", plural: "Hectares" },
  sqkm: { singular: "Square Kilometer", plural: "Square Kilometers" },
  sqft: { singular: "Square Foot", plural: "Square Feet" },
  ac: { singular: "Acre", plural: "Acres" },
  sqmi: { singular: "Square Mile", plural: "Square Miles" },
  ms: { singular: "Meter per Second", plural: "Meters per Second" },
  kmph: { singular: "Kilometer per Hour", plural: "Kilometers per Hour" },
  fps: { singular: "Foot per Second", plural: "Feet per Second" },
  mph: { singular: "Mile per Hour", plural: "Miles per Hour" },
  kn: { singular: "Knot", plural: "Knots" },
};

export const UNIT_FAMILIES = {
  metric: {
    length: ["mm", "cm", "m", "km"],
    mass: ["mg", "g", "kg", "t"],
    volume: ["ml", "l", "cum"],
    temperature: ["c"],
    area: ["sqm", "ha", "sqkm"],
    velocity: ["ms", "kmph"],
  },
  uscustomary: {
    length: ["in", "ft", "yd", "mi", "nmi"],
    mass: ["oz", "lb", "ton", "lton", "st"],
    volume: ["cuin", "floz", "cup", "pt", "qt", "gal"],
    temperature: ["f"],
    area: ["sqft", "ac", "sqmi"],
    velocity: ["fps", "mph", "kn"],
  },
};

export const NEGATIVE_UNITS = ["f", "c"];

export const SPLIT_UNITS = {
  in: {
    min: 24,
    units: ["ft", "in"],
    explode: inches => [
      String(Math.floor(inches / 12)), // ft
      String(round(inches % 12, 2)),   // in
      String(0),
    ],
    implode: inputs => String((Math.floor(inputs[0]) * 12) + inputs[1]),
  },
  // Commenting this out because I don't think it'll be needed. Also it would make conversions for
  // tall buildings, mountains, and elevations confusing. If we need miles we'll use kilometers.
  // ft: {
  //   min: 1320,  // 0.25 miles
  //   units: ["mi"],
  //   explode: feet => [
  //     String(round(feet / 5280, 2)),  // mi
  //     String(0),
  //     String(0),
  //   ],
  //   implode: inputs => String((inputs[0] * 5280) + inputs[1]),
  // },
  oz: {
    min: 16,
    units: ["lb", "oz"],
    explode: ounces => [
      String(Math.floor(ounces / 16)), // lbs
      String(round(ounces % 16, 2)),   // oz
      String(0),
    ],
    implode: inputs => String((Math.floor(inputs[0]) * 16) + inputs[1]),
  },
  floz: {
    min: 40,
    units: ["gal", "qt", "floz"],
    explode: fluidOunces => [
      String(Math.floor(fluidOunces / 128)),        // gal
      String(Math.floor((fluidOunces % 128) / 32)), // qt
      String(round(fluidOunces % 32, 2)),           // floz
    ],
    implode: inputs => String((Math.floor(inputs[0]) * 128) +
      (Math.floor(inputs[1]) * 32) + inputs[2]),
  },
};
