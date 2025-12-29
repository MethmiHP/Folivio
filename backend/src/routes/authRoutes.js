// const express = require("express");
// const router = express.Router();
// const {
//   registerUser,
//   loginUser,
//   logoutUser,
//   getMe,
// } = require("../controllers/authController");
// const { protect } = require("../middlewares/auth");

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.post("/logout", protect, logoutUser);
// router.get("/me", protect, getMe);

// module.exports = router;

const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const {
  validateRegistration,
  validateLogin,
} = require("../middlewares/validationMiddleware");

const router = express.Router();

// POST /api/auth/register - Register a new user (with validation)
router.post("/register", validateRegistration, registerUser);

// POST /api/auth/login - Login user (with validation)
router.post("/login", validateLogin, loginUser);

// POST /api/auth/logout - Logout user
router.post("/logout", logoutUser);

// GET /api/auth/me - Get current user (protected route)
router.get("/me", protect, getMe);

// POST /api/auth/forgot-password - Forgot password (send reset email)
router.post("/forgot-password", forgotPassword);

// PUT /api/auth/reset-password/:resetToken - Reset password with token
router.put("/reset-password/:resetToken", resetPassword);

// Google OAuth routes (only if configured)
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  const passport = require('passport');
  
  router.get(
    "/google",
    (req, res, next) => {
      // Log OAuth initiation for debugging
      const origin = req.headers.origin || req.headers.referer || 'unknown';
      console.log('🔵 Google OAuth initiated from:', origin);
      passport.authenticate("google", {
        scope: ["profile", "email"],
        session: false,
      })(req, res, next);
    }
  );

  router.get(
    "/google/callback",
    (req, res, next) => {
      passport.authenticate("google", {
        failureRedirect: false,
        session: false,
      })(req, res, (err) => {
        if (err) {
          console.error("Google OAuth authentication error:", err);
          const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
          return res.redirect(`${frontendUrl}/login?error=oauth_failed&message=${encodeURIComponent(err.message || 'Authentication failed')}`);
        }
        if (!req.user) {
          const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
          return res.redirect(`${frontendUrl}/login?error=oauth_failed&message=${encodeURIComponent('User not found')}`);
        }
        next();
      });
    },
    async (req, res) => {
      try {
        if (!req.user) {
          throw new Error('User not found after authentication');
        }

        console.log('✅ Google OAuth successful for user:', req.user.email);
        
        const generateToken = require("../utils/generateToken");
        const token = generateToken(res, req.user._id);
        
        // Redirect to frontend with token
        const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
        const redirectUrl = `${frontendUrl}/auth/callback?token=${token}`;
        console.log('🔄 Redirecting to frontend:', redirectUrl);
        res.redirect(redirectUrl);
      } catch (error) {
        console.error("❌ Google OAuth callback error:", error);
        const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
        const errorMessage = error.message || 'Token generation failed';
        res.redirect(`${frontendUrl}/login?error=oauth_failed&message=${encodeURIComponent(errorMessage)}`);
      }
    }
  );
} else {
  // Stub routes that return helpful error messages
  router.get("/google", (req, res) => {
    res.status(503).json({
      success: false,
      message: "Google OAuth is not configured. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables.",
    });
  });

  router.get("/google/callback", (req, res) => {
    res.status(503).json({
      success: false,
      message: "Google OAuth is not configured.",
    });
  });
}

module.exports = router;