/**
 * Backend Validation Middleware
 * Validates user registration and login data
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean}
 */
const isValidEmail = (email) => {
    if (!email || typeof email !== "string") return false;
  
    // RFC 5322 compliant email regex (simplified but comprehensive)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailRegex.test(email)) return false;
    if (email.length > 254) return false;
  
    const [localPart, domain] = email.split("@");
    if (localPart.length > 64) return false;
    if (domain.length > 253) return false;
  
    return true;
  };
  
  /**
   * Validate password strength
   * @param {string} password - Password to validate
   * @returns {object} - { isValid: boolean, errors: array }
   */
  const validatePasswordStrength = (password) => {
    const errors = [];
  
    if (!password || typeof password !== "string") {
      return { isValid: false, errors: ["Password is required"] };
    }
  
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }
  
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }
  
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }
  
    if (!/\d/.test(password)) {
      errors.push("Password must contain at least one number");
    }
  
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push("Password must contain at least one special character (!@#$%^&*)");
    }
  
    return {
      isValid: errors.length === 0,
      errors,
    };
  };
  
  /**
   * Validate username format
   * @param {string} username - Username to validate
   * @returns {object} - { isValid: boolean, error: string }
   */
  const validateUsername = (username) => {
    if (!username || typeof username !== "string") {
      return { isValid: false, error: "Username is required" };
    }
  
    if (username.length < 3) {
      return { isValid: false, error: "Username must be at least 3 characters long" };
    }
  
    if (username.length > 30) {
      return { isValid: false, error: "Username must be less than 30 characters" };
    }
  
    // Only allow alphanumeric, underscore, and hyphen
    const usernameRegex = /^[a-zA-Z0-9_-]+$/;
  
    if (!usernameRegex.test(username)) {
      return {
        isValid: false,
        error: "Username can only contain letters, numbers, underscore, and hyphen",
      };
    }
  
    // Don't allow username to start or end with special chars
    if (/^[_-]|[_-]$/.test(username)) {
      return {
        isValid: false,
        error: "Username cannot start or end with underscore or hyphen",
      };
    }
  
    return { isValid: true, error: null };
  };
  
  /**
   * Validate name
   * @param {string} name - Name to validate
   * @returns {object} - { isValid: boolean, error: string }
   */
  const validateName = (name) => {
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return { isValid: false, error: "Name is required" };
    }
  
    if (name.trim().length < 2) {
      return { isValid: false, error: "Name must be at least 2 characters long" };
    }
  
    if (name.length > 50) {
      return { isValid: false, error: "Name must be less than 50 characters" };
    }
  
    // Allow letters, spaces, hyphens, and apostrophes
    const nameRegex = /^[a-zA-Z\s'-]+$/;
  
    if (!nameRegex.test(name)) {
      return {
        isValid: false,
        error: "Name can only contain letters, spaces, hyphens, and apostrophes",
      };
    }
  
    return { isValid: true, error: null };
  };
  
  /**
   * Middleware to validate registration data
   */
  const validateRegistration = (req, res, next) => {
    const { name, email, username, password } = req.body;
    const errors = [];
  
    // Validate name
    const nameValidation = validateName(name);
    if (!nameValidation.isValid) {
      errors.push(nameValidation.error);
    }
  
    // Validate email
    if (!isValidEmail(email)) {
      errors.push("Please provide a valid email address");
    }
  
    // Validate username
    const usernameValidation = validateUsername(username);
    if (!usernameValidation.isValid) {
      errors.push(usernameValidation.error);
    }
  
    // Validate password
    const passwordValidation = validatePasswordStrength(password);
    if (!passwordValidation.isValid) {
      errors.push(...passwordValidation.errors);
    }
  
    // If there are validation errors, return them
    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors,
      });
    }
  
    // All validations passed, continue to next middleware
    next();
  };
  
  /**
   * Middleware to validate login data
   */
  const validateLogin = (req, res, next) => {
    const { emailOrUsername, password } = req.body;
    const errors = [];
  
    // Validate emailOrUsername
    if (!emailOrUsername || typeof emailOrUsername !== "string" || emailOrUsername.trim() === "") {
      errors.push("Email or username is required");
    }
  
    // Validate password
    if (!password || typeof password !== "string" || password.trim() === "") {
      errors.push("Password is required");
    }
  
    // If there are validation errors, return them
    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors,
      });
    }
  
    // All validations passed, continue to next middleware
    next();
  };
  
  module.exports = {
    validateRegistration,
    validateLogin,
    isValidEmail,
    validatePasswordStrength,
    validateUsername,
    validateName,
  };