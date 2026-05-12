import React, { useState } from 'react';

const ErrorCard = ({ log }) => {
  const [isOpen, setIsOpen] = useState(false);

  const severityStyles = {
    critical: "border-l-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]",
    warning: "border-l-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.1)]",
    info: "border-l-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.1)]",
  };

  return (
    <div 
      onClick={() => setIsOpen(!isOpen)}
      className={`bg-[#111113] border border-zinc-800 border-l-[3px] rounded-lg p-4 mb-2 cursor-pointer transition-all hover:bg-[#18181b] hover:translate-x-1 ${severityStyles[log.severity] || severityStyles.critical}`}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-mono text-[13px] font-semibold text-white truncate max-w-[400px]">
              {log.message}
            </h3>
            {log.count > 1 && (
              <span className="text-[10px] font-mono bg-red-500/10 text-red-400 border border-red-500/20 px-1.5 rounded">
                {log.count}×
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[11px] font-mono text-zinc-500">{log.url}</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
              log.method === 'POST' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
            }`}>
              {log.method}
            </span>
            <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded border border-zinc-700">
              {log.project}
            </span>
          </div>
        </div>
        <button className="text-[10px] font-mono text-zinc-500 border border-zinc-800 px-2.5 py-2 mt-1  rounded hover:text-red-500 hover:border-red-500 transition-colors">
          {isOpen ? 'HIDE TRACE' : 'STACK TRACE'}
        </button>
      </div>

      {isOpen && (
        <div className="mt-4 animate-in fade-in slide-in-from-top-1">
          <pre className="text-[11px] font-mono p-3 bg-black rounded border border-zinc-800 text-zinc-400 leading-relaxed overflow-x-auto">
            {log.stack}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ErrorCard;