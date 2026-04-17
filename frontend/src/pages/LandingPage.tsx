import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';

const LandingPage = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    try {
      const response = await api.post('/scans/analyze', { content: input });
      navigate('/results', { state: { result: response.data } });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:py-32 overflow-hidden bg-white border-b border-outline">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Intelligence Protocol v4.0</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-7xl font-headline font-black tracking-tighter text-on-surface mb-6 leading-[1.05]"
          >
            Strengthen your defenses <br /> 
            with <span className="text-primary">Predictive AI.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-on-surface-variant text-lg lg:text-xl font-light max-w-2xl mb-12"
          >
            Instantly decode phishing attempts, analyze suspicious payloads, and identify social engineering patterns before they breach your network.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-3xl"
          >
            <form onSubmit={handleScan} className="neural-card p-2 bg-white shadow-xl">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste suspicious email, URL, or message content for deep inspection..."
                className="w-full h-40 p-6 bg-background rounded-lg border-none focus:ring-1 focus:ring-primary text-sm font-light resize-none placeholder:text-on-surface-variant/40"
              />
              <div className="p-4 flex items-center justify-between border-t border-outline mt-2">
                <div className="flex items-center gap-4 px-2">
                  <span className="material-symbols-outlined text-on-surface-variant/40 text-lg hover:text-primary transition-colors cursor-pointer">attach_file</span>
                  <span className="material-symbols-outlined text-on-surface-variant/40 text-lg hover:text-primary transition-colors cursor-pointer">link</span>
                  <span className="material-symbols-outlined text-on-surface-variant/40 text-lg hover:text-primary transition-colors cursor-pointer">photo_camera</span>
                </div>
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold tracking-tight shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all flex items-center gap-2"
                >
                  {loading ? (
                    <span className="material-symbols-outlined animate-spin">refresh</span>
                  ) : (
                    <>
                      <span>INITIATE ANALYSIS</span>
                      <span className="material-symbols-outlined text-lg">bolt</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Trust / Stats Section */}
      <section className="px-6 py-20 bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="p-8 rounded-2xl bg-white border border-outline shadow-sm">
              <span className="material-symbols-outlined text-primary text-3xl mb-4">memory</span>
              <h3 className="text-lg font-bold mb-2">Neural Synthesis</h3>
              <p className="text-on-surface-variant text-sm font-light">Advanced LLM-driven heuristics mapped against live threat intelligence databases for 99.8% precision.</p>
           </div>
           <div className="p-8 rounded-2xl bg-white border border-outline shadow-sm">
              <span className="material-symbols-outlined text-secondary text-3xl mb-4">hub</span>
              <h3 className="text-lg font-bold mb-2">Zero-Trust Protocol</h3>
              <p className="text-on-surface-variant text-sm font-light">Every input is sanitized in an isolated sandbox, ensuring zero cross-contamination for your core security layers.</p>
           </div>
           <div className="p-8 rounded-2xl bg-white border border-outline shadow-sm">
              <span className="material-symbols-outlined text-success text-3xl mb-4">verified_user</span>
              <h3 className="text-lg font-bold mb-2">Actionable Intelligence</h3>
              <p className="text-on-surface-variant text-sm font-light">We don't just find threats; we provide step-by-step containment playbooks and defense logic for each report.</p>
           </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
