export const AUTH_TOKEN = "auth-token";
export const PASSWORD_MINIMUM_LENGTH = 6;
export const BAD_PASSWORDS = [
  "password",
  "letmein",
  "asdasd",
  "qweqwe",
  "qwerty",
  "abc123",
  "123456",
  "1234567",
  "12345678",
];
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
