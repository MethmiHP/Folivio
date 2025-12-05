const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    company: String,
    role: String,
    year: String,
    description: String,
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    link: String,
    image: String,
  },
  { _id: false }
);

const referenceSchema = new mongoose.Schema(
  {
    name: String,
    company: String,
    position: String,
    contactNo: String,
    email: String,
  },
  { _id: false }
);

const portfolioSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    about: {
      name: String,
      role: String,
      description: String,
      profileImage: String,
    },
    skills: [String],
    experience: [experienceSchema],
    projects: [projectSchema],
    references: [referenceSchema],
    social: {
      email: String,
      github: String,
      linkedin: String,
      website: String,
    },
    theme: { type: String, default: "template1" },
    templateId: { type: mongoose.Schema.Types.ObjectId, default: null },
  },
  { timestamps: true }
);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;


