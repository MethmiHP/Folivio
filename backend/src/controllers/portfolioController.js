const asyncHandler = require("express-async-handler");
const Portfolio = require("../models/Portfolio");

// GET /api/portfolio/me
const getMyPortfolio = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.findOne({ user: req.user._id });
  if (!portfolio) {
    // Frontend knows how to build a default if it receives an empty object
    return res.json({});
  }
  res.json(portfolio);
});

// POST /api/portfolio
// Create or update current user's portfolio
const upsertMyPortfolio = asyncHandler(async (req, res) => {
  const data = { ...req.body, user: req.user._id };

  const updated = await Portfolio.findOneAndUpdate(
    { user: req.user._id },
    data,
    {
      new: true,
      upsert: true,
      runValidators: false,
    }
  );

  res.status(200).json(updated);
});

module.exports = { getMyPortfolio, upsertMyPortfolio };


