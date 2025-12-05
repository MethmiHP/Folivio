const express = require("express");
const router = express.Router();
const { generatePortfolioFromText } = require("../controllers/aiController");
const { protect } = require("../middlewares/auth");

// Authenticated because we will update the current user's draft
router.post("/portfolio", protect, generatePortfolioFromText);

module.exports = router;



