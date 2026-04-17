import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/dashboard', icon: 'dashboard', label: 'Home' },
  { path: '/history', icon: 'history', label: 'History' },
  { path: '/', icon: 'search', label: 'Scan', primary: true },
  { path: '/training', icon: 'school', label: 'Learn' },
  { path: '/login', icon: 'account_circle', label: 'Profile' },
];

const MobileBottomBar = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white/90 backdrop-blur-lg border-t border-outline px-4 pb-6 pt-2 z-50 flex justify-between items-center shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        
        if (item.primary) {
          return (
            <Link key={item.path} to={item.path} className="relative -top-6">
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30 border-4 border-background animate-pulse">
                <span className="material-symbols-outlined text-white text-2xl font-bold">search</span>
              </div>
            </Link>
          );
        }

        return (
          <Link
            key={item.path}
            to={item.path}
            className="flex flex-col items-center gap-1 group py-1"
          >
            <span className={`material-symbols-outlined text-2xl transition-all ${
              isActive ? 'text-primary scale-110 drop-shadow-[0_2px_4px_rgba(99,102,241,0.2)]' : 'text-on-surface-variant group-hover:text-on-surface'
            }`}>
              {item.icon}
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
              isActive ? 'text-primary' : 'text-on-surface-variant'
            }`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default MobileBottomBar;
