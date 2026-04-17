import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import api from '../lib/api';

const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);
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
    <div className="min-h-screen flex items-center justify-center bg-background">
      <span className="material-symbols-outlined text-primary animate-spin text-5xl">refresh</span>
    </div>
  );

  const chartData = [
    { name: 'Phishing', count: stats?.threat_counts?.Phishing || 0, color: '#6366f1' },
    { name: 'Malware', count: stats?.threat_counts?.Malware || 0, color: '#0ea5e9' },
    { name: 'Safe', count: stats?.threat_counts?.Safe || 0, color: '#10b981' },
    { name: 'Other', count: stats?.threat_counts?.['Social Engineering'] || 0, color: '#8b5cf6' },
  ];

  const statsRow = [
    { label: 'Awareness Score', value: `${stats?.awareness_score || 0}%`, icon: 'psychology', color: 'text-primary', bg: 'bg-primary/5' },
    { label: 'Total Scans', value: stats?.total_scans || 0, icon: 'analytics', color: 'text-secondary', bg: 'bg-secondary/5' },
    { label: 'Threats Blocked', value: (stats?.total_scans || 0) - (stats?.threat_counts?.Safe || 0), icon: 'security', color: 'text-error', bg: 'bg-error/5' },
    { label: 'Neural Academy', value: 'Level 4', icon: 'school', color: 'text-success', bg: 'bg-success/5' },
  ];

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-black tracking-tighter text-on-surface">Security Command Hub</h1>
          <p className="text-on-surface-variant text-sm font-medium mt-1">Real-time intelligence and neural threat monitoring.</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-outline shadow-sm">
           <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
           <span className="text-[10px] font-black uppercase tracking-widest text-on-surface">Neural Engine Online</span>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsRow.map((stat, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={idx}
            className="neural-card p-6 flex flex-col items-start"
          >
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4 border border-outline/50`}>
              <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-on-surface tracking-tighter">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Area */}
        <div className="lg:col-span-2 neural-card p-8">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-black uppercase tracking-widest text-on-surface">Threat Distribution Synthesis</h3>
              <span className="text-[10px] font-bold text-on-surface-variant">Last 30 Days</span>
           </div>
           <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} 
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={40}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
           </div>
        </div>

        {/* Activity Stream */}
        <div className="neural-card p-8 flex flex-col">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-black uppercase tracking-widest text-on-surface">Live Registry</h3>
              <span className="material-symbols-outlined text-on-surface-variant text-lg">history</span>
           </div>
           
           <div className="space-y-6 flex-1">
             {stats?.scans?.slice(0, 5).map((scan: any, idx: number) => (
               <div key={idx} className="flex items-start gap-4 group">
                  <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${scan.risk_score > 7 ? 'bg-error shadow-[0_0_8px_rgba(244,63,94,0.4)]' : 'bg-success'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-on-surface truncate pr-2">{scan.threat_type} detected</p>
                    <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-widest mt-0.5">
                       {new Date(scan.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant/30 text-sm opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
               </div>
             ))}
             {!stats?.scans?.length && (
                <div className="text-center py-10 opacity-30 grayscale">
                   <p className="text-[10px] font-black uppercase tracking-widest">No Active Logs</p>
                </div>
             )}
           </div>

           <button className="mt-8 w-full py-3 rounded-xl bg-background border border-outline text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant hover:bg-outline hover:text-on-surface transition-all">
              Initialize Full Registry
           </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
