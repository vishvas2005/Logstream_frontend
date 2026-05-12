import { TriangleAlert } from 'lucide-react';
import React from 'react';

const StatCard = ({ label, value, subtext, color, Icon , text }) => (
    <div className="flex-1 w-[290px] bg-white/5 border border-zinc-800 backdrop-blur-md rounded-xl p-4 relative overflow-hidden group hover:border-zinc-700 transition-all">
    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-2">{label}</p>
    <h2 className={`text-[32px] font-mono font-bold leading-none ${color}`}>{value}</h2>
    <p className='font-mono text-[11px] text-zinc-600 pt-1'>{text}</p>
    
    <p className="text-[10px] font-mono text-zinc-600 mt-1">{subtext}</p>
    <div className="absolute top-4 right-4 opacity-30 group-hover:opacity-100 transition-opacity">
    {Icon}
    </div>
    <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r 
      ${color === 'text-red-500' ? 'from-red-500' : 
        color === 'text-amber-500' ? 'from-amber-500' : 
        'from-emerald-500'} to-transparent`} 
    />
  </div>
);

export default StatCard;