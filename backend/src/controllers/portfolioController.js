const asyncHandler = require("express-async-handler");
const Portfolio = require("../models/Portfolio");
const User = require("../models/User");

// GET /api/portfolio/me
const getMyPortfolio = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.findOne({ user: req.user._id });
  if (!portfolio) {
    // Frontend knows how to build a default if it receives an empty object
    return res.json({});
  }
  res.json(portfolio);
});

// GET /api/portfolio/:username
const getPortfolioByUsername = asyncHandler(async (req, res) => {
  const { username } = req.params;

  const user = await User.findOne({ username: username.toLowerCase() }).select(
    "-password"
  );

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const portfolio = await Portfolio.findOne({ user: user._id });
  if (!portfolio) {
    res.status(404);
    throw new Error("Portfolio not found");
  }

  res.json({
    user: {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    },
    portfolio,
  });
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

module.exports = { getMyPortfolio, upsertMyPortfolio, getPortfolioByUsername };


