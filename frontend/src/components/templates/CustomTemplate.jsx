// Custom Template - Dynamically styled based on AI-generated design config
const CustomTemplate = ({ portfolio, username }) => {
  const { 
    about = {}, 
    skills = [], 
    experience = [], 
    projects = [], 
    references = [], 
    social = {},
    customDesign = {}
  } = portfolio || {};

  const colors = customDesign.colors || {
    primary: "#14b8a6", // teal-500
    secondary: "#06b6d4", // cyan-500
    accent: "#0891b2", // cyan-600
    background: "#ffffff",
    text: "#1e293b",
  };

  const layout = customDesign.layout || "standard";
  const style = customDesign.style || "modern";
  const fonts = customDesign.fonts || { heading: "sans-serif", body: "sans-serif" };

  // Convert gradient string to Tailwind classes if needed
  const getBackgroundStyle = () => {
    if (colors.background?.includes("gradient")) {
      // Handle gradient descriptions
      return {
        background: `linear-gradient(to bottom right, ${colors.primary}, ${colors.secondary})`,
      };
    }
    return { backgroundColor: colors.background };
  };

  const headerStyle = {
    ...getBackgroundStyle(),
    color: style === "modern" ? "#ffffff" : colors.text,
  };

  return (
    <div 
      className="border border-slate-800 rounded-xl overflow-hidden text-slate-900"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      {/* Header */}
      <div 
        className="px-6 py-6"
        style={headerStyle}
      >
        <h1 
          className="text-3xl font-bold"
          style={{ 
            fontFamily: fonts.heading,
            color: style === "modern" ? "#ffffff" : colors.primary 
          }}
        >
          {about.name || "Your Name"}
        </h1>
        <p 
          className="text-lg font-medium mt-2"
          style={{ 
            fontFamily: fonts.heading,
            color: style === "modern" ? "rgba(255,255,255,0.9)" : colors.secondary 
          }}
        >
          {about.role || "Software Engineer"}
        </p>
        <p 
          className="text-sm mt-3 leading-relaxed"
          style={{ 
            fontFamily: fonts.body,
            color: style === "modern" ? "rgba(255,255,255,0.8)" : colors.text 
          }}
        >
          {about.description || "Write a short summary about yourself."}
        </p>
      </div>

      {/* Body */}
      <div 
        className="px-6 py-5 space-y-6"
        style={{ fontFamily: fonts.body }}
      >
        {/* Skills */}
        {skills && skills.length > 0 && (
          <section>
            <h3 
              className="text-base font-bold mb-3"
              style={{ color: colors.primary }}
            >
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: `${colors.primary}20`,
                    color: colors.primary,
                    border: `1px solid ${colors.primary}40`,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section>
            <h3 
              className="text-base font-bold mb-3"
              style={{ color: colors.primary }}
            >
              Experience
            </h3>
            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div 
                  key={idx} 
                  className="rounded-lg p-4"
                  style={{
                    backgroundColor: `${colors.primary}10`,
                    borderLeft: `4px solid ${colors.accent}`,
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold" style={{ color: colors.text }}>
                        {exp.role}
                      </h4>
                      <p className="text-sm" style={{ color: colors.secondary }}>
                        {exp.company}
                      </p>
                    </div>
                    {exp.year && (
                      <span 
                        className="text-xs font-medium px-2 py-1 rounded"
                        style={{
                          backgroundColor: `${colors.accent}20`,
                          color: colors.accent,
                        }}
                      >
                        {exp.year}
                      </span>
                    )}
                  </div>
                  {exp.description && (
                    <p 
                      className="text-xs mt-2 leading-relaxed"
                      style={{ color: `${colors.text}CC` }}
                    >
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section>
            <h3 
              className="text-base font-bold mb-3"
              style={{ color: colors.primary }}
            >
              Projects
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="rounded-lg p-4"
                  style={{
                    backgroundColor: `${colors.secondary}10`,
                    border: `2px solid ${colors.secondary}30`,
                  }}
                >
                  <h4 className="font-bold" style={{ color: colors.text }}>
                    {proj.title}
                  </h4>
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-medium underline block mt-1"
                      style={{ color: colors.secondary }}
                    >
                      {proj.link}
                    </a>
                  )}
                  {proj.description && (
                    <p 
                      className="text-xs mt-2"
                      style={{ color: `${colors.text}CC` }}
                    >
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* References */}
        {references && references.length > 0 && (
          <section>
            <h3 
              className="text-base font-bold mb-3"
              style={{ color: colors.primary }}
            >
              References
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {references.map((ref, idx) => (
                <div
                  key={idx}
                  className="rounded-lg p-4"
                  style={{
                    backgroundColor: `${colors.accent}10`,
                    border: `2px solid ${colors.accent}30`,
                  }}
                >
                  <h4 className="font-bold" style={{ color: colors.text }}>
                    {ref.name}
                  </h4>
                  {ref.position && ref.company && (
                    <p 
                      className="text-xs mt-1"
                      style={{ color: colors.secondary }}
                    >
                      {ref.position} at {ref.company}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-3 text-xs mt-2">
                    {ref.email && (
                      <a
                        href={`mailto:${ref.email}`}
                        className="font-medium"
                        style={{ color: colors.accent }}
                      >
                        📧 {ref.email}
                      </a>
                    )}
                    {(ref.contactNo || ref.contact_no) && (
                      <span style={{ color: `${colors.text}CC` }}>
                        📞 {ref.contactNo || ref.contact_no}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <section>
          <h3 
            className="text-base font-bold mb-3"
            style={{ color: colors.primary }}
          >
            Contact
          </h3>
          <div className="flex flex-wrap gap-4 text-xs">
            {social.email && (
              <a
                href={`mailto:${social.email}`}
                className="font-medium"
                style={{ color: colors.accent }}
              >
                📧 {social.email}
              </a>
            )}
            {social.github && (
              <a
                href={social.github}
                target="_blank"
                rel="noreferrer"
                className="font-medium"
                style={{ color: colors.secondary }}
              >
                🔗 GitHub
              </a>
            )}
            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="font-medium"
                style={{ color: colors.secondary }}
              >
                💼 LinkedIn
              </a>
            )}
            {social.website && (
              <a
                href={social.website}
                target="_blank"
                rel="noreferrer"
                className="font-medium"
                style={{ color: colors.secondary }}
              >
                🌐 Website
              </a>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CustomTemplate;

