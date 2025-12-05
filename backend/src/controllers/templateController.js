const asyncHandler = require("express-async-handler");
const Template = require("../models/Template");

// GET /api/templates
// Get all available templates
const getTemplates = asyncHandler(async (req, res) => {
  let templates = await Template.find().sort({ createdAt: -1 });

  // If no templates in DB, return default templates
  if (templates.length === 0) {
    templates = [
      {
        _id: "t1",
        name: "Classic",
        identifier: "template1",
        description: "Traditional professional layout",
        isPremium: false,
        category: "standard",
      },
      {
        _id: "t2",
        name: "Modern",
        identifier: "template2",
        description: "Contemporary design with gradients",
        isPremium: false,
        category: "modern",
      },
      {
        _id: "t3",
        name: "Minimal",
        identifier: "template3",
        description: "Clean and minimalist approach",
        isPremium: false,
        category: "minimal",
      },
      {
        _id: "t4",
        name: "Creative",
        identifier: "template4",
        description: "Bold and creative design",
        isPremium: false,
        category: "creative",
      },
    ];
  }

  res.json(templates);
});

// POST /api/templates (Admin only - for seeding)
const createTemplate = asyncHandler(async (req, res) => {
  const { name, identifier, description, isPremium, category, config } = req.body;

  const template = await Template.create({
    name,
    identifier,
    description,
    isPremium,
    category,
    config,
  });

  res.status(201).json(template);
});

module.exports = { getTemplates, createTemplate };

