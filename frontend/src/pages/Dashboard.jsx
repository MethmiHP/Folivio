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
  const [aiDesignText, setAiDesignText] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [showAllTemplates, setShowAllTemplates] = useState(false);

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
      const res = await api.post("/ai/portfolio", { 
        cvText: aiText,
        designDescription: aiDesignText.trim() || undefined,
      });
      // Merge AI data into current portfolio
      setPortfolio((prev) => ({
        ...prev,
        ...res.data,
      }));
      setAiOpen(false);
      setAiText("");
      setAiDesignText("");
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

  // Get templates to display (4 by default, all if expanded)
  const displayedTemplates = showAllTemplates ? templates : templates.slice(0, 4);
  const hasMoreTemplates = templates.length > 4;

  if (!user) {
    return (
      <div className="h-full w-full bg-gradient-to-br from-blue-950 via-slate-900 to-teal-950 flex items-center justify-center">
        <div className="text-slate-400 text-center">Please log in to access your dashboard.</div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="h-full w-full bg-gradient-to-br from-blue-950 via-slate-900 to-teal-950 flex items-center justify-center">
        <div className="text-slate-400 text-center">Loading portfolio...</div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-950 via-slate-900 to-teal-950 overflow-y-auto">
      <div className="space-y-6">
        {/* Top bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 pt-6">
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
              className="px-4 py-2 rounded-lg border border-slate-600/50 bg-slate-800/30 backdrop-blur-sm text-xs md:text-sm text-slate-200 hover:border-teal-500 hover:bg-slate-800/50 hover:text-white transition-all"
            >
              AI Generate
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 disabled:opacity-60 font-medium text-xs md:text-sm text-white shadow-lg shadow-teal-900/30 transition-all"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={handleDownloadPdf}
              className="px-4 py-2 rounded-lg border border-slate-600/50 bg-slate-800/30 backdrop-blur-sm hover:border-teal-500 hover:bg-slate-800/50 text-xs md:text-sm text-white transition-all"
            >
              Download PDF
            </button>
          </div>
        </div>

        {/* AI panel */}
        {aiOpen && (
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-2xl p-4 space-y-4 shadow-xl mx-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-white">AI Portfolio Generator</h2>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                  Describe your content and design preferences. We&apos;ll create a custom portfolio with your content and design it according to your vision.
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
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">
                  Content (Required)
                </label>
                <textarea
                  rows={4}
                  value={aiText}
                  onChange={(e) => setAiText(e.target.value)}
                  className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-3 py-2 text-sm text-slate-100 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all resize-none"
                  placeholder="Paste your CV, LinkedIn summary, or describe your experience, skills, projects..."
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">
                  Design Description (Optional)
                </label>
                <textarea
                  rows={3}
                  value={aiDesignText}
                  onChange={(e) => setAiDesignText(e.target.value)}
                  className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-3 py-2 text-sm text-slate-100 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all resize-none"
                  placeholder="Describe your design vision: e.g., 'Modern dark theme with blue accents', 'Minimalist design with pastel colors', 'Bold creative layout with gradients'..."
                />
                <p className="text-[10px] text-slate-500 mt-1">
                  Leave empty to use a default template, or describe your preferred colors, style, and layout.
                </p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleAiGenerate}
                disabled={aiLoading || !aiText.trim()}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 disabled:opacity-60 text-xs md:text-sm font-medium text-white shadow-lg shadow-teal-900/30 transition-all"
              >
                {aiLoading ? "Generating..." : aiDesignText.trim() ? "Generate Custom Design" : "Generate Portfolio"}
              </button>
            </div>
          </div>
        )}

        {/* Template chooser */}
        <div className="px-6">
          <TemplateSelector
            templates={displayedTemplates}
            selected={portfolio.theme}
            onSelect={handleTemplateChange}
          />
          {hasMoreTemplates && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowAllTemplates(!showAllTemplates)}
                className="px-6 py-2 rounded-lg border border-slate-600/50 bg-slate-800/30 backdrop-blur-sm text-sm text-slate-200 hover:border-teal-500 hover:bg-slate-800/50 hover:text-white transition-all"
              >
                {showAllTemplates ? "Show Less" : `See More Templates (${templates.length - 4} more)`}
              </button>
            </div>
          )}
        </div>

        {/* Main editor grid */}
        <div className="grid lg:grid-cols-2 gap-6 items-start px-6 pb-6">
          <PortfolioForm portfolio={portfolio} onChange={handleChange} />
          <PortfolioPreview portfolio={portfolio} username={user.username} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;