const asyncHandler = require("express-async-handler");
const puppeteer = require("puppeteer");
const User = require("../models/User");
const Portfolio = require("../models/Portfolio");

// GET /api/pdf/:username
const generatePortfolioPdf = asyncHandler(async (req, res) => {
  const { username } = req.params;

  const user = await User.findOne({ username: username.toLowerCase() });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const portfolio = await Portfolio.findOne({ user: user._id });
  if (!portfolio) {
    res.status(404);
    throw new Error("No portfolio found for this user");
  }

  const portfolioData = portfolio.toObject();
  const {
    about = {},
    skills = [],
    experience = [],
    projects = [],
    social = {},
    references = [],
  } = portfolioData;

  // Normalize skills - handle both string array and object array
  const normalizedSkills = (skills || []).map(skill => 
    typeof skill === 'string' ? skill : (skill.name || skill)
  ).filter(Boolean);

  // Normalize experience - handle different field names
  const normalizedExperience = (experience || []).map(exp => ({
    role: exp.role || exp.title || '',
    company: exp.company || '',
    year: exp.year || exp.duration || '',
    description: exp.description || ''
  }));

  // Normalize projects - handle different field names
  const normalizedProjects = (projects || []).map(proj => ({
    title: proj.title || proj.name || '',
    description: proj.description || '',
    link: proj.link || ''
  }));

  // Normalize references
  const normalizedReferences = (references || []).map(ref => ({
    name: ref.name || '',
    company: ref.company || '',
    position: ref.position || '',
    contact: ref.contactNo || ref.contact_no || '',
    email: ref.email || ref.Email || '',
  }));

  // Professional CV/Resume HTML template
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>${about.name || user.username} – Resume</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #1a1a1a;
            line-height: 1.6;
            background: #ffffff;
            padding: 0;
            margin: 0;
          }
          
          .container {
            max-width: 210mm;
            margin: 0 auto;
            padding: 20mm;
            background: white;
          }
          
          /* Header Section */
          .header {
            border-bottom: 3px solid #4f46e5;
            padding-bottom: 15px;
            margin-bottom: 20px;
          }
          
          .header h1 {
            font-size: 32px;
            font-weight: 700;
            color: #1a1a1a;
            margin-bottom: 5px;
            letter-spacing: -0.5px;
          }
          
          .header .role {
            font-size: 18px;
            color: #4f46e5;
            font-weight: 500;
            margin-bottom: 10px;
          }
          
          .header .contact {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            font-size: 11px;
            color: #4b5563;
            margin-top: 10px;
          }
          
          .header .contact span {
            display: flex;
            align-items: center;
            gap: 5px;
          }
          
          .header .description {
            font-size: 13px;
            color: #374151;
            margin-top: 12px;
            line-height: 1.7;
          }
          
          /* Section Styles */
          .section {
            margin-top: 20px;
            page-break-inside: avoid;
          }
          
          .section-title {
            font-size: 18px;
            font-weight: 700;
            color: #1a1a1a;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 5px;
            margin-bottom: 12px;
          }
          
          /* Skills Section */
          .skills-container {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 8px;
          }
          
          .skill-tag {
            display: inline-block;
            background: #f3f4f6;
            color: #1a1a1a;
            padding: 6px 12px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 500;
            border: 1px solid #e5e7eb;
          }
          
          /* Experience & Projects */
          .item {
            margin-bottom: 18px;
            page-break-inside: avoid;
          }
          
          .item-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 5px;
          }
          
          .item-title {
            font-size: 15px;
            font-weight: 700;
            color: #1a1a1a;
            margin-bottom: 3px;
          }
          
          .item-subtitle {
            font-size: 13px;
            color: #4f46e5;
            font-weight: 500;
            margin-bottom: 3px;
          }
          
          .item-date {
            font-size: 11px;
            color: #6b7280;
            font-weight: 500;
            white-space: nowrap;
          }
          
          .item-description {
            font-size: 12px;
            color: #374151;
            line-height: 1.6;
            margin-top: 6px;
          }
          
          .item-link {
            font-size: 11px;
            color: #4f46e5;
            margin-top: 4px;
            text-decoration: none;
          }
          
          /* Contact Section */
          .contact-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            margin-top: 8px;
          }
          
          .contact-item {
            font-size: 11px;
            color: #374151;
          }
          
          .contact-item strong {
            color: #1a1a1a;
            display: inline-block;
            min-width: 80px;
          }
          
          /* Print optimizations */
          @media print {
            body {
              background: white;
            }
            .section {
              page-break-inside: avoid;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header -->
          <div class="header">
            <h1>${escapeHtml(about.name || user.name || user.username)}</h1>
            ${about.role ? `<div class="role">${escapeHtml(about.role)}</div>` : ""}
            
            <div class="contact">
              ${social.email ? `<span>📧 ${escapeHtml(social.email)}</span>` : ""}
              ${social.github ? `<span>🔗 GitHub: ${escapeHtml(social.github)}</span>` : ""}
              ${social.linkedin ? `<span>💼 LinkedIn: ${escapeHtml(social.linkedin)}</span>` : ""}
              ${social.website ? `<span>🌐 ${escapeHtml(social.website)}</span>` : ""}
            </div>
            
            ${about.description ? `<div class="description">${escapeHtml(about.description)}</div>` : ""}
          </div>
          
          <!-- Skills -->
          ${normalizedSkills.length > 0 ? `
            <div class="section">
              <div class="section-title">Technical Skills</div>
              <div class="skills-container">
                ${normalizedSkills.map((skill) => `<span class="skill-tag">${escapeHtml(skill)}</span>`).join("")}
              </div>
            </div>
          ` : ""}
          
          <!-- Experience -->
          ${normalizedExperience.length > 0 ? `
            <div class="section">
              <div class="section-title">Professional Experience</div>
              ${normalizedExperience
                .map(
                  (exp) => `
                    <div class="item">
                      <div class="item-header">
                        <div>
                          <div class="item-title">${escapeHtml(exp.role || "Position")}</div>
                          <div class="item-subtitle">${escapeHtml(exp.company || "Company")}</div>
                        </div>
                        ${exp.year ? `<div class="item-date">${escapeHtml(exp.year)}</div>` : ""}
                      </div>
                      ${exp.description ? `<div class="item-description">${escapeHtml(exp.description)}</div>` : ""}
                    </div>
                  `
                )
                .join("")}
            </div>
          ` : ""}
          
          <!-- Projects -->
          ${normalizedProjects.length > 0 ? `
            <div class="section">
              <div class="section-title">Projects</div>
              ${normalizedProjects
                .map(
                  (proj) => `
                    <div class="item">
                      <div class="item-header">
                        <div>
                          <div class="item-title">${escapeHtml(proj.title || "Project")}</div>
                        </div>
                      </div>
                      ${proj.description ? `<div class="item-description">${escapeHtml(proj.description)}</div>` : ""}
                      ${proj.link ? `<a href="${escapeHtml(proj.link)}" class="item-link">${escapeHtml(proj.link)}</a>` : ""}
                    </div>
                  `
                )
                .join("")}
            </div>
          ` : ""}

          <!-- References -->
          ${normalizedReferences.length > 0 ? `
            <div class="section">
              <div class="section-title">References</div>
              ${normalizedReferences
                .map(
                  (ref) => `
                    <div class="item">
                      <div class="item-header">
                        <div>
                          <div class="item-title">${escapeHtml(ref.name || "")}</div>
                          <div class="item-subtitle">${escapeHtml(ref.position || "")}${
                    ref.company ? " at " + escapeHtml(ref.company) : ""
                  }</div>
                        </div>
                      </div>
                      <div class="item-description">
                        ${escapeHtml(ref.contact || "")}<br/>
                        ${escapeHtml(ref.email || "")}
                      </div>
                    </div>
                  `
                )
                .join("")}
            </div>
          ` : ""}
        </div>
      </body>
    </html>
  `;

  // Helper function to escape HTML
  function escapeHtml(text) {
    if (!text) return "";
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return String(text).replace(/[&<>"']/g, (m) => map[m]);
  }

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "0mm",
      right: "0mm",
      bottom: "0mm",
      left: "0mm",
    },
  });

  await browser.close();

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename="${username}-resume.pdf"`,
  });

  res.send(pdfBuffer);
});

module.exports = { generatePortfolioPdf };
