const asyncHandler = require("express-async-handler");
const { generatePortfolioText } = require("../utils/geminiClient");

// POST /api/ai/portfolio
// Body: { cvText: string }
const generatePortfolioFromText = asyncHandler(async (req, res) => {
  const { cvText } = req.body;

  if (!cvText || cvText.trim().length < 10) {
    res.status(400);
    throw new Error("Please provide a short description or CV text");
  }

  const prompt = `
You are a portfolio builder assistant for software engineers.
Given the user's CV, LinkedIn summary, or free-form description, create a concise JSON object that can power a modern developer portfolio.

CRITICAL RULES:
- Respond with ONLY valid JSON. No markdown, no backticks, no comments.
- Keep text fairly short and scannable.

User input:
${cvText}

Return JSON with this exact shape:
{
  "about": {
    "name": "string",
    "role": "string",
    "description": "string"
  },
  "skills": ["string"],
  "experience": [
    { "company": "string", "role": "string", "year": "string", "description": "string" }
  ],
  "projects": [
    { "title": "string", "description": "string", "link": "string" }
  ],
  "social": {
    "email": "string",
    "github": "string",
    "linkedin": "string",
    "website": "string"
  }
}
`;

  const raw = await generatePortfolioText(prompt);
  let cleaned = (raw || "").trim();

  // Remove code fences if the model adds them anyway
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json\s*/, "").replace(/\s*```$/, "");
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```\s*/, "").replace(/\s*```$/, "");
  }

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    res.status(500);
    throw new Error("AI response could not be parsed as JSON");
  }

  // Ensure we always return a full portfolio object and force modern template
  const result = {
    about: parsed.about || {},
    skills: parsed.skills || [],
    experience: parsed.experience || [],
    projects: parsed.projects || [],
    social: parsed.social || {},
    theme: "template2",
  };

  res.json(result);
});

module.exports = { generatePortfolioFromText };

// const asyncHandler = require("express-async-handler");
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// let genAI;

// function getGemini() {
//   if (!process.env.GEMINI_API_KEY) {
//     throw new Error("GEMINI_API_KEY is not configured on the server");
//   }
//   if (!genAI) {
//     genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//   }
//   return genAI;
// }

// // POST /api/ai/portfolio
// // Body: { cvText: string }
// const generatePortfolioFromText = asyncHandler(async (req, res) => {
//   const { cvText } = req.body;

//   if (!cvText || cvText.trim().length < 30) {
//     res.status(400);
//     throw new Error("Please provide a bit more detail about your experience");
//   }

//   const client = getGemini();
//   const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });

//   const prompt = `You are a portfolio builder assistant. Given a CV or freeform description, you return concise JSON describing a developer portfolio. Respond with ONLY valid JSON, no markdown formatting, no code blocks.

// CV or description:
// ${cvText}

// Return JSON with this exact shape:
// {
//   "about": {
//     "name": "string",
//     "role": "string",
//     "description": "string"
//   },
//   "skills": ["string"],
//   "experience": [
//     { "company": "string", "role": "string", "year": "string", "description": "string" }
//   ],
//   "projects": [
//     { "title": "string", "description": "string", "link": "string" }
//   ],
//   "social": {
//     "email": "string",
//     "github": "string",
//     "linkedin": "string",
//     "website": "string"
//   }
// }`;

//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   const content = response.text() || "{}";

//   // Clean up the response - remove markdown code blocks if present
//   let cleanedContent = content.trim();
//   if (cleanedContent.startsWith("```json")) {
//     cleanedContent = cleanedContent.replace(/^```json\s*/, "").replace(/\s*```$/, "");
//   } else if (cleanedContent.startsWith("```")) {
//     cleanedContent = cleanedContent.replace(/^```\s*/, "").replace(/\s*```$/, "");
//   }

//   let parsed;
//   try {
//     parsed = JSON.parse(cleanedContent);
//   } catch (err) {
//     res.status(500);
//     throw new Error(`AI response could not be parsed: ${err.message}`);
//   }

//   res.json(parsed);
// });

// module.exports = { generatePortfolioFromText };
