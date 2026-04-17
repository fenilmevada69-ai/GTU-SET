import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import ResultsPage from './pages/ResultsPage';
import TrainingPage from './pages/TrainingPage';
import HistoryPage from './pages/HistoryPage';
import MainLayout from './components/MainLayout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <MainLayout logout={logout} showNav={isAuthenticated}>
        <div className="scanline no-print" />
        
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage setAuth={setIsAuthenticated} />} />
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard logout={logout} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/results" 
            element={isAuthenticated ? <ResultsPage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/training" 
            element={isAuthenticated ? <TrainingPage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/history" 
            element={isAuthenticated ? <HistoryPage /> : <Navigate to="/login" />} 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
