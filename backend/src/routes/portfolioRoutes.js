const express = require("express");
const router = express.Router();
const {
  getMyPortfolio,
  upsertMyPortfolio,
  getPortfolioByUsername,
} = require("../controllers/portfolioController");
const { protect } = require("../middlewares/auth");

router.get("/me", protect, getMyPortfolio);
router.post("/", protect, upsertMyPortfolio);
router.get("/:username", getPortfolioByUsername);

module.exports = router;


