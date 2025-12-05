const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");
const { getTemplates, createTemplate } = require("../controllers/templateController");

router.get("/", protect, getTemplates);
router.post("/", protect, createTemplate); // For seeding templates

module.exports = router;


