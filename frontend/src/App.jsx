import React , { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import Forgot from './components/Forgot.jsx';
import DashboardFull from './components/dashboard/Dashboard.jsx';
import Page from './components/Page.jsx';
import Details from './components/Details.jsx';

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
          <Route path="/about" element={<h1>About Page</h1>} />
          <Route path="/signup" element={<Signup darkMode={darkMode} />} />
          <Route path="/login" element={<Login darkMode={darkMode} />} />
          <Route path="/forgot" element={<Forgot darkMode={darkMode} />} />
          <Route path="/dashboard/*" element={<DashboardFull />} />
          <Route path="/page/" element={<Page />} />
          <Route path="/page/fish" element={<Details />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;