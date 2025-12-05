const { GoogleGenerativeAI } = require("@google/generative-ai");

let model;

function getModel() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured on the server");
  }

  if (!model) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL || "gemini-1.5-flash",
    });
  }

  return model;
}

async function generatePortfolioText(prompt) {
  const mdl = getModel();
  // SDK supports passing a plain string prompt
  const result = await mdl.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

module.exports = { generatePortfolioText };
