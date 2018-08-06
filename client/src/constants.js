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

// User
export const USER_TYPE_NAMES = [
  "student",
  "teacher",
  "moderator",
  "admin",
];
export const USER_STATUS_NAMES = [
  "normal",
  "closed",
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
export const QUESTION_FLAG_USER_DETAIL_OPTIONAL = 0x01; // Survey requests user note (optional)
export const QUESTION_FLAG_USER_DETAIL_REQUIRED = 0x02; // Survey requests user note (required)
export const QUESTION_TYPE_NAMES = [
  "written",
  "conversion",
  "survey",
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
