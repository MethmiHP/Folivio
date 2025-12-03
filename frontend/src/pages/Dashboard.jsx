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

  // Load existing portfolio + templates
  useEffect(() => {
    const fetchData = async () => {
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
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleTemplateChange = (identifierOrId) => {
    handleChange({ theme: identifierOrId, templateId: null });
  };

  const handleDownloadPdf = async () => {
    try {
      const res = await api.get(`/pdf/${user.username}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${user.username}-portfolio.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      alert("Failed to generate PDF");
    }
  };

  if (!portfolio) {
    return (
      <div className="text-slate-400 mt-10 text-center">Loading portfolio...</div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-3">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Dashboard</h1>
          <p className="text-sm text-slate-400">
            Edit your content and preview your portfolio in real-time.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 font-medium text-sm"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
          <button
            onClick={handleDownloadPdf}
            className="px-4 py-2 rounded-md border border-slate-700 hover:border-indigo-500 text-sm"
          >
            Download PDF
          </button>
        </div>
      </div>

      <TemplateSelector
        templates={templates}
        selected={portfolio.theme}
        onSelect={handleTemplateChange}
      />

      <div className="grid md:grid-cols-2 gap-6 items-start">
        <PortfolioForm portfolio={portfolio} onChange={handleChange} />
        <PortfolioPreview portfolio={portfolio} username={user.username} />
      </div>
    </div>
  );
};

export default Dashboard;
