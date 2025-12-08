import Template1 from "../components/templates/Template1";
import Template2 from "../components/templates/Template2";
import Template3 from "../components/templates/Template3";
import Template4 from "../components/templates/Template4";
import Template5 from "../components/templates/Template5";
import { getPublicUrl, isLocalhost } from "../utils/getPublicUrl";

const PortfolioPreview = ({ portfolio, username }) => {
  const theme = portfolio?.theme || "template1";
  const publicUrl = getPublicUrl(`/portfolio/${username}`);

  // Template mapping
  const templateComponents = {
    template1: Template1,
    template2: Template2,
    template3: Template3,
    template4: Template4,
    template5: Template5,
  };

  const SelectedTemplate = templateComponents[theme] || Template1;

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-sm font-semibold">Live Preview</h2>
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
          {isLocalhost() && !import.meta.env.VITE_PUBLIC_URL && (
            <span className="text-[10px] text-amber-400 mt-1 max-w-[200px] text-right">
              ⚠️ Set VITE_PUBLIC_URL in .env for network access
            </span>
          )}
        </div>
      </div>

      <div className="rounded-xl overflow-hidden bg-slate-950 p-2">
        <SelectedTemplate portfolio={portfolio} username={username} />
      </div>
    </div>
  );
};

export default PortfolioPreview;
