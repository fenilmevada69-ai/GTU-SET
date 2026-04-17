import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  if (!result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <span className="material-symbols-outlined text-error text-6xl mb-4">error_outline</span>
        <h2 className="text-2xl font-bold mb-2">No Synthesis Data</h2>
        <p className="text-on-surface-variant mb-6">Redirecting to scanner interface...</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold"
        >
          BACK TO HUB
        </button>
      </div>
    );
  }

  const getRiskColor = (score: number) => {
    if (score >= 8) return 'text-error';
    if (score >= 4) return 'text-amber-300';
    return 'text-tertiary';
  };

  const layers = [
    { label: 'Layer 1: Metadata Signature', status: 'SYNTHESIZED' },
    { label: 'Layer 2: LLM Content Analysis', status: 'SYNTHESIZED' },
    { label: 'Layer 3: Heuristic Pattern Match', status: 'SYNTHESIZED' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 lg:py-20 relative">
      <div className="no-print mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">Neural Report / {result.id.toString().slice(-6)}</span>
              <div className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(93,230,255,0.6)] animate-pulse" />
           </div>
           <h1 className="text-4xl font-headline font-black tracking-tighter">Analysis Terminal</h1>
        </div>
        <div className="flex gap-3">
           <button 
             onClick={() => window.print()}
             className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-surface-container-high text-on-surface text-sm font-bold border border-outline-variant/10 hover:bg-surface-container-highest transition-colors"
           >
             <span className="material-symbols-outlined text-lg">download</span>
             DOWNLOAD PDF
           </button>
           <button 
             onClick={() => navigate('/')}
             className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-secondary text-on-secondary text-sm font-bold hover:shadow-[0_0_20px_rgba(93,230,255,0.3)] transition-all"
           >
             <span className="material-symbols-outlined text-lg">refresh</span>
             NEW SCAN
           </button>
        </div>
      </div>

      {/* Main Analysis Results */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Risk Dashboard */}
        <div className="space-y-6">
          <div className="neural-card p-8 text-center relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
             <p className="text-xs font-label text-on-surface-variant uppercase tracking-widest mb-2 font-bold opacity-60">Composite Risk Score</p>
             <h2 className={`text-8xl font-black tracking-tighter ${getRiskColor(result.risk_score)} mb-2`}>
                {result.risk_score}<span className="text-3xl opacity-30">/10</span>
             </h2>
             <div className="flex justify-center mt-4">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] border border-current ${getRiskColor(result.risk_score)}`}>
                   {result.risk_level} SEVERITY
                </span>
             </div>
          </div>

          <div className="neural-card p-6">
             <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">data_object</span>
                Threat Classification
             </h3>
             <div className="space-y-4">
                <div className="flex justify-between items-center mb-1">
                   <span className="text-lg font-bold text-on-surface tracking-tight">{result.threat_type}</span>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-mid text-xs font-light text-on-surface-variant leading-relaxed border border-outline-variant/5">
                   {result.reasoning}
                </div>
             </div>
          </div>
        </div>

        {/* Right Column: Neural DAG & Actionables */}
        <div className="lg:col-span-2 space-y-6">
           {/* DAG Visualization Snippet */}
           <div className="neural-card p-6 bg-surface-container-mid/30 relative">
              <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-8 font-label">Synthesis Pipeline</h3>
              <div className="relative flex flex-col gap-10 pl-6">
                 {/* Vertical line connector */}
                 <div className="absolute left-[31px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-secondary/50 via-primary/30 to-tertiary/20" />
                 
                 {layers.map((layer, idx) => (
                    <div key={idx} className="relative flex items-center gap-6 group">
                       <div className="w-4 h-4 rounded-full bg-background border-4 border-secondary shadow-[0_0_10px_rgba(93,230,255,0.4)] z-10 transition-transform group-hover:scale-125" />
                       <div className="flex-1 p-3 px-4 rounded-xl bg-surface-container-highest/50 border border-outline-variant/10">
                          <div className="flex justify-between items-center">
                             <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">{layer.label}</span>
                             <span className="text-[9px] font-bold text-tertiary uppercase tracking-tighter bg-tertiary/5 px-2 py-0.5 rounded-md">STATUS: {layer.status}</span>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Priority Playbook */}
           <div className="neural-card p-8 border-l-4 border-l-secondary">
              <h3 className="text-sm font-bold tracking-[0.2em] text-secondary uppercase mb-6 flex items-center gap-3">
                 <span className="material-symbols-outlined">menu_book</span>
                 Actionable Playbook
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.recommendations.map((rec: string, idx: number) => (
                  <div key={idx} className="p-4 rounded-xl bg-surface-container-high/50 flex items-start gap-4 border border-outline-variant/5 group hover:bg-surface-container-highest transition-colors">
                     <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-secondary text-lg">check</span>
                     </div>
                     <span className="text-sm font-light leading-relaxed text-on-surface-variant group-hover:text-on-surface transition-colors">
                        {rec}
                     </span>
                  </div>
                ))}
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default ResultsPage;
