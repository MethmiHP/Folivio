// Classic Template - Traditional professional layout
const Template1 = ({ portfolio, username }) => {
  const { about = {}, skills = [], experience = [], projects = [], social = {} } = portfolio || {};

  return (
    <div className="border border-slate-800 rounded-xl overflow-hidden bg-white text-slate-900">
      {/* Header */}
      <div className="px-6 py-5 border-b-2 border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
        <h1 className="text-2xl font-bold text-slate-900">{about.name || "Your Name"}</h1>
        <p className="text-lg text-indigo-600 font-medium mt-1">{about.role || "Software Engineer"}</p>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">{about.description || "Write a short summary about yourself."}</p>
      </div>

      {/* Body */}
      <div className="px-6 py-5 space-y-6 text-sm">
        {/* Skills */}
        {skills && skills.length > 0 && (
          <section>
            <h3 className="text-base font-bold text-slate-900 mb-3 border-b-2 border-indigo-500 pb-1 inline-block">
              Technical Skills
            </h3>
            <div className="flex flex-wrap gap-2 mt-3">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-md text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 font-medium"
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
            <h3 className="text-base font-bold text-slate-900 mb-3 border-b-2 border-indigo-500 pb-1 inline-block">
              Professional Experience
            </h3>
            <div className="space-y-4 mt-3">
              {experience.map((exp, idx) => (
                <div key={idx} className="border-l-4 border-indigo-500 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-slate-900">{exp.role}</h4>
                      <p className="text-indigo-600 font-medium">{exp.company}</p>
                    </div>
                    {exp.year && <span className="text-xs text-slate-500 font-medium">{exp.year}</span>}
                  </div>
                  {exp.description && (
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section>
            <h3 className="text-base font-bold text-slate-900 mb-3 border-b-2 border-indigo-500 pb-1 inline-block">
              Projects
            </h3>
            <div className="space-y-3 mt-3">
              {projects.map((proj, idx) => (
                <div key={idx} className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                  <h4 className="font-bold text-slate-900">{proj.title}</h4>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" className="text-xs text-indigo-600 hover:underline">
                      {proj.link}
                    </a>
                  )}
                  {proj.description && (
                    <p className="text-xs text-slate-600 mt-1">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <section>
          <h3 className="text-base font-bold text-slate-900 mb-3 border-b-2 border-indigo-500 pb-1 inline-block">
            Contact
          </h3>
          <div className="flex flex-wrap gap-4 text-xs text-slate-600 mt-3">
            {social.email && (
              <a href={`mailto:${social.email}`} className="hover:text-indigo-600">
                📧 {social.email}
              </a>
            )}
            {social.github && (
              <a href={social.github} target="_blank" rel="noreferrer" className="hover:text-indigo-600">
                🔗 GitHub
              </a>
            )}
            {social.linkedin && (
              <a href={social.linkedin} target="_blank" rel="noreferrer" className="hover:text-indigo-600">
                💼 LinkedIn
              </a>
            )}
            {social.website && (
              <a href={social.website} target="_blank" rel="noreferrer" className="hover:text-indigo-600">
                🌐 Website
              </a>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Template1;

