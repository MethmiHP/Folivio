const PortfolioPreview = ({ portfolio, username }) => {
  const { about = {}, skills = [], experience = [], projects = [], social = {} } =
    portfolio || {};

  const publicUrl = `${import.meta.env.VITE_FRONTEND_BASE_URL}/${username}`;

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-sm font-semibold">Preview</h2>
        <div className="flex flex-col items-end gap-1">
          <span className="text-[11px] text-slate-500">Public URL</span>
          <a
            href={publicUrl}
            target="_blank"
            className="text-[11px] text-indigo-400 hover:underline break-all"
            rel="noreferrer"
          >
            {publicUrl}
          </a>
        </div>
      </div>

      <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          <h1 className="text-xl font-semibold">{about.name || "Your Name"}</h1>
          <p className="text-sm text-indigo-300 mt-1">
            {about.role || "Software Engineer"}
          </p>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            {about.description ||
              "Write a short summary about yourself, your tech stack, and what kind of work you enjoy."}
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5 text-sm">
          {/* Skills */}
          {skills && skills.length > 0 && (
            <section>
              <h3 className="uppercase tracking-[0.16em] text-[11px] text-slate-400 mb-2">
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-full text-[11px] bg-slate-900 border border-slate-700"
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
              <h3 className="uppercase tracking-[0.16em] text-[11px] text-slate-400 mb-2">
                Experience
              </h3>
              <div className="space-y-3">
                {experience.map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-medium text-slate-100">
                        {exp.role}
                      </span>
                      <span className="text-slate-400">{exp.year}</span>
                    </div>
                    <div className="text-xs text-slate-400">
                      {exp.company}
                    </div>
                    {exp.description && (
                      <p className="text-[11px] text-slate-400 mt-1">
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
              <h3 className="uppercase tracking-[0.16em] text-[11px] text-slate-400 mb-2">
                Selected Projects
              </h3>
              <div className="space-y-3">
                {projects.map((proj, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-800 rounded-lg px-3 py-2.5 bg-slate-950/60"
                  >
                    <div className="flex justify-between gap-3 items-center">
                      <div>
                        <div className="text-xs font-semibold">
                          {proj.title}
                        </div>
                        {proj.link && (
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] text-indigo-400 hover:underline break-all"
                          >
                            {proj.link}
                          </a>
                        )}
                      </div>
                    </div>
                    {proj.description && (
                      <p className="text-[11px] text-slate-400 mt-1">
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
            <h3 className="uppercase tracking-[0.16em] text-[11px] text-slate-400 mb-2">
              Contact
            </h3>
            <div className="flex flex-wrap gap-3 text-[11px] text-slate-400">
              {social.email && (
                <a href={`mailto:${social.email}`} className="hover:text-indigo-400">
                  {social.email}
                </a>
              )}
              {social.github && (
                <a href={social.github} target="_blank" rel="noreferrer" className="hover:text-indigo-400">
                  GitHub
                </a>
              )}
              {social.linkedin && (
                <a href={social.linkedin} target="_blank" rel="noreferrer" className="hover:text-indigo-400">
                  LinkedIn
                </a>
              )}
              {social.website && (
                <a href={social.website} target="_blank" rel="noreferrer" className="hover:text-indigo-400">
                  Website
                </a>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPreview;
