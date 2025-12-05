import Template1 from "./templates/Template1";
import Template2 from "./templates/Template2";
import Template3 from "./templates/Template3";
import Template4 from "./templates/Template4";

const PortfolioPreview = ({ portfolio, username }) => {
  const theme = portfolio?.theme || "template1";
  // Always build the public URL from the current origin so it works in dev and prod
  const publicUrl = `${window.location.origin}/portfolio/${username}`;

  // Template mapping
  const templateComponents = {
    template1: Template1,
    template2: Template2,
    template3: Template3,
    template4: Template4,
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
        </div>
      </div>

      <div className="rounded-xl overflow-hidden bg-slate-950 p-2">
        <SelectedTemplate portfolio={portfolio} username={username} />
      </div>
    </div>
  );
};

export default PortfolioPreview;
