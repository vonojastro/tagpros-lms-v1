export const errorMessage = {
  not_email: "Email address is not in the correct format.",
  duplicate_email: "Email already exist.",
  empty_field: "Please fill out this field.",
  too_short: "Must be at least 2 characters, and do not exceed 50 characters",
  too_long: "Must be at least 2 characters, and do not exceed 50 characters",
  too_long_2: "Must be at least 2 characters, and do not exceed 10 characters",
  password_too_short: "Must be at least 8 characters, and do not exceed 50 characters",
  special_char: "Must not include numbers or special characters.",
  passwordMismatched: "Password provided must match.",
  no_option_selected: "Please select an option.", // Use in dropdown 'select' fields
  image_not_uploaded: "Please upload a photo.",
  char_maxed: ({max}) => `Please enter at most ${max} characters.`
};
