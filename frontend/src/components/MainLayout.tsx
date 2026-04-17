import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DesktopSidebar from './DesktopSidebar';
import MobileBottomBar from './MobileBottomBar';

interface MainLayoutProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  setAuth: (auth: boolean) => void;
}

const MainLayout = ({ children, isAuthenticated, setAuth }: MainLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === '/login';

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuth(false);
    navigate('/login');
  };

  if (isLoginPage) return <>{children}</>;

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <DesktopSidebar onLogout={handleLogout} />
      </div>

      {/* Mobile Navigation */}
      <MobileBottomBar />

      {/* Main Content Area */}
      <main className={`lg:pl-64 min-h-screen transition-all duration-300 ${
        isAuthenticated ? 'pb-24 lg:pb-0' : ''
      }`}>
        <div className="relative z-10 w-full min-h-screen">
          {children}
        </div>
      </main>

      {/* Clean Background Utility */}
      <div className="fixed inset-0 bg-background -z-10" />
    </div>
  );
};

export default MainLayout;
