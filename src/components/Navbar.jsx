import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, LogOut, LayoutDashboard } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [loggedSociety, setLoggedSociety] = useState(null);

  useEffect(() => {
    const check = () => {
      const stored = sessionStorage.getItem('uc_society_logged');
      setLoggedSociety(stored ? JSON.parse(stored) : null);
    };
    check();
    window.addEventListener('storage', check);
    // Also poll so logout/login updates navbar without full reload
    const interval = setInterval(check, 500);
    return () => { window.removeEventListener('storage', check); clearInterval(interval); };
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('uc_society_logged');
    setLoggedSociety(null);
    navigate('/');
  };

  return (
    <header className="navbar glass">
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🎓</span>
          <span className="logo-text">UniConnect</span>
          <span className="logo-badge">NED UET</span>
        </Link>

        <div className="navbar-search">
          <Search className="search-icon" size={18} />
          <input type="text" placeholder="Search events, societies..." className="search-input" />
        </div>

        <nav className="navbar-actions">
          <Link to="/directory" className="nav-link">Directory</Link>
          <Link to="/register" className="nav-link">Register Society</Link>

          {loggedSociety ? (
            <div className="society-logged-nav">
              <Link to="/society/dashboard" className="society-nav-badge">
                <img src={loggedSociety.logo} alt={loggedSociety.name} className="society-nav-avatar" />
                <span>{loggedSociety.name}</span>
              </Link>
              <button className="btn btn-outline society-logout-btn" onClick={handleLogout} title="Logout">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link to="/society-login" className="btn btn-primary society-login-nav-btn">
              Society Login
            </Link>
          )}

          <button className="mobile-menu-btn icon-btn">
            <Menu size={24} />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
