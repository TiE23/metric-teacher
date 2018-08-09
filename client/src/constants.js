// Standard names
export const AUTH_TOKEN = "auth-token";

// Styling
export const FLOATING_CENTER_GRID_COLUMN_WIDTH_MEDIUM = { mobile: 16, tablet: 8, computer: 8 };
export const FLOATING_CENTER_GRID_COLUMN_WIDTH_WIDE = { mobile: 16, tablet: 14, computer: 14 };

// Password
export const PASSWORD_MINIMUM_LENGTH = 6;
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

export const SUBJECT_ICONS = {
  Length: "arrows alternate horizontal",
  Mass: "balance scale",
  Volume: "cube",
  Temperature: "thermometer three quarters",
  Velocity: "rocket",
  Area: "clone outline",
};

// Database Constants
export const FLAGS_NONE = 0;

// User
export const USER_TYPE_NAMES = [
  "Student",
  "Teacher",
  "Moderator",
  "Admin",
];
export const USER_STATUS_NAMES = [
  "Normal",
  "Closed",
];
export const USER_TYPE_STUDENT = 0;
export const USER_TYPE_TEACHER = 1;
export const USER_TYPE_MODERATOR = 2;
export const USER_TYPE_ADMIN = 3;

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
export const QUESTION_TYPE_ICONS = [
  "bullseye",
  "calculator",
  "edit",
];
export const QUESTION_TYPE_DROPDOWN_OPTIONS = [
  { value: QUESTION_TYPE_WRITTEN, text: "Written" },
  { value: QUESTION_TYPE_CONVERSION, text: "Conversion" },
  { value: QUESTION_TYPE_SURVEY, text: "Survey" },
];
export const QUESTION_STATUS_ACTIVE = 0;
export const QUESTION_STATUS_INACTIVE = 1;
export const QUESTION_STATUS_REVIEW_PENDING = 2;
export const QUESTION_STATUS_REVIEW_REJECTED = 3;
export const QUESTION_STATUS_NAMES = [
  "Active",
  "Inactive",
  "Review pending",
  "Review rejected",
];
export const QUESTION_STATUS_DROPDOWN_OPTIONS = [
  { value: QUESTION_STATUS_ACTIVE, text: "Active" },
  { value: QUESTION_STATUS_INACTIVE, text: "Inactive" },
  { value: QUESTION_STATUS_REVIEW_PENDING, text: "Review pending" },
  { value: QUESTION_STATUS_REVIEW_REJECTED, text: "Review rejected" },
];
export const QUESTION_DIFFICULTY_NONE = 0;
export const QUESTION_DIFFICULTY_EASY = 1;
export const QUESTION_DIFFICULTY_EASY_MEDIUM = 2;
export const QUESTION_DIFFICULTY_MEDIUM = 3;
export const QUESTION_DIFFICULTY_MEDIUM_HARD = 4;
export const QUESTION_DIFFICULTY_HARD = 5;
export const QUESTION_DIFFICULTY_NAMES = [
  "None",
  "Easy",
  "Easy/Medium",
  "Medium",
  "Medium/Hard",
  "Hard",
];
export const QUESTION_DIFFICULTY_ICONS = [
  "thermometer empty",
  "thermometer empty",
  "thermometer quarter",
  "thermometer half",
  "thermometer three quarters",
  "thermometer full",
];
export const QUESTION_DIFFICULTY_DROPDOWN_OPTIONS = [
  { value: QUESTION_DIFFICULTY_NONE, text: "None" },
  { value: QUESTION_DIFFICULTY_EASY, text: "Easy" },
  { value: QUESTION_DIFFICULTY_EASY_MEDIUM, text: "Easy/Medium" },
  { value: QUESTION_DIFFICULTY_MEDIUM, text: "Medium" },
  { value: QUESTION_DIFFICULTY_MEDIUM_HARD, text: "Medium/Hard" },
  { value: QUESTION_DIFFICULTY_HARD, text: "Hard" },
];
export const QUESTION_FLAG_USER_DETAIL_OPTIONAL = 0x01; // Survey requests user note (optional)
export const QUESTION_FLAG_USER_DETAIL_REQUIRED = 0x02; // Survey requests user note (required)
export const QUESTION_FLAG_NAMES = {
  0x01: "User note optional",
  0x02: "User note required",
};
export const QUESTION_FLAG_DROPDOWN = [
  {
    value: QUESTION_FLAG_USER_DETAIL_OPTIONAL,
    text: "0x01 User note optional",
    key: 0x01,
  },
  {
    value: QUESTION_FLAG_USER_DETAIL_REQUIRED,
    text: "0x02 User note required",
    key: 0x02,
  },
];

// Unit initials
export const UNIT_INITIALISMS = {
  cum: "m³",
  cuin: "in³",
  c: "°C",
  f: "°F",
  sqm: "m²",
  sqkm: "km²",
  sqft: "ft²",
  sqmi: "mi²",
  kmph: "km/h",
};
