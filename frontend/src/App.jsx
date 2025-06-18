import React, { useState } from 'react';
import { Routes, Route, useLocation, BrowserRouter } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import Forgot from './components/Forgot.jsx';
import DashboardFull from './components/dashboard/Dashboard.jsx';
import Page from './components/Page.jsx';
import Details from './components/Details.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import MLInsights from './components/MLInsights.jsx'
import { About } from './components/About.jsx';

function AppContent() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle('dark');
  };

  const hideNavbar = location.pathname.startsWith("/page");

  return (
    <>
      {!hideNavbar && (
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      )}
      <div className="ocean-bg pt-16">
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route path="/learn" element={<h1>Learn Page</h1>} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup darkMode={darkMode} />} />
          <Route path="/login" element={<Login darkMode={darkMode} />} />
          <Route path="/forgot" element={<Forgot darkMode={darkMode} />} />
          <Route path="/dashboard/*" element={<ProtectedRoute> <DashboardFull /> </ProtectedRoute>} />
          <Route path="/page/" element={<ProtectedRoute> <Page /> </ProtectedRoute>} />
          <Route path="/page/fish" element={<ProtectedRoute> <Details /> </ProtectedRoute>} />
          <Route path="/page/insights" element={<ProtectedRoute> <MLInsights /> </ProtectedRoute>} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
