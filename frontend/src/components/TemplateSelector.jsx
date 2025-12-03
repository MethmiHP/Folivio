const TemplateSelector = ({ templates, selected, onSelect }) => {
  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
      <h2 className="text-sm font-semibold mb-3">Templates</h2>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {templates.length === 0 && (
          <>
            {/* Fallback templates if DB empty */}
            {["template1", "template2", "template3"].map((id) => (
              <button
                key={id}
                onClick={() => onSelect(id)}
                className={`min-w-[120px] h-24 rounded-xl border text-xs flex flex-col justify-center items-center ${
                  selected === id
                    ? "border-indigo-500 bg-indigo-500/10"
                    : "border-slate-700 bg-slate-900"
                }`}
              >
                <span className="font-medium capitalize">{id}</span>
                <span className="text-[10px] text-slate-400">
                  built-in template
                </span>
              </button>
            ))}
          </>
        )}
        {templates.map((tpl) => (
          <button
            key={tpl._id}
            onClick={() => onSelect(tpl.identifier || tpl.name)}
            className={`min-w-[140px] h-28 rounded-xl border text-xs flex flex-col justify-between items-stretch ${
              selected === tpl.identifier || selected === tpl.name
                ? "border-indigo-500 bg-indigo-500/10"
                : "border-slate-700 bg-slate-900"
            }`}
          >
            <div className="px-2 pt-2 text-left">
              <div className="font-semibold text-[11px]">{tpl.name}</div>
              {tpl.isPremium && (
                <div className="text-[10px] text-amber-400 mt-0.5">Premium</div>
              )}
            </div>
            <div className="text-[10px] text-slate-500 px-2 pb-2">
              {tpl.identifier}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
