import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';

interface LoginPageProps {
  setAuth: (auth: boolean) => void;
}

const LoginPage = ({ setAuth }: LoginPageProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleQuickDemo = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/auth/demo-login');
      localStorage.setItem('token', response.data.access_token);
      setAuth(true);
      navigate('/dashboard');
    } catch (err) {
      setError('Neural handshaking failed. Please try traditional access.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const response = await api.post(endpoint, formData);
      localStorage.setItem('token', response.data.access_token);
      setAuth(true);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Authentication sequence failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      {/* Background Blobs */}
      <div className="glow-blob top-1/4 left-1/4 w-96 h-96 bg-primary/10" />
      <div className="glow-blob bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10" />

      <div className="max-w-md w-full relative z-10">
        <center className="mb-10">
           <div className="w-16 h-16 rounded-2xl bg-surface-container-high flex items-center justify-center mb-4 border border-outline-variant/10 shadow-2xl">
              <span className="material-symbols-outlined text-4xl text-secondary animate-pulse">fingerprint</span>
           </div>
           <h1 className="text-3xl font-headline font-black tracking-tighter text-on-surface">Neural Access Hub</h1>
           <p className="text-on-surface-variant text-sm font-light mt-1 uppercase tracking-widest">Identify Yourself to Continue</p>
        </center>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="neural-card p-8 lg:p-10 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)] bg-surface-container-low/90 backdrop-blur-2xl"
        >
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-error/10 border border-error/20 flex items-start gap-3">
              <span className="material-symbols-outlined text-error text-lg">dangerous</span>
              <p className="text-xs text-error font-medium leading-relaxed">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-1">Identity Handle</label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-lg group-focus-within:text-primary transition-colors">person</span>
                <input 
                  type="text" 
                  placeholder="Username"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="w-full bg-surface-container-lowest border border-outline-variant/10 rounded-xl py-3.5 pl-12 pr-4 text-sm focus:ring-1 focus:ring-primary focus:border-primary/50 transition-all placeholder:text-on-surface-variant/30 font-light"
                />
              </div>
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-1">Access Protocol</label>
               <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-lg group-focus-within:text-primary transition-colors">lock</span>
                <input 
                  type="password" 
                  placeholder="Password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-surface-container-lowest border border-outline-variant/10 rounded-xl py-3.5 pl-12 pr-4 text-sm focus:ring-1 focus:ring-primary focus:border-primary/50 transition-all placeholder:text-on-surface-variant/30 font-light"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold tracking-tight hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin">refresh</span>
              ) : (
                <>
                  <span>{isLogin ? 'INITIATE ACCESS' : 'CREATE PROTOCOL'}</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 flex flex-col gap-4">
             <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-outline-variant/10" />
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Neural Override</span>
                <div className="h-px flex-1 bg-outline-variant/10" />
             </div>
             
             <button 
               onClick={handleQuickDemo}
               disabled={loading}
               className="w-full py-3.5 rounded-xl border border-secondary/30 bg-secondary/5 text-secondary text-sm font-bold flex items-center justify-center gap-3 hover:bg-secondary/10 transition-all"
             >
               <span className="material-symbols-outlined">auto_awesome</span>
               QUICK DEMO BYPASS
             </button>
          </div>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-xs font-bold text-on-surface-variant hover:text-on-surface transition-colors"
            >
              {isLogin ? "Need a new access node? Create one" : "Already have access? Terminate session"}
            </button>
          </div>
        </motion.div>

        <p className="mt-12 text-center text-[10px] text-on-surface-variant uppercase tracking-[0.3em] font-medium opacity-50">
           Encrypted via SHA-256 Neural Hash Architecture
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
