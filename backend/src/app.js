const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const path = require("path");

const { notFound, errorHandler } = require("./middleware/errorHandler");

dotenv.config();

const authRoutes = require("./routes/authRoutes");


const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API routes
app.use("/api/auth", authRoutes);




// Error handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;
