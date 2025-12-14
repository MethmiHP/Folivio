const asyncHandler = require("express-async-handler");
const { generatePortfolioText } = require("../utils/geminiClient");

// POST /api/ai/portfolio
// Body: { cvText: string, designDescription?: string }
const generatePortfolioFromText = asyncHandler(async (req, res) => {
  const { cvText, designDescription } = req.body;

  if (!cvText || cvText.trim().length < 10) {
    res.status(400);
    throw new Error("Please provide a short description or CV text");
  }

  // Build prompt based on whether design description is provided
  let contentPrompt = `
You are a portfolio builder assistant for software engineers.
Given the user's CV, LinkedIn summary, or free-form description, create a concise JSON object that can power a modern developer portfolio.

CRITICAL RULES:
- Respond with ONLY valid JSON. No markdown, no backticks, no comments.
- Keep text fairly short and scannable.

User content input:
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
}`;

  // Generate content first
  const contentRaw = await generatePortfolioText(contentPrompt);
  let contentCleaned = (contentRaw || "").trim();

  // Remove code fences if the model adds them anyway
  if (contentCleaned.startsWith("```json")) {
    contentCleaned = contentCleaned.replace(/^```json\s*/, "").replace(/\s*```$/, "");
  } else if (contentCleaned.startsWith("```")) {
    contentCleaned = contentCleaned.replace(/^```\s*/, "").replace(/\s*```$/, "");
  }

  let parsedContent;
  try {
    parsedContent = JSON.parse(contentCleaned);
  } catch (err) {
    res.status(500);
    throw new Error("AI response could not be parsed as JSON");
  }

  // If design description is provided, generate custom design config
  let customDesign = null;
  if (designDescription && designDescription.trim().length > 5) {
    const designPrompt = `
You are a web design expert. Based on the user's design description, create a custom design configuration for a portfolio website.

User's design description: "${designDescription}"

Generate a design configuration that matches their vision. Consider:
- Color scheme (primary, secondary, accent colors)
- Layout style (standard, sidebar, grid, centered)
- Overall style (modern, classic, minimal, creative, bold)
- Font preferences

Return ONLY valid JSON with this exact shape (no markdown, no backticks):
{
  "colors": {
    "primary": "#hexcode",
    "secondary": "#hexcode",
    "accent": "#hexcode",
    "background": "#hexcode or gradient description",
    "text": "#hexcode"
  },
  "layout": "standard|sidebar|grid|centered",
  "style": "modern|classic|minimal|creative|bold",
  "fonts": {
    "heading": "font name or 'sans-serif'",
    "body": "font name or 'sans-serif'"
  }
}

Choose colors that work well together and match the design description. Use standard web-safe colors in hex format.
`;

    try {
      const designRaw = await generatePortfolioText(designPrompt);
      let designCleaned = (designRaw || "").trim();

      if (designCleaned.startsWith("```json")) {
        designCleaned = designCleaned.replace(/^```json\s*/, "").replace(/\s*```$/, "");
      } else if (designCleaned.startsWith("```")) {
        designCleaned = designCleaned.replace(/^```\s*/, "").replace(/\s*```$/, "");
      }

      const parsedDesign = JSON.parse(designCleaned);
      
      customDesign = {
        isCustom: true,
        colors: {
          primary: parsedDesign.colors?.primary || "#4f46e5",
          secondary: parsedDesign.colors?.secondary || "#7c3aed",
          accent: parsedDesign.colors?.accent || "#ec4899",
          background: parsedDesign.colors?.background || "#ffffff",
          text: parsedDesign.colors?.text || "#1e293b",
        },
        fonts: {
          heading: parsedDesign.fonts?.heading || "sans-serif",
          body: parsedDesign.fonts?.body || "sans-serif",
        },
        layout: parsedDesign.layout || "standard",
        style: parsedDesign.style || "modern",
        designDescription: designDescription.trim(),
      };
    } catch (designErr) {
      console.error("Failed to generate custom design, using default:", designErr);
      // Continue with default design if custom design generation fails
    }
  }

  // Build result object
  const result = {
    about: parsedContent.about || {},
    skills: parsedContent.skills || [],
    experience: parsedContent.experience || [],
    projects: parsedContent.projects || [],
    social: parsedContent.social || {},
    theme: customDesign ? "custom" : "template2", // Use "custom" theme for custom designs
    customDesign: customDesign,
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
