// Modern Template - Contemporary design with gradients
const Template2 = ({ portfolio, username }) => {
  const { about = {}, skills = [], experience = [], projects = [], social = {} } = portfolio || {};

  return (
    <div className="border border-slate-800 rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white">
      {/* Header */}
      <div className="px-6 py-6 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 backdrop-blur-sm border-b border-purple-500/30">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">
          {about.name || "Your Name"}
        </h1>
        <p className="text-lg text-purple-300 font-medium mt-2">{about.role || "Software Engineer"}</p>
        <p className="text-sm text-slate-300 mt-3 leading-relaxed">{about.description || "Write a short summary about yourself."}</p>
      </div>

      {/* Body */}
      <div className="px-6 py-5 space-y-6">
        {/* Skills */}
        {skills && skills.length > 0 && (
          <section>
            <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider mb-3">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs bg-purple-500/20 border border-purple-400/30 text-purple-200 backdrop-blur-sm"
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
            <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider mb-3">
              Experience
            </h3>
            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-purple-500/20">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-white">{exp.role}</h4>
                      <p className="text-purple-300 text-sm">{exp.company}</p>
                    </div>
                    {exp.year && <span className="text-xs text-slate-400">{exp.year}</span>}
                  </div>
                  {exp.description && (
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section>
            <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider mb-3">
              Projects
            </h3>
            <div className="space-y-3">
              {projects.map((proj, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-purple-500/20">
                  <h4 className="font-bold text-white">{proj.title}</h4>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" className="text-xs text-purple-300 hover:text-purple-200 hover:underline">
                      {proj.link}
                    </a>
                  )}
                  {proj.description && (
                    <p className="text-xs text-slate-300 mt-2">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <section>
          <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider mb-3">
            Contact
          </h3>
          <div className="flex flex-wrap gap-4 text-xs text-slate-300">
            {social.email && (
              <a href={`mailto:${social.email}`} className="hover:text-purple-300">
                {social.email}
              </a>
            )}
            {social.github && (
              <a href={social.github} target="_blank" rel="noreferrer" className="hover:text-purple-300">
                GitHub
              </a>
            )}
            {social.linkedin && (
              <a href={social.linkedin} target="_blank" rel="noreferrer" className="hover:text-purple-300">
                LinkedIn
              </a>
            )}
            {social.website && (
              <a href={social.website} target="_blank" rel="noreferrer" className="hover:text-purple-300">
                Website
              </a>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Template2;

