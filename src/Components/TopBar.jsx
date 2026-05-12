import React, { useState } from 'react';

const Topbar = ({ logCount, status }) => {
  const [activeTab, setActiveTab] = useState('stream');

  return (
    <header className="h-16 px-6 bg-[#111113] border-b border-zinc-800 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
      <div className="flex items-center gap-4 w-1/4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-800 flex items-center justify-center shadow-[0_0_12px_rgba(239,68,68,0.3)]">
            <span className="text-white text-sm">⚡</span>
          </div>
          <h1 className="font-mono font-bold text-xl tracking-tighter hidden sm:block">
            <span className="text-red-500">Log</span>Stream
          </h1>
        </div>
        <div className="flex items-center gap-2 px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-emerald-500 text-[9px] font-bold tracking-widest uppercase">{status}</span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 w-1/4">
        <div className="hidden lg:flex flex-col items-end">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse absolute -mr-1 mt-1"></span>
          <span className="w-52 text-zinc-500 font-mono text-[10px] uppercase">
          Socket connected .  ws://logs.internal </span>
        </div>
        <div className="h-6 w-[1px] bg-zinc-800 hidden lg:block"></div>
        <div className="text-zinc-400 font-mono text-[11px]">
          {new Date().toLocaleTimeString([], { hour12: false })}
        </div>
      </div>
    </header>
  );
};

// Helper Component for the Nav Buttons
const NavButton = ({ active, icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`
      flex items-center gap-2 px-3 py-1 rounded-lg transition-all duration-200
      ${active 
        ? 'bg-red-500/10 text-red-500 border border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]' 
        : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
      }
    `}
  >
    <span className="text-sm">{icon}</span>
    <span className="text-[10px] font-bold uppercase tracking-wider hidden md:block">{label}</span>
  </button>
);

export default Topbar;