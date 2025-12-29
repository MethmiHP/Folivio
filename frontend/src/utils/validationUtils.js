// Frontend Validation Utilities

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {object} - { isValid: boolean, message: string }
 */
export const validateEmail = (email) => {
    if (!email) {
      return { isValid: false, message: "Email is required" };
    }
  
    // RFC 5322 compliant email regex (simplified)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      return { isValid: false, message: "Please enter a valid email address" };
    }
  
    // Additional checks
    if (email.length > 254) {
      return { isValid: false, message: "Email is too long" };
    }
  
    const [localPart, domain] = email.split('@');
    
    if (localPart.length > 64) {
      return { isValid: false, message: "Email local part is too long" };
    }
  
    if (domain.length > 253) {
      return { isValid: false, message: "Email domain is too long" };
    }
  
    return { isValid: true, message: "" };
  };
  
  /**
   * Validate password strength
   * @param {string} password - Password to validate
   * @returns {object} - { isValid: boolean, message: string, strength: string, checks: object }
   */
  export const validatePassword = (password) => {
    const checks = {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    };
  
    const passedChecks = Object.values(checks).filter(Boolean).length;
    
    let strength = "weak";
    if (passedChecks >= 5) strength = "strong";
    else if (passedChecks >= 3) strength = "medium";
  
    if (!checks.minLength) {
      return {
        isValid: false,
        message: "Password must be at least 8 characters long",
        strength,
        checks,
      };
    }
  
    if (!checks.hasUpperCase) {
      return {
        isValid: false,
        message: "Password must contain at least one uppercase letter",
        strength,
        checks,
      };
    }
  
    if (!checks.hasLowerCase) {
      return {
        isValid: false,
        message: "Password must contain at least one lowercase letter",
        strength,
        checks,
      };
    }
  
    if (!checks.hasNumber) {
      return {
        isValid: false,
        message: "Password must contain at least one number",
        strength,
        checks,
      };
    }
  
    if (!checks.hasSpecialChar) {
      return {
        isValid: false,
        message: "Password must contain at least one special character (!@#$%^&*)",
        strength,
        checks,
      };
    }
  
    return {
      isValid: true,
      message: "Password is strong",
      strength,
      checks,
    };
  };
  
  /**
   * Validate username format
   * @param {string} username - Username to validate
   * @returns {object} - { isValid: boolean, message: string }
   */
  export const validateUsername = (username) => {
    if (!username) {
      return { isValid: false, message: "Username is required" };
    }
  
    if (username.length < 3) {
      return { isValid: false, message: "Username must be at least 3 characters long" };
    }
  
    if (username.length > 30) {
      return { isValid: false, message: "Username must be less than 30 characters" };
    }
  
    // Only allow alphanumeric, underscore, and hyphen
    const usernameRegex = /^[a-zA-Z0-9_-]+$/;
    
    if (!usernameRegex.test(username)) {
      return { isValid: false, message: "Username can only contain letters, numbers, underscore, and hyphen" };
    }
  
    // Don't allow username to start or end with special chars
    if (/^[_-]|[_-]$/.test(username)) {
      return { isValid: false, message: "Username cannot start or end with underscore or hyphen" };
    }
  
    return { isValid: true, message: "" };
  };
  
  /**
   * Validate full name
   * @param {string} name - Name to validate
   * @returns {object} - { isValid: boolean, message: string }
   */
  export const validateName = (name) => {
    if (!name || name.trim().length === 0) {
      return { isValid: false, message: "Name is required" };
    }
  
    if (name.trim().length < 2) {
      return { isValid: false, message: "Name must be at least 2 characters long" };
    }
  
    if (name.length > 50) {
      return { isValid: false, message: "Name must be less than 50 characters" };
    }
  
    // Allow letters, spaces, hyphens, and apostrophes
    const nameRegex = /^[a-zA-Z\s'-]+$/;
    
    if (!nameRegex.test(name)) {
      return { isValid: false, message: "Name can only contain letters, spaces, hyphens, and apostrophes" };
    }
  
    return { isValid: true, message: "" };
  };
  
  /**
   * Get password strength color
   * @param {string} strength - Password strength (weak, medium, strong)
   * @returns {string} - Tailwind color class
   */
  export const getPasswordStrengthColor = (strength) => {
    switch (strength) {
      case "strong":
        return "text-green-400";
      case "medium":
        return "text-yellow-400";
      case "weak":
        return "text-red-400";
      default:
        return "text-slate-400";
    }
  };
  
  /**
   * Get password strength bar color
   * @param {string} strength - Password strength (weak, medium, strong)
   * @returns {string} - Tailwind background color class
   */
  export const getPasswordStrengthBarColor = (strength) => {
    switch (strength) {
      case "strong":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "weak":
        return "bg-red-500";
      default:
        return "bg-slate-600";
    }
  };