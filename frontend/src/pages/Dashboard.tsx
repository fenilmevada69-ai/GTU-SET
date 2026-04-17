import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

interface UserStats {
  username: string;
  awareness_score: number;
  total_scans: number;
  scans: any[];
}

const Dashboard = ({ logout }: { logout: () => void }) => {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/scans/stats');
        setStats(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="material-symbols-outlined text-secondary animate-spin text-5xl">refresh</span>
    </div>
  );

  const threatData = [
    { name: 'Phishing', count: stats?.scans?.filter(s => s.threat_type === 'Phishing').length || 0, color: '#c0c1ff' },
    { name: 'Malware', count: stats?.scans?.filter(s => s.threat_type === 'Malware').length || 0, color: '#ffb4ab' },
    { name: 'Social', count: stats?.scans?.filter(s => s.threat_type === 'Social Engineering').length || 0, color: '#5de6ff' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 lg:py-12">
      {/* Welcome Header */}
      <section className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 px-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Neural Interface / Dashboard</span>
             <div className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(93,230,255,0.6)] animate-agent-pulse" />
          </div>
          <h1 className="text-3xl font-headline font-extrabold tracking-tighter">System Overview</h1>
          <p className="text-on-surface-variant text-sm font-light mt-1">
            Analyzing telemetry for <span className="text-primary font-medium">{stats?.username}</span>
          </p>
        </div>
        <div className="hidden lg:flex items-center gap-3 bg-surface-container-low px-4 py-2 rounded-xl border border-outline-variant/10">
           <span className="material-symbols-outlined text-tertiary text-sm">check_circle</span>
           <span className="text-[11px] font-bold tracking-widest text-on-surface-variant uppercase">All Systems Nominal</span>
        </div>
      </section>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        
        {/* Awareness Score (Hero Card) */}
        <div className="neural-card md:col-span-2 p-8 flex flex-col justify-between overflow-hidden relative group">
           <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-[60px] group-hover:bg-primary/10 transition-colors" />
           <div className="relative z-10">
              <span className="material-symbols-outlined text-primary mb-4 text-3xl">psychology</span>
              <p className="text-xs font-label text-on-surface-variant tracking-widest uppercase mb-1">Awareness Quotient</p>
              <div className="flex items-baseline gap-3">
                 <h2 className="text-6xl font-headline font-black tracking-tighter text-on-surface">{stats?.awareness_score}%</h2>
                 <span className={`text-xs font-bold leading-none px-2 py-1 rounded-full ${stats?.awareness_score! > 70 ? 'bg-tertiary/10 text-tertiary' : 'bg-error/10 text-error'}`}>
                    {stats?.awareness_score! > 70 ? 'Optimal' : 'Compromised'}
                 </span>
              </div>
           </div>
           <div className="mt-8 relative z-10">
              <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                 <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${stats?.awareness_score}%` }}
                    className="h-full bg-primary shadow-[0_0_15px_rgba(192,193,255,0.6)]"
                 />
              </div>
              <p className="text-[10px] text-on-surface-variant mt-3 tracking-wide">+12.4% from your last simulation cycle</p>
           </div>
        </div>

        {/* Total Scans */}
        <div className="neural-card p-6 flex flex-col justify-between bg-gradient-to-br from-surface-container-low to-surface-container-lowest">
           <div>
              <span className="material-symbols-outlined text-secondary mb-3">shield_search</span>
              <p className="text-[10px] font-label text-on-surface-variant tracking-widest uppercase">Scans Synthesized</p>
           </div>
           <div className="mt-6">
              <span className="text-4xl font-headline font-bold tracking-tighter text-on-surface">{stats?.total_scans}</span>
              <div className="flex items-center gap-1.5 mt-1">
                 <span className="material-symbols-outlined text-[12px] text-tertiary">trending_up</span>
                 <span className="text-[10px] text-tertiary font-bold">+3 this week</span>
              </div>
           </div>
        </div>

        {/* Quick Action Card */}
        <Link to="/" className="neural-card p-6 flex flex-col items-center justify-center gap-4 bg-primary text-on-primary hover:scale-[1.02] active:scale-95 transition-all text-center">
           <div className="w-14 h-14 rounded-full bg-on-primary/10 flex items-center justify-center">
             <span className="material-symbols-outlined text-3xl">bolt</span>
           </div>
           <div>
             <h3 className="text-lg font-bold tracking-tight">New Scan</h3>
             <p className="text-[10px] font-medium opacity-70 uppercase tracking-widest">Immediate Analysis</p>
           </div>
        </Link>

        {/* Distribution Chart (Wide) */}
        <div className="neural-card md:col-span-2 p-6">
          <div className="flex justify-between items-start mb-6">
             <div>
                <p className="text-[10px] font-label text-on-surface-variant tracking-widest uppercase">Telemetry</p>
                <h4 className="text-lg font-bold">Threat Distribution</h4>
             </div>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={threatData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#313441" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#c7c4d7', fontSize: 10, fontWeight: 600 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#c7c4d7', fontSize: 10 }}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                  contentStyle={{ backgroundColor: '#1b1f2b', border: '1px solid #464554', borderRadius: '8px' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={40}>
                  {threatData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Real-time Activity Logs (Wide) */}
        <div className="neural-card md:col-span-2 p-6 flex flex-col">
          <div className="flex justify-between items-baseline mb-6">
             <h4 className="text-lg font-bold">Activity Logs</h4>
             <Link to="/history" className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] hover:opacity-70">View Timeline</Link>
          </div>
          <div className="space-y-3 flex-1 overflow-y-auto pr-2 no-scrollbar">
            {stats?.scans?.slice(0, 4).map((scan) => (
              <div key={scan.id} className="flex items-start gap-4 p-3 rounded-xl bg-surface-container-mid/50 border border-transparent hover:border-outline-variant/10 transition-colors">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  scan.risk_score > 7 ? 'bg-error/10 text-error' : 'bg-tertiary/10 text-tertiary'
                }`}>
                  <span className="material-symbols-outlined text-lg">
                    {scan.risk_score > 7 ? 'dangerous' : 'check_circle'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                   <div className="flex justify-between items-baseline mb-0.5">
                      <h5 className="text-xs font-bold truncate">{scan.threat_type}</h5>
                      <span className="text-[9px] text-on-surface-variant font-mono">ID: {scan.id.toString().slice(-4)}</span>
                   </div>
                   <p className="text-[11px] text-on-surface-variant truncate font-light leading-relaxed">{scan.reasoning}</p>
                </div>
              </div>
            ))}
            {(!stats?.scans || stats.scans.length === 0) && (
              <div className="flex flex-col items-center justify-center p-8 opacity-40 grayscale">
                 <span className="material-symbols-outlined text-4xl mb-2">inbox</span>
                 <p className="text-xs font-medium">No activity data found.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
