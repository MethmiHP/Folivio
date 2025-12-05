import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import PortfolioForm from "../components/PortfolioForm";
import PortfolioPreview from "../components/PortfolioPreview";
import TemplateSelector from "../components/TemplateSelector";

const Dashboard = () => {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [saving, setSaving] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiText, setAiText] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  // Load existing portfolio + templates
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      try {
        const [pRes, tRes] = await Promise.all([
          api.get("/portfolio/me"),
          api.get("/templates"),
        ]);
        
        // If no portfolio returned, create a default object
        setPortfolio(
          pRes.data && Object.keys(pRes.data).length
            ? pRes.data
            : {
                about: {
                  name: user?.name || "",
                  role: "Software Engineer",
                  description: "",
                  profileImage: "",
                },
                skills: [],
                experience: [],
                projects: [],
                social: { email: user?.email || "" },
                theme: "template1",
              }
        );
        setTemplates(tRes.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    
    if (user) fetchData();
  }, [user]);

  const handleChange = (updated) => {
    setPortfolio((prev) => ({ ...prev, ...updated }));
  };

  const handleSave = async () => {
    if (!portfolio) return;
    setSaving(true);
    try {
      const res = await api.post("/portfolio", portfolio);
      setPortfolio(res.data);
      alert("Portfolio saved successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to save portfolio");
    } finally {
      setSaving(false);
    }
  };

  const handleTemplateChange = async (identifierOrId) => {
    // Update local state immediately for instant preview
    handleChange({ theme: identifierOrId, templateId: null });
    
    // Auto-save the template selection
    try {
      await api.post("/portfolio", { ...portfolio, theme: identifierOrId, templateId: null });
    } catch (err) {
      console.error("Failed to save template selection:", err);
      // Don't show alert for auto-save failures, user can manually save
    }
  };

  const handleAiGenerate = async () => {
    if (!aiText.trim()) return;
    setAiLoading(true);
    try {
      const res = await api.post("/ai/portfolio", { cvText: aiText });
      // Merge AI data into current portfolio
      setPortfolio((prev) => ({
        ...prev,
        ...res.data,
      }));
      setAiOpen(false);
      setAiText("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "AI generation failed");
    } finally {
      setAiLoading(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!user?.username) {
      alert("User information not available");
      return;
    }
    
    try {
      const res = await api.get(`/pdf/${user.username}`, {
        responseType: "blob",
      });
      
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${user.username}-resume.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to generate PDF. Please try again.");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 flex items-center justify-center">
        <div className="text-slate-400 text-center">Please log in to access your dashboard.</div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 flex items-center justify-center">
        <div className="text-slate-400 text-center">Loading portfolio...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950">
      <div className="w-full px-6 py-6">
        <div className="space-y-6">
          {/* Top bar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold mb-1 text-white">Portfolio Builder</h1>
              <p className="text-sm text-slate-300">
                Edit your sections on the left and see a live preview on the right.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 justify-end">
              <button
                type="button"
                onClick={() => setAiOpen(true)}
                className="px-4 py-2 rounded-lg border border-slate-600/50 bg-slate-800/30 backdrop-blur-sm text-xs md:text-sm text-slate-200 hover:border-purple-500 hover:bg-slate-800/50 hover:text-white transition-all"
              >
                AI Generate
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-60 font-medium text-xs md:text-sm text-white shadow-lg shadow-purple-900/30 transition-all"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={handleDownloadPdf}
                className="px-4 py-2 rounded-lg border border-slate-600/50 bg-slate-800/30 backdrop-blur-sm hover:border-purple-500 hover:bg-slate-800/50 text-xs md:text-sm text-white transition-all"
              >
                Download PDF
              </button>
            </div>
          </div>

          {/* AI panel */}
          {aiOpen && (
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-2xl p-4 space-y-3 shadow-xl">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold text-white">AI Portfolio Generator</h2>
                  <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                    Paste your CV, LinkedIn summary, or a short description of your
                    experience. We&apos;ll draft About, Skills, Experience and Projects
                    for you. You can edit everything afterwards.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAiOpen(false)}
                  className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Close
                </button>
              </div>
              <textarea
                rows={4}
                value={aiText}
                onChange={(e) => setAiText(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-3 py-2 text-sm text-slate-100 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                placeholder="Paste your CV, summary, or write a few bullet points about your experience..."
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleAiGenerate}
                  disabled={aiLoading || !aiText.trim()}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-60 text-xs md:text-sm font-medium text-white shadow-lg shadow-purple-900/30 transition-all"
                >
                  {aiLoading ? "Generating..." : "Generate Sections"}
                </button>
              </div>
            </div>
          )}

          {/* Template chooser */}
          <TemplateSelector
            templates={templates}
            selected={portfolio.theme}
            onSelect={handleTemplateChange}
          />

          {/* Main editor grid */}
          <div className="grid lg:grid-cols-2 gap-6 items-start">
            <PortfolioForm portfolio={portfolio} onChange={handleChange} />
            <PortfolioPreview portfolio={portfolio} username={user.username} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
