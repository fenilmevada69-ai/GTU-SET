import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ResultsPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const result = state?.result;

  if (!result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
        <div className="text-center space-y-4">
           <span className="material-symbols-outlined text-6xl text-on-surface-variant/20">search_off</span>
           <h2 className="text-xl font-bold tracking-tight">No Synthesis Data</h2>
           <p className="text-on-surface-variant text-sm mb-6">Initialize a new scan to generate neural threat analytics.</p>
           <Link to="/" className="inline-block bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20">Return to Scanner</Link>
        </div>
      </div>
    );
  }

  const getRiskColor = (score: number) => {
    if (score > 7) return 'text-error border-error/20 bg-error/5';
    if (score > 4) return 'text-warning border-warning/20 bg-warning/5';
    return 'text-success border-success/20 bg-success/5';
  };

  const getRiskBadge = (score: number) => {
    if (score > 7) return 'High Criticality';
    if (score > 4) return 'Medium Risk';
    return 'Low / Verified Safe';
  };

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Synthesis Terminal / Analysis</span>
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
           </div>
           <h1 className="text-4xl font-headline font-black tracking-tighter text-on-surface">Analysis Report</h1>
           <p className="text-on-surface-variant text-sm font-medium mt-1 uppercase tracking-widest">Protocol ID: SEC-{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
        </div>
        
        <div className="flex items-center gap-3 no-print">
           <button onClick={() => window.print()} className="bg-white border border-outline px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-background transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">print</span>
              <span>Export</span>
           </button>
           <button onClick={() => navigate('/')} className="bg-primary text-white px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">add</span>
              <span>New Scan</span>
           </button>
        </div>
      </header>

      {/* Primary Discovery Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="neural-card overflow-hidden"
      >
        <div className="p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
             <div className="lg:col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left pt-2">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant mb-4">Neural Risk Score</p>
                <div className={`text-6xl font-black mb-4 ${result.risk_score > 7 ? 'text-error' : result.risk_score > 4 ? 'text-warning' : 'text-success'}`}>
                   {result.risk_score}/10
                </div>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getRiskColor(result.risk_score)}`}>
                   {getRiskBadge(result.risk_score)}
                </div>
             </div>
             
             <div className="lg:col-span-3 space-y-6">
                <div className="flex items-center gap-3">
                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${result.risk_score > 7 ? 'bg-error/10 text-error' : 'bg-success/10 text-success'}`}>
                      <span className="material-symbols-outlined text-2xl">
                         {result.threat_type === 'Safe' ? 'verified_user' : 'report'}
                      </span>
                   </div>
                   <h2 className="text-2xl font-black text-on-surface tracking-tight">{result.threat_type} Pattern Identified</h2>
                </div>
                
                <div className="bg-background rounded-2xl p-8 border border-outline/50 relative">
                   <span className="absolute top-4 right-6 text-[10px] font-black text-primary/30 uppercase tracking-[0.3em]">AI Synthesis</span>
                   <p className="text-on-surface-variant text-lg font-light leading-relaxed italic">
                      "{result.reasoning}"
                   </p>
                </div>
             </div>
          </div>
        </div>
      </motion.div>

      {/* Recommendations & Logic */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="neural-card p-10">
            <h3 className="text-sm font-black uppercase tracking-widest mb-8 flex items-center gap-3">
               <span className="material-symbols-outlined text-primary">terminal</span>
               Analysis Heuristics
            </h3>
            <div className="space-y-6">
               <LogicStep label="Signal Detection" status="Verified" />
               <LogicStep label="Phonetic Impersonation" status={result.risk_score > 7 ? 'High Match' : 'Normal'} />
               <LogicStep label="Metadata Anomalies" status={result.risk_score > 4 ? 'Suspicious' : 'Clean'} />
               <LogicStep label="LLM Reasoning Phase" status="Complete" />
            </div>
         </div>

         <div className="neural-card p-10 bg-primary/[0.02] border-primary/10">
            <h3 className="text-sm font-black uppercase tracking-widest mb-8 flex items-center gap-3">
               <span className="material-symbols-outlined text-primary">rule</span>
               Actionable Playbook
            </h3>
            <ul className="space-y-4">
               {result.recommendations.map((rec: string, idx: number) => (
                 <li key={idx} className="flex items-start gap-4 group">
                    <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                       <span className="text-[10px] font-bold">{idx + 1}</span>
                    </div>
                    <span className="text-sm font-medium text-on-surface leading-loose group-hover:text-primary transition-colors">{rec}</span>
                 </li>
               ))}
            </ul>
         </div>
      </div>
    </div>
  );
};

const LogicStep = ({ label, status }: { label: string, status: string }) => (
  <div className="flex items-center justify-between py-1 border-b border-outline/30">
     <span className="text-xs font-medium text-on-surface-variant uppercase tracking-widest">{label}</span>
     <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{status}</span>
  </div>
);

export default ResultsPage;
