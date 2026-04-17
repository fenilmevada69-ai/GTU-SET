import React from 'react';
import DesktopSidebar from './DesktopSidebar';
import MobileBottomBar from './MobileBottomBar';

interface MainLayoutProps {
  children: React.ReactNode;
  logout: () => void;
  showNav?: boolean;
}

const MainLayout = ({ children, logout, showNav = true }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col lg:flex-row relative overflow-hidden">
      {/* Ambient Glow Blobs */}
      <div className="glow-blob top-1/4 -left-32 w-96 h-96 bg-primary/10" />
      <div className="glow-blob bottom-1/4 -right-32 w-96 h-96 bg-secondary/10" />
      
      {showNav && <DesktopSidebar logout={logout} />}
      
      <main className={`flex-1 relative z-10 transition-all duration-300 ${showNav ? 'lg:pl-64 pb-24 lg:pb-8' : ''}`}>
        {children}
      </main>

      {showNav && <MobileBottomBar />}
    </div>
  );
};

export default MainLayout;
