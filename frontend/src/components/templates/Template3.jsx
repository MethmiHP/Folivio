// Minimal Template - Clean and minimalist approach
const Template3 = ({ portfolio, username }) => {
  const { about = {}, skills = [], experience = [], projects = [], social = {} } = portfolio || {};

  return (
    <div className="border border-slate-300 rounded-xl overflow-hidden bg-white text-slate-900">
      {/* Header */}
      <div className="px-6 py-6 border-b border-slate-200">
        <h1 className="text-2xl font-light text-slate-900 tracking-tight">{about.name || "Your Name"}</h1>
        <p className="text-sm text-slate-500 mt-1 font-light">{about.role || "Software Engineer"}</p>
        <p className="text-xs text-slate-600 mt-3 leading-relaxed max-w-2xl">{about.description || "Write a short summary about yourself."}</p>
      </div>

      {/* Body */}
      <div className="px-6 py-5 space-y-5 text-sm">
        {/* Skills */}
        {skills && skills.length > 0 && (
          <section>
            <h3 className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-3">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 text-xs text-slate-600 border border-slate-300 rounded-sm font-light"
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
            <h3 className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-3">
              Experience
            </h3>
            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={idx} className="border-l border-slate-200 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-normal text-slate-900">{exp.role}</h4>
                      <p className="text-xs text-slate-500">{exp.company}</p>
                    </div>
                    {exp.year && <span className="text-xs text-slate-400 font-light">{exp.year}</span>}
                  </div>
                  {exp.description && (
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed font-light">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section>
            <h3 className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-3">
              Projects
            </h3>
            <div className="space-y-3">
              {projects.map((proj, idx) => (
                <div key={idx} className="border-b border-slate-100 pb-3 last:border-0">
                  <h4 className="font-normal text-slate-900">{proj.title}</h4>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" className="text-xs text-slate-500 hover:text-slate-700 underline">
                      {proj.link}
                    </a>
                  )}
                  {proj.description && (
                    <p className="text-xs text-slate-600 mt-1 font-light">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <section>
          <h3 className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-3">
            Contact
          </h3>
          <div className="flex flex-wrap gap-4 text-xs text-slate-500 font-light">
            {social.email && (
              <a href={`mailto:${social.email}`} className="hover:text-slate-700">
                {social.email}
              </a>
            )}
            {social.github && (
              <a href={social.github} target="_blank" rel="noreferrer" className="hover:text-slate-700">
                GitHub
              </a>
            )}
            {social.linkedin && (
              <a href={social.linkedin} target="_blank" rel="noreferrer" className="hover:text-slate-700">
                LinkedIn
              </a>
            )}
            {social.website && (
              <a href={social.website} target="_blank" rel="noreferrer" className="hover:text-slate-700">
                Website
              </a>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Template3;

