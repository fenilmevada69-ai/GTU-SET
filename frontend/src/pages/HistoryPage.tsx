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
    <div className="min-h-screen flex items-center justify-center bg-background">
      <span className="material-symbols-outlined text-primary animate-spin text-5xl">refresh</span>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 lg:py-20">
      {/* Header Section */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-2">
           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">CyberAware / Registry</span>
           <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        </div>
        <h1 className="text-4xl font-headline font-black tracking-tighter text-on-surface">Activity Timeline</h1>
        <p className="text-on-surface-variant text-sm font-medium mt-1">Audit log of all neural synthesis and scanning sessions.</p>
      </section>

      {/* Filter Bar (Visual only for depth) */}
      <div className="flex gap-3 mb-10 overflow-x-auto pb-4 no-scrollbar">
          <FilterChip label="All Sessions" active />
          <FilterChip label="Critical Only" />
          <FilterChip label="Safe Validations" />
          <FilterChip label="Training Sessions" />
      </div>

      {/* Execution Timeline */}
      <div className="space-y-8 relative">
        {/* Vertical Line Connector */}
        <div className="absolute left-[31px] top-6 bottom-6 w-px bg-outline hidden md:block" />

        {scans.length > 0 ? (
          scans.map((scan, idx) => (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={scan.id} 
              className="flex flex-col md:flex-row gap-6 group"
            >
              {/* Date/Time Column */}
              <div className="md:w-16 pt-3 hidden md:block text-right">
                 <p className="text-[10px] font-black text-on-surface uppercase tracking-widest leading-none">
                    {new Date(scan.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                 </p>
                 <p className="text-[10px] text-on-surface-variant/70 mt-1 uppercase font-bold tracking-tighter">
                    {new Date(scan.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                 </p>
              </div>

              {/* Status Indicator Circle */}
              <div className="hidden md:flex items-start pt-3.5 relative z-10">
                 <div className={`w-3 h-3 rounded-full bg-white border-2 transition-transform group-hover:scale-125 ${
                    scan.risk_score > 7 ? 'border-error shadow-[0_0_8px_rgba(244,63,94,0.3)]' : 'border-success shadow-[0_0_8px_rgba(16,185,129,0.3)]'
                 }`} />
              </div>

              {/* Log Card */}
              <div className="flex-1 neural-card p-6 bg-white hover:border-primary/30 transition-all cursor-pointer">
                 <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          scan.risk_score > 7 ? 'bg-error/5 text-error' : 'bg-primary/5 text-primary'
                       }`}>
                          <span className="material-symbols-outlined text-lg">
                             {scan.threat_type === 'Phishing' ? 'mail' : scan.threat_type === 'Malware' ? 'pest_control' : 'security'}
                          </span>
                       </div>
                       <div>
                          <h3 className="text-sm font-bold tracking-tight text-on-surface">{scan.threat_type} Analysis</h3>
                          <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-[0.2em] mt-0.5">Report ID: PROTO-{scan.id.toString().slice(-4)}</p>
                       </div>
                    </div>
                    <div className={`text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest border ${
                       scan.risk_score > 7 ? 'border-error/20 text-error bg-error/5' : 'border-success/20 text-success bg-success/5'
                    }`}>
                       RATING: {scan.risk_score}/10
                    </div>
                 </div>

                 <div className="bg-background rounded-xl p-4 border border-outline/50 group-hover:bg-primary/5 transition-colors">
                    <p className="text-xs font-medium text-on-surface-variant leading-relaxed line-clamp-2">
                       {scan.reasoning}
                    </p>
                 </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-outline border-dashed">
             <span className="material-symbols-outlined text-4xl text-on-surface-variant/20 mb-4">history_toggle_off</span>
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant">No Registry Records Found</p>
          </div>
        )}
      </div>

      {/* Pagination Placeholder */}
      <div className="mt-12 flex justify-center">
         <button className="px-8 py-3 rounded-xl bg-white border border-outline text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant hover:text-primary transition-colors shadow-sm">
            Fetch Historical Records
         </button>
      </div>
    </div>
  );
};

const FilterChip = ({ label, active = false }: { label: string, active?: boolean }) => (
  <button className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${
    active ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-white text-on-surface-variant border-outline hover:border-primary/50'
  }`}>
    {label}
  </button>
);

export default HistoryPage;
