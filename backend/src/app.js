const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const { notFound, errorHandler } = require("./middlewares/errorHandler");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const templateRoutes = require("./routes/templateRoutes");
const aiRoutes = require("./routes/aiRoutes");
const pdfRoutes = require("./routes/pdfRoutes");


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
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/pdf", pdfRoutes);




// Error handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;
