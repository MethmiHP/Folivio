// Greenary Template (Green & Teal Theme)
const Template5 = ({ portfolio, username }) => {
    const { about = {}, skills = [], experience = [], projects = [], social = {} } =
      portfolio || {};
  
    return (
      <div className="border-2 border-green-500 rounded-xl overflow-hidden bg-gradient-to-br from-green-900 to-teal-900 text-white shadow-xl">
        {/* Header */}
        <div className="px-6 py-6 bg-gradient-to-r from-green-700 to-teal-600 text-white">
          <h1 className="text-3xl font-extrabold">{about.name || "Your Name"}</h1>
          <p className="text-lg font-semibold mt-2 text-green-100">
            {about.role || "Software Engineer"}
          </p>
          <p className="text-sm mt-3 leading-relaxed text-green-50">
            {about.description || "Write a short summary about yourself."}
          </p>
        </div>
  
        {/* Body */}
        <div className="px-6 py-5 space-y-6 bg-white/10 backdrop-blur-sm text-white">
          {/* Skills */}
          {skills?.length > 0 && (
            <section>
              <h3 className="text-base font-bold text-teal-300 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Skills
              </h3>
  
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
  
          {/* Experience */}
          {experience?.length > 0 && (
            <section>
              <h3 className="text-base font-bold text-teal-300 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Experience
              </h3>
  
              <div className="space-y-4">
                {experience.map((exp, idx) => (
                  <div
                    key={idx}
                    className="bg-white/10 rounded-lg p-4 shadow-md border-l-4 border-green-500 backdrop-blur-sm"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold">{exp.role}</h4>
                        <p className="text-teal-300 font-semibold text-sm">
                          {exp.company}
                        </p>
                      </div>
  
                      {exp.year && (
                        <span className="text-xs text-white font-semibold bg-green-600/70 px-2 py-1 rounded">
                          {exp.year}
                        </span>
                      )}
                    </div>
  
                    {exp.description && (
                      <p className="text-xs text-green-100 mt-2 leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
  
          {/* Projects */}
          {projects?.length > 0 && (
            <section>
              <h3 className="text-base font-bold text-teal-300 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Projects
              </h3>
  
              <div className="grid grid-cols-1 gap-3">
                {projects.map((proj, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-r from-green-800/40 to-teal-800/40 rounded-lg p-4 border-2 border-green-500 shadow-sm"
                  >
                    <h4 className="font-bold">{proj.title}</h4>
  
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-teal-200 hover:text-white font-semibold underline"
                      >
                        {proj.link}
                      </a>
                    )}
  
                    {proj.description && (
                      <p className="text-xs text-green-100 mt-2">
                        {proj.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
  
          {/* Contact */}
          <section>
            <h3 className="text-base font-bold text-teal-300 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              Contact
            </h3>
  
            <div className="flex flex-wrap gap-4 text-xs font-semibold">
              {social.email && (
                <a
                  href={`mailto:${social.email}`}
                  className="hover:text-green-300 bg-green-700/40 px-3 py-1 rounded-full"
                >
                  📧 {social.email}
                </a>
              )}
  
              {social.github && (
                <a
                  href={social.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-teal-300 bg-teal-700/40 px-3 py-1 rounded-full"
                >
                  🔗 GitHub
                </a>
              )}
  
              {social.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-green-300 bg-green-700/40 px-3 py-1 rounded-full"
                >
                  💼 LinkedIn
                </a>
              )}
  
              {social.website && (
                <a
                  href={social.website}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-teal-300 bg-teal-700/40 px-3 py-1 rounded-full"
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
  
  export default Template5;
  