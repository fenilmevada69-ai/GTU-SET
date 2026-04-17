import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../lib/api';

interface ScanRecord {
  id: number;
  content: string;
  threat_type: string;
  risk_score: number;
  timestamp: string;
  reasoning: string;
}

const HistoryPage = () => {
  const [scans, setScans] = useState<ScanRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScans = async () => {
      try {
        const response = await api.get('/scans/stats');
        setScans(response.data.scans || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchScans();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="material-symbols-outlined text-secondary animate-spin text-5xl">refresh</span>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 lg:py-20">
      {/* Header Section */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-2">
           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">Neural Nexus / Registry</span>
           <div className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(93,230,255,0.6)] animate-pulse" />
        </div>
        <h1 className="text-4xl font-headline font-black tracking-tighter">Activity Logs</h1>
        <p className="text-on-surface-variant text-sm font-light mt-1">Real-time synthesis stream across all historical scanning sessions.</p>
      </section>

      {/* Filter Bar (Visual only for depth) */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-4 no-scrollbar">
          <FilterChip label="All Sessions" active />
          <FilterChip label="High Risk" />
          <FilterChip label="Phishing" />
          <FilterChip label="Simulations" />
      </div>

      {/* Execution Timeline */}
      <div className="space-y-6 relative">
        {/* Vertical Line Connector */}
        <div className="absolute left-[39px] top-6 bottom-6 w-[1px] bg-outline-variant/10 hidden md:block" />

        {scans.length > 0 ? (
          scans.map((scan, idx) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={scan.id} 
              className="flex flex-col md:flex-row gap-6 group"
            >
              {/* Date/Time Column */}
              <div className="md:w-20 pt-4 hidden md:block">
                 <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest leading-none">
                    {new Date(scan.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                 </p>
                 <p className="text-[9px] text-on-surface-variant/50 mt-1 font-mono">
                    {new Date(scan.timestamp).toLocaleDateString()}
                 </p>
              </div>

              {/* Status Indicator */}
              <div className="hidden md:flex items-start pt-4 relative z-10">
                 <div className={`w-4 h-4 rounded-full bg-background border-2 transition-transform group-hover:scale-125 ${
                    scan.risk_score > 7 ? 'border-error shadow-[0_0_10px_rgba(255,180,171,0.4)]' : 'border-tertiary shadow-[0_0_10px_rgba(78,222,163,0.4)]'
                 }`} />
              </div>

              {/* Log Card */}
              <div className="flex-1 neural-card p-6 bg-surface-container-low/50 hover:bg-surface-container-high transition-all cursor-pointer">
                 <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          scan.risk_score > 7 ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'
                       }`}>
                          <span className="material-symbols-outlined">
                             {scan.threat_type === 'Phishing' ? 'mail' : scan.threat_type === 'Malware' ? 'pest_control' : 'security'}
                          </span>
                       </div>
                       <div>
                          <h3 className="text-sm font-bold tracking-tight">{scan.threat_type} Analysis</h3>
                          <p className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest mt-0.5">ID: PROTOCOL-{scan.id.toString().slice(-4)}</p>
                       </div>
                    </div>
                    <div className={`text-[10px] font-black px-2 py-1 rounded border ${
                       scan.risk_score > 7 ? 'border-error/30 text-error bg-error/5' : 'border-tertiary/30 text-tertiary bg-tertiary/5'
                    }`}>
                       RISK: {scan.risk_score}/10
                    </div>
                 </div>

                 <div className="bg-surface-container-lowest/50 rounded-xl p-4 border border-outline-variant/5">
                    <p className="text-xs font-light text-on-surface-variant leading-relaxed">
                       {scan.reasoning.length > 150 ? scan.reasoning.substring(0, 150) + '...' : scan.reasoning}
                    </p>
                 </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="neural-card p-20 flex flex-col items-center justify-center opacity-30 grayscale">
             <span className="material-symbols-outlined text-6xl mb-4">history_toggle_off</span>
             <p className="font-bold tracking-widest uppercase">No Synthesis Records Found</p>
          </div>
        )}
      </div>

      {/* Load More Utility */}
      {scans.length > 5 && (
        <button className="w-full mt-10 py-4 rounded-xl bg-surface-container-high text-on-surface-variant text-[10px] font-bold uppercase tracking-[0.3em] border border-outline-variant/10 hover:bg-surface-container-highest transition-colors">
           Initialize Older Registry Fetch
        </button>
      )}
    </div>
  );
};

const FilterChip = ({ label, active = false }: { label: string, active?: boolean }) => (
  <button className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all border ${
    active ? 'bg-secondary text-on-secondary border-secondary' : 'bg-surface-container-low text-on-surface-variant border-outline-variant/10 hover:border-secondary/30'
  }`}>
    {label}
  </button>
);

export default HistoryPage;
