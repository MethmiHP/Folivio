// Creative Template - Bold and creative design
const Template4 = ({ portfolio, username }) => {
  const { about = {}, skills = [], experience = [], projects = [], social = {} } = portfolio || {};

  return (
    <div className="border-2 border-pink-500 rounded-xl overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 text-slate-900">
      {/* Header */}
      <div className="px-6 py-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
        <h1 className="text-3xl font-extrabold">{about.name || "Your Name"}</h1>
        <p className="text-lg font-semibold mt-2 text-pink-100">{about.role || "Software Engineer"}</p>
        <p className="text-sm mt-3 leading-relaxed text-pink-50">{about.description || "Write a short summary about yourself."}</p>
      </div>

      {/* Body */}
      <div className="px-6 py-5 space-y-6 bg-white/50">
        {/* Skills */}
        {skills && skills.length > 0 && (
          <section>
            <h3 className="text-base font-bold text-purple-600 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-sm"
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
            <h3 className="text-base font-bold text-purple-600 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
              Experience
            </h3>
            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={idx} className="bg-white rounded-lg p-4 shadow-md border-l-4 border-pink-500">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-slate-900">{exp.role}</h4>
                      <p className="text-purple-600 font-semibold text-sm">{exp.company}</p>
                    </div>
                    {exp.year && <span className="text-xs text-slate-500 font-semibold bg-pink-100 px-2 py-1 rounded">{exp.year}</span>}
                  </div>
                  {exp.description && (
                    <p className="text-xs text-slate-700 mt-2 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section>
            <h3 className="text-base font-bold text-purple-600 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
              Projects
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {projects.map((proj, idx) => (
                <div key={idx} className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg p-4 border-2 border-pink-300 shadow-sm">
                  <h4 className="font-bold text-slate-900">{proj.title}</h4>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" className="text-xs text-purple-600 hover:text-purple-800 font-semibold underline">
                      {proj.link}
                    </a>
                  )}
                  {proj.description && (
                    <p className="text-xs text-slate-700 mt-2">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <section>
          <h3 className="text-base font-bold text-purple-600 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
            Contact
          </h3>
          <div className="flex flex-wrap gap-4 text-xs text-slate-700 font-semibold">
            {social.email && (
              <a href={`mailto:${social.email}`} className="hover:text-pink-600 bg-pink-100 px-3 py-1 rounded-full">
                📧 {social.email}
              </a>
            )}
            {social.github && (
              <a href={social.github} target="_blank" rel="noreferrer" className="hover:text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                🔗 GitHub
              </a>
            )}
            {social.linkedin && (
              <a href={social.linkedin} target="_blank" rel="noreferrer" className="hover:text-pink-600 bg-pink-100 px-3 py-1 rounded-full">
                💼 LinkedIn
              </a>
            )}
            {social.website && (
              <a href={social.website} target="_blank" rel="noreferrer" className="hover:text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                🌐 Website
              </a>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Template4;

