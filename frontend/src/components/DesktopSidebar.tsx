import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
  { path: '/', icon: 'search', label: 'Scanner' },
  { path: '/training', icon: 'school', label: 'Neural Academy' },
  { path: '/history', icon: 'history', label: 'Registry' },
];

const DesktopSidebar = ({ onLogout }: { onLogout: () => void }) => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-outline flex flex-col z-50">
      {/* Brand */}
      <div className="p-8 pb-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-white text-2xl">shield_percent</span>
          </div>
          <div>
             <h1 className="text-xl font-headline font-extrabold tracking-tight text-on-surface">CyberAware</h1>
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70">AI Guardian</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl font-medium text-sm transition-all group ${
                isActive 
                  ? 'bg-primary/5 text-primary' 
                  : 'text-on-surface-variant hover:bg-background hover:text-on-surface'
              }`}
            >
              <span className={`material-symbols-outlined text-xl transition-colors ${
                isActive ? 'text-primary' : 'text-on-surface-variant group-hover:text-on-surface'
              }`}>
                {item.icon}
              </span>
              <span>{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Account */}
      <div className="p-4 border-t border-outline">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl font-medium text-sm text-error hover:bg-error/5 transition-all"
        >
          <span className="material-symbols-outlined text-xl">logout</span>
          <span>Logout Session</span>
        </button>
      </div>
    </aside>
  );
};

export default DesktopSidebar;
