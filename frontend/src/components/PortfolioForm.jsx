const emptyExperience = { company: "", role: "", year: "", description: "" };
const emptyProject = { title: "", description: "", link: "", image: "" };
const emptyReference = { name: "", company: "", position: "", contact_no: "", Email: "" };

const PortfolioForm = ({ portfolio, onChange }) => {
  const handleField = (section, field, value) => {
    onChange({
      [section]: {
        ...(portfolio[section] || {}),
        [field]: value,
      },
    });
  };

  const handleListChange = (key, index, field, value) => {
    const list = [...(portfolio[key] || [])];
    list[index] = { ...list[index], [field]: value };
    onChange({ [key]: list });
  };

  const addListItem = (key, template) => {
    const list = [...(portfolio[key] || [])];
    list.push(template);
    onChange({ [key]: list });
  };

  const removeListItem = (key, index) => {
    const list = [...(portfolio[key] || [])];
    list.splice(index, 1);
    onChange({ [key]: list });
  };

  const skillsStr = (portfolio.skills || []).join(", ");
  const handleSkillsChange = (value) => {
    const skills = value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    onChange({ skills });
  };

  const about = portfolio.about || {};
  const social = portfolio.social || {};
  const experience = portfolio.experience || [];
  const projects = portfolio.projects || [];
  const references = portfolio.references || [];

  // Common input styles
  const inputClass = "w-full bg-slate-950/50 border border-slate-700/50 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all";
  const textareaClass = "w-full bg-slate-950/50 border border-slate-700/50 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none";

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 space-y-4">
      <h2 className="text-sm font-semibold mb-1 text-white">Content</h2>

      {/* About */}
      <section className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-semibold text-slate-300">About</h3>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <div>
            <label className="text-[11px] text-slate-400">Name</label>
            <input
              className={inputClass}
              value={about.name || ""}
              onChange={(e) => handleField("about", "name", e.target.value)}
            />
          </div>
          <div>
            <label className="text-[11px] text-slate-400">Role / Title</label>
            <input
              className={inputClass}
              value={about.role || ""}
              onChange={(e) => handleField("about", "role", e.target.value)}
            />
          </div>
          <div>
            <label className="text-[11px] text-slate-400">
              Short description
            </label>
            <textarea
              className={textareaClass}
              rows={3}
              value={about.description || ""}
              onChange={(e) =>
                handleField("about", "description", e.target.value)
              }
            />
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="space-y-2">
        <h3 className="text-xs font-semibold text-slate-300">Skills</h3>
        <div>
          <label className="text-[11px] text-slate-400">
            Skills (comma separated)
          </label>
          <input 
            className={inputClass}
            value={skillsStr} 
            onChange={(e) => handleSkillsChange(e.target.value)} 
          />
        </div>
      </section>

      {/* Experience */}
      <section className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-semibold text-slate-300">Experience</h3>
          <button
            type="button"
            onClick={() => addListItem("experience", emptyExperience)}
            className="text-[11px] px-2 py-1 rounded-md border border-slate-700 hover:border-indigo-500 text-slate-300 transition-colors"
          >
            + Add
          </button>
        </div>
        {experience.length === 0 && (
          <p className="text-[11px] text-slate-500">
            Add your internships, jobs, or freelancing experience.
          </p>
        )}
        <div className="space-y-3">
          {experience.map((exp, idx) => (
            <div
              key={idx}
              className="border border-slate-800 rounded-xl p-3 space-y-2 bg-slate-950/30"
            >
              <div className="flex justify-between items-center">
                <span className="text-[11px] text-slate-400">Position #{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => removeListItem("experience", idx)}
                  className="text-[11px] text-red-400 hover:text-red-300"
                >
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-400">Company</label>
                  <input
                    className={inputClass}
                    value={exp.company || ""}
                    onChange={(e) =>
                      handleListChange("experience", idx, "company", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400">Role</label>
                  <input
                    className={inputClass}
                    value={exp.role || ""}
                    onChange={(e) =>
                      handleListChange("experience", idx, "role", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400">Year</label>
                  <input
                    className={inputClass}
                    value={exp.year || ""}
                    onChange={(e) =>
                      handleListChange("experience", idx, "year", e.target.value)
                    }
                  />
                </div>
              </div>
              <div>
                <label className="text-[11px] text-slate-400">Description</label>
                <textarea
                  className={textareaClass}
                  rows={2}
                  value={exp.description || ""}
                  onChange={(e) =>
                    handleListChange(
                      "experience",
                      idx,
                      "description",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-semibold text-slate-300">Projects</h3>
          <button
            type="button"
            onClick={() => addListItem("projects", emptyProject)}
            className="text-[11px] px-2 py-1 rounded-md border border-slate-700 hover:border-indigo-500 text-slate-300 transition-colors"
          >
            + Add
          </button>
        </div>
        {projects.length === 0 && (
          <p className="text-[11px] text-slate-500">
            Showcase your best 3–5 projects with links.
          </p>
        )}
        <div className="space-y-3">
          {projects.map((proj, idx) => (
            <div
              key={idx}
              className="border border-slate-800 rounded-xl p-3 space-y-2 bg-slate-950/30"
            >
              <div className="flex justify-between items-center">
                <span className="text-[11px] text-slate-400">Project #{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => removeListItem("projects", idx)}
                  className="text-[11px] text-red-400 hover:text-red-300"
                >
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-400">Title</label>
                  <input
                    className={inputClass}
                    value={proj.title || ""}
                    onChange={(e) =>
                      handleListChange("projects", idx, "title", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400">
                    Link (GitHub / live)
                  </label>
                  <input
                    className={inputClass}
                    value={proj.link || ""}
                    onChange={(e) =>
                      handleListChange("projects", idx, "link", e.target.value)
                    }
                  />
                </div>
              </div>
              <div>
                <label className="text-[11px] text-slate-400">Description</label>
                <textarea
                  className={textareaClass}
                  rows={2}
                  value={proj.description || ""}
                  onChange={(e) =>
                    handleListChange(
                      "projects",
                      idx,
                      "description",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social */}
      <section className="space-y-2">
        <h3 className="text-xs font-semibold text-slate-300">
          Links & Contact
        </h3>
        <div className="grid grid-cols-1 gap-2">
          <div>
            <label className="text-[11px] text-slate-400">Email</label>
            <input
              className={inputClass}
              value={social.email || ""}
              onChange={(e) => handleField("social", "email", e.target.value)}
            />
          </div>
          <div>
            <label className="text-[11px] text-slate-400">GitHub</label>
            <input
              className={inputClass}
              value={social.github || ""}
              onChange={(e) => handleField("social", "github", e.target.value)}
            />
          </div>
          <div>
            <label className="text-[11px] text-slate-400">LinkedIn</label>
            <input
              className={inputClass}
              value={social.linkedin || ""}
              onChange={(e) => handleField("social", "linkedin", e.target.value)}
            />
          </div>
          <div>
            <label className="text-[11px] text-slate-400">
              Personal website
            </label>
            <input
              className={inputClass}
              value={social.website || ""}
              onChange={(e) => handleField("social", "website", e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* References */}
      <section className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-semibold text-slate-300">References</h3>
          <button
            type="button"
            onClick={() => addListItem("references", emptyReference)}
            className="text-[11px] px-2 py-1 rounded-md border border-slate-700 hover:border-indigo-500 text-slate-300 transition-colors"
          >
            + Add
          </button>
        </div>
        {references.length === 0 && (
          <p className="text-[11px] text-slate-500">
            Add references from previous managers, mentors, or clients.
          </p>
        )}
        <div className="space-y-3">
          {references.map((ref, idx) => (
            <div
              key={idx}
              className="border border-slate-800 rounded-xl p-3 space-y-2 bg-slate-950/30"
            >
              <div className="flex justify-between items-center">
                <span className="text-[11px] text-slate-400">
                  Reference #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeListItem("references", idx)}
                  className="text-[11px] text-red-400 hover:text-red-300"
                >
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-400">Name</label>
                  <input
                    className={inputClass}
                    value={ref.name || ""}
                    onChange={(e) =>
                      handleListChange("references", idx, "name", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400">Company</label>
                  <input
                    className={inputClass}
                    value={ref.company || ""}
                    onChange={(e) =>
                      handleListChange(
                        "references",
                        idx,
                        "company",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400">Position</label>
                  <input
                    className={inputClass}
                    value={ref.position || ""}
                    onChange={(e) =>
                      handleListChange(
                        "references",
                        idx,
                        "position",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400">
                    Contact No
                  </label>
                  <input
                    className={inputClass}
                    value={ref.contact_no || ref.contactNo || ""}
                    onChange={(e) =>
                      handleListChange(
                        "references",
                        idx,
                        "contactNo",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
              <div>
                <label className="text-[11px] text-slate-400">Email</label>
                <input
                  className={inputClass}
                  value={ref.Email || ref.email || ""}
                  onChange={(e) =>
                    handleListChange(
                      "references",
                      idx,
                      "email",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PortfolioForm;