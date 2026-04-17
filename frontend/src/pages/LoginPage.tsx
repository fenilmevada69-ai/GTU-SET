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
    <div className="min-h-screen flex items-center justify-center p-6 bg-background relative selection:bg-primary/10">
      <div className="max-w-md w-full relative z-10">
        <center className="mb-10">
           <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-4 border border-outline shadow-xl group hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-4xl text-primary animate-pulse group-hover:text-secondary transition-colors">fingerprint</span>
           </div>
           <h1 className="text-3xl font-headline font-black tracking-tighter text-on-surface">Neural Access Hub</h1>
           <p className="text-on-surface-variant text-sm font-medium mt-1 uppercase tracking-widest">Protocol Identification Required</p>
        </center>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 lg:p-10 rounded-2xl shadow-xl shadow-gray-200/50 border border-outline"
        >
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-error/5 border border-error/20 flex items-start gap-3">
              <span className="material-symbols-outlined text-error text-lg">dangerous</span>
              <p className="text-xs text-error font-bold leading-relaxed">{error}</p>
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
                  className="w-full bg-background border border-outline rounded-xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-on-surface-variant/30 font-medium text-on-surface"
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
                  className="w-full bg-background border border-outline rounded-xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-on-surface-variant/30 font-medium text-on-surface"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary text-white py-4 rounded-xl font-bold tracking-tight hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin">refresh</span>
              ) : (
                <>
                  <span className="uppercase tracking-widest text-xs">{isLogin ? 'Initiate Access' : 'Create Protocol'}</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 flex flex-col gap-4">
             <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-outline" />
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Neural Override</span>
                <div className="h-px flex-1 bg-outline" />
             </div>
             
             <button 
               onClick={handleQuickDemo}
               disabled={loading}
               className="w-full py-3.5 rounded-xl border border-primary/20 bg-primary/5 text-primary text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-primary/10 transition-all"
             >
               <span className="material-symbols-outlined text-lg">auto_awesome</span>
               QUICK DEMO BYPASS
             </button>
          </div>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
            >
              {isLogin ? "Generate New Node" : "Existing Access Login"}
            </button>
          </div>
        </motion.div>

        <p className="mt-12 text-center text-[10px] text-on-surface-variant uppercase tracking-[0.4em] font-medium opacity-50">
           Shield Encryption Protocol Active
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
