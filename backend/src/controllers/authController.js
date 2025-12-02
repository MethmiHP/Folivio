const asyncHandler = require("express-async-handler");
const User = require("../../models/User");
const generateToken = require("../utils/generateToken");

// POST /api/auth/register
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, username } = req.body;

  if (!name || !email || !password || !username) {
    res.status(400);
    throw new Error("Please provide all fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User with this email already exists");
  }

  const usernameExists = await User.findOne({ username: username.toLowerCase() });
  if (usernameExists) {
    res.status(400);
    throw new Error("Username already taken");
  }

  const user = await User.create({
    name,
    email,
    password,
    username: username.toLowerCase(),
  });

  const token = generateToken(res, user._id);

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    username: user.username,
    profileImg: user.profileImg,
    token,
  });
});

// POST /api/auth/login
const loginUser = asyncHandler(async (req, res) => {
  const { emailOrUsername, password } = req.body;

  const user = await User.findOne({
    $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
  });

  if (!user) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  const token = generateToken(res, user._id);

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    username: user.username,
    profileImg: user.profileImg,
    token,
  });
});

// POST /api/auth/logout
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.json({ message: "Logged out" });
});

// GET /api/auth/me
const getMe = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, logoutUser, getMe };
