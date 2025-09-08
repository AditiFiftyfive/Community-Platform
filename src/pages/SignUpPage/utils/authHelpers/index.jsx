export const AUTH_ERRORS = {
  SERVICE_UNAVAILABLE: "Authentication service is not available. Please try again.",
  GENERIC_ERROR: "Something went wrong. Please try again.",
  INVALID_CODE: "Invalid verification code. Please try again.",
  RESEND_FAILED: "Failed to resend verification email"
};

export const FORM_VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  VERIFICATION_CODE_LENGTH: 6
};

export const AUTH_STATES = {
  SIGNUP: "signup",
  VERIFICATION: "verification"
};

export const validateSignUpForm = (formData) => {
  const { firstName, lastName, email, password } = formData;
  
  if (!firstName.trim() || !lastName.trim() || !email.trim() || !password) {
    return false;
  }
  
  if (password.length < FORM_VALIDATION.PASSWORD_MIN_LENGTH) {
    return false;
  }
  
  return true;
};

export const validateVerificationCode = (code) => {
  return code.length === FORM_VALIDATION.VERIFICATION_CODE_LENGTH;
};

export const sanitizeVerificationCode = (code) => {
  return code.replace(/\D/g, '');
};