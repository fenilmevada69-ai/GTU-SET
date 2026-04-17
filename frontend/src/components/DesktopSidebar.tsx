import React from 'react';
import { NavLink } from 'react-router-dom';

const DesktopSidebar = ({ logout }: { logout: () => void }) => {
  return (
    <aside className="hidden lg:flex flex-col py-8 px-4 gap-2 h-screen w-64 fixed left-0 top-0 z-40 glass-panel">
      <div className="mb-10 px-4 flex items-center gap-3">
        <span className="material-symbols-outlined text-2xl text-primary animate-pulse">shield_person</span>
        <span className="text-xl font-headline font-extrabold tracking-tighter text-on-surface">CYBER<span className="text-secondary">AI</span></span>
      </div>
      
      <nav className="flex flex-col gap-1 flex-1">
        <NavItem to="/dashboard" icon="dashboard" label="Dashboard" />
        <NavItem to="/" icon="search" label="Threat Scan" />
        <NavItem to="/training" icon="psychology" label="Neural Training" />
        <NavItem to="/history" icon="history" label="Activity Logs" />
        
        <div className="mt-auto px-2">
           <button 
             onClick={logout}
             className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:text-error hover:bg-error/5 transition-colors duration-200"
           >
             <span className="material-symbols-outlined">logout</span>
             <span className="font-medium text-sm">System Logout</span>
           </button>
        </div>
      </nav>
    </aside>
  );
};

const NavItem = ({ to, icon, label }: { to: string, icon: string, label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `
      flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
      ${isActive 
        ? 'text-secondary bg-secondary/5 relative after:absolute after:left-0 after:w-1 after:h-6 after:bg-secondary after:rounded-r-full shadow-[0_0_20px_rgba(93,230,255,0.05)]' 
        : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
      }
    `}
  >
    <span className={`material-symbols-outlined transition-transform duration-300 group-hover:scale-110`}>{icon}</span>
    <span className="font-headline font-medium tracking-tight text-sm">{label}</span>
  </NavLink>
);

export default DesktopSidebar;
