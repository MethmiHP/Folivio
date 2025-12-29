const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

// Load environment variables FIRST
dotenv.config();

// Initialize Passport (only if Google OAuth credentials are available)
let passport = null;
try {
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport = require('passport');
    require('./config/passport')(passport);
    console.log('✓ Google OAuth configured');
  } else {
    console.log('⚠ Google OAuth not configured (GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET missing)');
  }
} catch (error) {
  console.warn('⚠ Failed to initialize Google OAuth:', error.message);
  console.log('   Continuing without Google OAuth...');
}

const { notFound, errorHandler } = require("./middlewares/errorHandler");

const authRoutes = require("./routes/authRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const templateRoutes = require("./routes/templateRoutes");
const aiRoutes = require("./routes/aiRoutes");
const pdfRoutes = require("./routes/pdfRoutes");


const app = express();

// Session middleware (required for Passport)
if (passport) {
  app.use(
    require('express-session')({
      secret: process.env.JWT_SECRET || 'fallback-secret-key',
      resave: false,
      saveUninitialized: false
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
}

// Parse allowed origins from environment variable
const allowedOrigins = (process.env.CLIENT_URL || '')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

// Add common development origins if not in production
if (process.env.NODE_ENV !== 'production') {
  ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:5173'].forEach(origin => {
    if (!allowedOrigins.includes(origin)) {
      allowedOrigins.push(origin);
    }
  });
}

// CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      // Allow all subdomains of vercel.app and your main domain
      const allowedPatterns = [
        /^https?:\/\/portfolio-folivio(-\w+)*\.vercel\.app$/,
        /^https?:\/\/portfolio-folivio(-\w+)*\-methmi-himaya-pathirana\-projects\.vercel\.app$/,
        /^https?:\/\/localhost(:\d+)?$/
      ];

      // Check if origin matches any allowed pattern
      const isAllowed = allowedPatterns.some(pattern => pattern.test(origin)) || 
                       allowedOrigins.includes(origin);
      
      if (isAllowed) {
        return callback(null, true);
      }
      
      // Log blocked origins for debugging
      console.log('Blocked origin:', origin);
      console.log('Allowed origins:', allowedOrigins);
      
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
      'X-CSRF-Token',
      'X-Requested-With',
      'X-HTTP-Method-Override'
    ],
    exposedHeaders: [
      'Content-Length',
      'Content-Type',
      'Authorization',
      'set-cookie',
      'x-auth-token'
    ],
    maxAge: 600, // Cache preflight requests for 10 minutes
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);

// Add CORS headers to all responses
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

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
