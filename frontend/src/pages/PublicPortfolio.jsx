import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import Template1 from "../components/templates/Template1";
import Template2 from "../components/templates/Template2";
import Template3 from "../components/templates/Template3";
import Template4 from "../components/templates/Template4";

const templateComponents = {
  template1: Template1,
  template2: Template2,
  template3: Template3,
  template4: Template4,
};

const PublicPortfolio = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPortfolio = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get(`/portfolio/${username}`);
        setUser(res.data.user);
        setPortfolio(res.data.portfolio);
      } catch (err) {
        setError(err.response?.data?.message || "Portfolio not found");
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchPortfolio();
    }
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 flex items-center justify-center">
        <div className="text-slate-400">Loading portfolio...</div>
      </div>
    );
  }

  if (error || !portfolio || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 flex items-center justify-center">
        <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-8 text-center text-white space-y-4">
          <h1 className="text-2xl font-semibold">Portfolio not found</h1>
          <p className="text-slate-400">{error || "This portfolio is unavailable."}</p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium"
          >
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const SelectedTemplate = templateComponents[portfolio.theme] || Template1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="text-center text-white space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">Portfolio of</p>
          <h1 className="text-4xl font-bold">{user.name || user.username}</h1>
          <p className="text-slate-300">See how {user.name?.split(" ")[0] || user.username} presents their work.</p>
        </header>

        <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-4 shadow-2xl shadow-indigo-900/30">
          <SelectedTemplate portfolio={portfolio} username={user.username} />
        </div>
      </div>
    </div>
  );
};

export default PublicPortfolio;


