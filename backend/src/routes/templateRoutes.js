const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");

// For now we serve a simple static list of templates.
router.get("/", protect, (req, res) => {
  const templates = [
    { _id: "t1", name: "Classic", identifier: "template1", isPremium: false },
    { _id: "t2", name: "Modern", identifier: "template2", isPremium: false },
    { _id: "t3", name: "Minimal", identifier: "template3", isPremium: false },
  ];

  res.json(templates);
});

module.exports = router;


