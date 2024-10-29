import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import Leaderboard from './Leaderboard'; // Import new leaderboard component
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [githubData, setGithubData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get('data');
    if (data) {
      setLoading(true);
      setTimeout(() => {
        try {
          const parsedData = JSON.parse(decodeURIComponent(data));
          setGithubData(parsedData);
          setIsAuthenticated(true);
          navigate('/dashboard', { state: { githubData: parsedData } });
        } catch (err) {
          console.error('Failed to parse data:', err);
        } finally {
          setLoading(false);
        }
      }, 2000); // Reduced to 2 seconds
    }
  }, [navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={loading ? <div>Loading...</div> : isAuthenticated ? <Dashboard /> : <LoginPage />} />
        <Route path="/dashboard" element={<Dashboard githubData={githubData} />} />
        <Route path="/leaderboard" element={<Leaderboard />} /> {/* New leaderboard route */}
      </Routes>
    </div>
  );
}

export default App;
