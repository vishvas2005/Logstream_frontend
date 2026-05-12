import React, { useState, useEffect, act } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { TriangleAlert, Layers, Clock, Wifi, Funnel } from 'lucide-react';

import ErrorCard from './Components/ErrorCard';
import TopBar from './Components/TopBar';
import StatCard from './Components/StatCard';
import ProjectStats from './Components/ProjectStats';
import SeverityList from './Components/SeverityList';

const socket = io('http://localhost:5000');

function App() {
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState('connecting');
  const [filter, setFilter] = useState('All');
  const[activeProject , setActiveProject] = useState('All')
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/logs');
        setLogs(res.data);
      } catch (err) {
        console.error("Failed to fetch tactical logs:", err);
      }
    };
    fetchLogs();

    socket.on('connect', () => setStatus('online'));
    socket.on('new-log', (newLog) => {
      setLogs((prev) => [newLog, ...prev]); 
    });

    return () => socket.off('new-log');
  }, []);

  const filteredLogs = logs.filter(l => {
    const severityMatch = filter === 'All' || l.severity === filter.toLowerCase();
    const projectMatch = activeProject ===  'All' || l.project === activeProject;
    return severityMatch && projectMatch;
});

  return (
    /* CRITICAL FIX: h-screen instead of min-h-screen, and added overflow-hidden */
    <div className="h-screen overflow-hidden bg-[#09090b] text-white flex flex-col font-sans selection:bg-red-500/30">
      
      <div className="flex-shrink-0">
        <TopBar logCount={logs.length} status={status} />
      </div>
      
      <main className="flex-1 max-w-[1440px] mx-auto w-full flex flex-col p-6 overflow-hidden">
        
        {/* CRITICAL FIX: Added flex-shrink-0 so the stats stay fixed at the top */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 flex-shrink-0">
          <StatCard 
            label="Total Errors (24hr)" 
            value={logs.length} 
            color="text-red-500" 
            text={`↑ ${logs.filter(l => l.severity === 'critical').length} critical active`}
            Icon={<TriangleAlert color="#cf1717" size={20} />}
          />
          <StatCard
            label="Critical" 
            value={logs.filter(l => l.severity === 'critical').length} 
            color="text-amber-500" 
            text="all systems nominal"
            Icon={<Layers color="#F59E0B" size={20} />}
          />
          <StatCard 
            label="Active Projects" 
            value={[...new Set(logs.map(l => l.project))].length} 
            color="text-emerald-500" 
            text="last 100 incidents"
            Icon={<Clock size={20} />}
          />
          <StatCard 
            label="Socket Status" 
            value={status === 'online' ? 'Online' : 'Connecting'} 
            color="text-emerald-500" 
            text="latency: 12ms · us-east-1"
            Icon={<Wifi color="#10B981" size={20} />}
          />
        </section>

        <div className="flex-1 flex gap-6 overflow-hidden">
          
          <section className="flex-[3] flex flex-col bg-[#111113] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
            
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-black/20 flex-shrink-0">
              <div className="flex gap-2">
                <p className='flex gap-1 font-mono text-[12px] pt-[5px] text-zinc-400'> <span className='text-[10px] pt-[1.4px] '><Funnel size={14} strokeWidth={1.75} /></span> Filter</p>
                {['All', 'Critical', 'Warning', 'Info'].map(sev => (
                  <button 
                    key={sev}
                    onClick={() => setFilter(sev)}
                    className={`text-[10px] font-mono px-3 py-1.5 rounded-md border transition-all ${
                      filter === sev 
                      ? 'bg-white/10 border-zinc-500 text-white shadow-[0_0_10px_rgba(255,255,255,0.05)]' 
                      : 'border-zinc-800 text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {sev.toUpperCase()}
                  </button>
                ))}
              </div>
              <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                showing {filteredLogs.length} events
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 relative feed-container">
              <div className="scan-line absolute inset-x-0 h-20 bg-gradient-to-b from-transparent via-red-500/[0.03] to-transparent pointer-events-none" />
              
              {filteredLogs.length > 0 ? (
                filteredLogs.map(log => (
                  <ErrorCard key={log._id} log={log} />
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-zinc-600 font-mono text-sm space-y-2 opacity-50">
                  <div className="animate-pulse text-2xl">📡</div>
                  <p>Waiting for incoming transmission...</p>
                </div>
              )}
            </div>
          </section>

          {/* CRITICAL FIX: Changed custom-scrollbar to feed-container to match CSS */}
          <aside className="flex-1 max-w-[300px] bg-[#111113] border border-zinc-800 rounded-2xl p-6 flex flex-col gap-8 overflow-y-auto feed-container">
            <ProjectStats logs={logs} activeProject={activeProject} onProjectSelect={setActiveProject}/>
            <div className="h-[1px] bg-zinc-800 my-2 flex-shrink-0" />
            <SeverityList logs={logs} />
          </aside>

        </div>
      </main>
    </div>
  );
}

export default App;