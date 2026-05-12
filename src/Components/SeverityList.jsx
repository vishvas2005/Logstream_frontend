import React from 'react';

const SeverityList = ({ logs }) => {
  const getCount = (sev) => logs.filter(l => l.severity === sev).length;

  const data = [
    { label: 'Critical', count: getCount('critical'), color: 'bg-red-500' },
    { label: 'Warning', count: getCount('warning'), color: 'bg-amber-500' },
    { label: 'Info', count: getCount('info'), color: 'bg-blue-500' },
  ];

  return (
    <div>
      <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-6">Severity</h3>
      <div className="space-y-4">
        {data.map(item => (
          <div key={item.label} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${item.color} shadow-[0_0_8px_rgba(0,0,0,0.5)]`} />
              <span className="text-xs text-zinc-400">{item.label}</span>
            </div>
            <span className="text-xs font-mono text-zinc-300 font-bold">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeverityList;