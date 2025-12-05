const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    identifier: { type: String, required: true, unique: true },
    description: String,
    previewImage: String,
    isPremium: { type: Boolean, default: false },
    category: { type: String, default: "standard" }, // standard, creative, minimal, etc.
    config: {
      // Template-specific configuration
      primaryColor: { type: String, default: "#4f46e5" },
      layout: { type: String, default: "standard" }, // standard, sidebar, grid, etc.
    },
  },
  { timestamps: true }
);

const Template = mongoose.model("Template", templateSchema);

module.exports = Template;

