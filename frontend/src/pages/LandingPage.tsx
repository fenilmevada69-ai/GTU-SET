import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import api from '../lib/api';

const LandingPage = () => {
  const [content, setContent] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const navigate = useNavigate();

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }

    setIsScanning(true);
    try {
      const response = await api.post('/scans/analyze', { content });
      setTimeout(() => {
        navigate('/results', { state: { result: response.data } });
      }, 2000); 
    } catch (err) {
      console.error(err);
      setIsScanning(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 lg:py-24 relative z-10">
      {/* Hero Section */}
      <div className="mb-16 lg:mb-24">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="space-y-4"
        >
          <div className="flex items-center gap-2 mb-4">
             <span className="text-secondary text-xs font-label font-bold uppercase tracking-[0.2em]">Neural Nexus / Cybersecurity</span>
             <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_rgba(93,230,255,0.6)]" />
          </div>
          <h1 className="text-5xl lg:text-7xl font-headline font-extrabold tracking-tighter leading-[1.1] max-w-4xl">
             Detect threats. <br />
             <span className="text-primary-container">Strengthen defences.</span>
          </h1>
          <p className="text-on-surface-variant text-lg lg:text-xl max-w-2xl font-light leading-relaxed">
            A sentient AI interface designed to decode digital deception in real-time. Paste your suspicious communications below.
          </p>
        </motion.div>
      </div>

      {/* Main Scanner Box - Neural Entry */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative max-w-4xl mx-auto group"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-tertiary/20 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
        
        <div className="relative bg-surface-container-high/90 backdrop-blur-2xl border border-outline-variant/20 rounded-2xl p-6 lg:p-10 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-secondary text-2xl">shield_search</span>
            <span className="text-sm font-label font-bold uppercase tracking-widest text-on-surface-variant">Neural Threat Analyzer</span>
          </div>

          <form onSubmit={handleScan}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe your threat or paste suspicious content here..."
              className="w-full h-48 bg-transparent border-none focus:ring-0 text-xl lg:text-2xl placeholder:text-on-surface-variant/30 resize-none mb-8 font-light"
              disabled={isScanning}
            />
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="flex gap-3">
                <SampleButton label="Phishing" onClick={() => setContent("URGENT: Your account has been suspended. Click here to verify: secure-login-bank.com/auth")} />
                <SampleButton label="Social Engineering" onClick={() => setContent("Hi! This is Sarah from HR. We need your SSN to update the Q1 payroll system immediately. Thanks!")} />
              </div>
              
              <button 
                type="submit"
                disabled={isScanning || !content}
                className={`flex items-center gap-3 px-10 py-4 rounded-xl font-bold transition-all ${
                  isScanning ? 'bg-surface-container-highest cursor-wait text-on-surface-variant' : 'bg-primary text-on-primary hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(192,193,255,0.3)] active:scale-95'
                }`}
              >
                {isScanning ? (
                  <>
                    <span className="material-symbols-outlined animate-spin">refresh</span>
                    <span>SYNTHESIZING...</span>
                  </>
                ) : (
                  <>
                    <span>INITIATE SCAN</span>
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Scan Pulse Overlay */}
          {isScanning && (
            <motion.div 
              initial={{ left: '0%' }}
              animate={{ left: '100%' }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              className="absolute top-0 bottom-0 w-1 bg-secondary shadow-[0_0_15px_rgba(93,230,255,0.8)] z-30"
            />
          )}
        </div>
      </motion.div>

      {/* Feature Bento Grid Snippet */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">
        <NeuralFeature 
          icon="bolt" 
          title="Instant Synthesis" 
          desc="GPT-4o powered analysis flags complex threats in under 1.2 seconds."
          color="text-primary"
        />
        <NeuralFeature 
          icon="visibility" 
          title="Optical Depth" 
          desc="Understand the 'Why' behind every threat with plain-English reasoning."
          color="text-secondary"
        />
        <NeuralFeature 
          icon="security" 
          title="Active Protocol" 
          desc="Get actionable playbooks to mitigate high-severity risks immediately."
          color="text-tertiary"
        />
      </div>
    </div>
  );
};

const SampleButton = ({ label, onClick }: { label: string, onClick: () => void }) => (
  <button 
    type="button" 
    onClick={onClick} 
    className="text-[10px] font-bold uppercase tracking-widest bg-surface-container-mid px-3 py-1.5 rounded-full border border-outline-variant/10 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-all"
  >
    {label}
  </button>
);

const NeuralFeature = ({ icon, title, desc, color }: { icon: string, title: string, desc: string, color: string }) => (
  <div className="neural-card p-8 group hover:bg-surface-container-high transition-colors">
    <div className={`mb-6 w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center transition-transform group-hover:scale-110 ${color}`}>
      <span className="material-symbols-outlined text-3xl">{icon}</span>
    </div>
    <h3 className="text-lg font-bold mb-2 tracking-tight">{title}</h3>
    <p className="text-on-surface-variant text-sm leading-relaxed font-light">{desc}</p>
  </div>
);

export default LandingPage;
