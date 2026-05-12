import React from 'react';

const ProjectStats = ({ logs, activeProject, onProjectSelect }) => {
  const stats = logs.reduce((acc, log) => {
    acc[log.project] = (acc[log.project] || 0) + 1;
    return acc;
  }, {});

  // Tactical Toggle: If it's already active, clicking resets it to 'All'
  const handleSelect = (projectName) => {
    onProjectSelect(activeProject === projectName ? 'All' : projectName);
  };

  return (
    <div>
      <div className="flex justify-between items-end mb-6">
        <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Projects</h3>
        {activeProject !== 'All' && (
          <button 
            onClick={() => onProjectSelect('All')}
            className="text-[9px] font-mono text-zinc-500 hover:text-red-400 uppercase tracking-wider"
          >
            Reset Filter
          </button>
        )}
      </div>

      <div className="space-y-5">
        {Object.entries(stats).map(([name, count]) => {
          const isActive = activeProject === name;

          return (
            <div 
              key={name} 
              onClick={() => handleSelect(name)}
              className={`group cursor-pointer p-2 -mx-2 rounded-lg transition-all border ${
                isActive 
                  ? 'bg-white/5 border-zinc-700 shadow-[0_0_15px_rgba(255,255,255,0.03)]' 
                  : 'border-transparent hover:bg-white/5'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className={`text-xs font-mono transition-colors ${
                  isActive ? 'text-white font-bold' : 'text-zinc-400 group-hover:text-zinc-200'
                }`}>
                  {name}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-colors ${
                  isActive 
                    ? 'bg-zinc-800 text-white border-zinc-600' 
                    : 'bg-zinc-900 text-zinc-500 border-zinc-800 group-hover:border-zinc-700'
                }`}>
                  {count}
                </span>
              </div>
              
              <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${
                    isActive ? 'bg-white' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min((count / logs.length) * 100, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectStats;