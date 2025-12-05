const express = require("express");
const router = express.Router();
const { generatePortfolioPdf } = require("../controllers/pdfController");

// Public: generates a PDF for the given username
router.get("/:username", generatePortfolioPdf);

module.exports = router;



