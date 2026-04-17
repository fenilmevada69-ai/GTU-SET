import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const MobileBottomBar = () => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-slate-950/80 backdrop-blur-xl z-50 flex items-center justify-around px-2 border-t border-outline-variant/10 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.5)]">
      <BottomNavItem to="/dashboard" icon="dashboard" label="Home" />
      <BottomNavItem to="/history" icon="history" label="Logs" />
      
      {/* Central Action Button */}
      <div className="relative -top-6">
        <Link 
          to="/" 
          className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-2xl shadow-primary/40 flex items-center justify-center transition-transform active:scale-90"
        >
          <span className="material-symbols-outlined text-3xl">add</span>
        </Link>
      </div>

      <BottomNavItem to="/training" icon="psychology" label="Training" />
      <BottomNavItem to="/settings" icon="settings" label="Config" />
    </nav>
  );
};

const BottomNavItem = ({ to, icon, label }: { to: string, icon: string, label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `
      flex flex-col items-center gap-1 group transition-colors duration-200 w-12
      ${isActive ? 'text-secondary' : 'text-on-surface-variant hover:text-on-surface'}
    `}
  >
    <span className={`material-symbols-outlined text-xl`}>{icon}</span>
    <span className="text-[10px] font-medium tracking-tight">{label}</span>
    <NavLink to={to}>
       {({ isActive }) => isActive && <div className="absolute -top-1 w-1 h-1 bg-secondary rounded-full shadow-[0_0_8px_rgba(93,230,255,0.6)]" />}
    </NavLink>
  </NavLink>
);

export default MobileBottomBar;
