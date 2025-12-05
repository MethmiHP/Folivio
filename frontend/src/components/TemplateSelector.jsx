const TemplateSelector = ({ templates, selected, onSelect }) => {
  // Template preview colors for visual representation
  const getTemplatePreview = (identifier) => {
    const previews = {
      template1: {
        bg: "bg-gradient-to-br from-slate-50 to-slate-100",
        accent: "border-indigo-500",
        name: "Classic",
      },
      template2: {
        bg: "bg-gradient-to-br from-purple-900 to-indigo-900",
        accent: "border-purple-500",
        name: "Modern",
      },
      template3: {
        bg: "bg-white",
        accent: "border-slate-300",
        name: "Minimal",
      },
      template4: {
        bg: "bg-gradient-to-br from-pink-50 to-purple-50",
        accent: "border-pink-500",
        name: "Creative",
      },
    };
    return previews[identifier] || previews.template1;
  };

  // Default templates if none from API
  const defaultTemplates = [
    { _id: "t1", name: "Classic", identifier: "template1", isPremium: false },
    { _id: "t2", name: "Modern", identifier: "template2", isPremium: false },
    { _id: "t3", name: "Minimal", identifier: "template3", isPremium: false },
    { _id: "t4", name: "Creative", identifier: "template4", isPremium: false },
  ];

  const displayTemplates = templates.length > 0 ? templates : defaultTemplates;

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
      <h2 className="text-sm font-semibold mb-4 text-white">Choose Template</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {displayTemplates.map((tpl) => {
          const preview = getTemplatePreview(tpl.identifier);
          const isSelected = selected === tpl.identifier;
          
          return (
            <button
              key={tpl._id || tpl.identifier}
              onClick={() => onSelect(tpl.identifier)}
              className={`relative rounded-xl border-2 overflow-hidden transition-all transform hover:scale-105 ${
                isSelected
                  ? `${preview.accent} border-2 shadow-lg shadow-indigo-500/20`
                  : "border-slate-700 hover:border-slate-600"
              }`}
            >
              {/* Preview Box */}
              <div className={`h-24 ${preview.bg} relative`}>
                {/* Mini preview elements */}
                <div className="absolute inset-0 p-2">
                  <div className="h-2 bg-slate-700/30 rounded w-3/4 mb-1"></div>
                  <div className="h-1 bg-slate-700/20 rounded w-1/2 mb-2"></div>
                  <div className="flex gap-1">
                    <div className="h-1.5 w-1.5 bg-slate-700/30 rounded-full"></div>
                    <div className="h-1.5 w-1.5 bg-slate-700/30 rounded-full"></div>
                    <div className="h-1.5 w-1.5 bg-slate-700/30 rounded-full"></div>
                  </div>
                </div>
                
                {/* Selected indicator */}
                {isSelected && (
                  <div className="absolute top-1 right-1">
                    <div className="w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Template Info */}
              <div className="p-2 bg-slate-950/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">{tpl.name || preview.name}</span>
                  {tpl.isPremium && (
                    <span className="text-[10px] text-amber-400">⭐</span>
                  )}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">{tpl.identifier}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateSelector;
