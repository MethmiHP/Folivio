const express = require("express");
const router = express.Router();
const { getMyPortfolio, upsertMyPortfolio } = require("../controllers/portfolioController");
const { protect } = require("../middlewares/auth");

router.get("/me", protect, getMyPortfolio);
router.post("/", protect, upsertMyPortfolio);

module.exports = router;


