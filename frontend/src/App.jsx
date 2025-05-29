import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import Forgot from './components/Forgot.jsx';

function AppContent() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="ocean-bg pt-16">
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route path="/learn" element={<h1>Learn Page</h1>} />
          <Route path="/about" element={<h1>About Page</h1>} />
          <Route path="/signup" element={<Signup darkMode={darkMode} />} />
          <Route path="/login" element={<Login darkMode={darkMode} />} />
          <Route path="/forgot" element={<Forgot darkMode={darkMode} />} />
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
