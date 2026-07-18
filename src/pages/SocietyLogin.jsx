import React, { useState } from 'react';
import { Lock, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { db } from '../services/db';
import './AdminLogin.css'; // Reusing admin login styles

const SocietyLogin = () => {
  const navigate = useNavigate();
  const [creds, setCreds] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate network request
    setTimeout(() => {
      const societies = db.getSocieties();
      // Check if the email matches any active society's email or president email
      const society = societies.find(s => 
        s.email === creds.email || 
        s.presidentEmail === creds.email
      );

      // We're doing a simplified check for demo purposes.
      // In a real app, you'd check passwords properly against a backend.
      if (society && creds.password) {
        // Successful login
        sessionStorage.setItem('uc_society_logged', JSON.stringify(society));
        navigate('/society/dashboard');
      } else {
        setError('Invalid credentials or society not found.');
      }
      setLoading(false);
    }, 700);
  };

  return (
    <div className="admin-login-page" style={{ background: 'var(--bg-color)' }}>
      <div className="admin-login-card card">
        <div className="admin-login-icon" style={{ background: 'linear-gradient(135deg, var(--primary-deep-blue), var(--primary-ieee-blue))' }}>
          <UserCircle size={40} />
        </div>
        <h2 className="admin-login-title">Society Admin</h2>
        <p className="admin-login-sub">Official Society Dashboard of NED UET</p>
        <p className="admin-secret-note" style={{ color: 'var(--text-muted)' }}>Log in using your registered email and password.</p>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="al-field">
            <label>Registered Email</label>
            <input
              type="email"
              className="input"
              required
              value={creds.email}
              onChange={e => setCreds({ ...creds, email: e.target.value })}
              placeholder="society@ned.edu.pk"
            />
          </div>
          <div className="al-field">
            <label>Password</label>
            <div className="al-pass-wrap">
              <Lock size={16} className="al-icon" />
              <input
                type="password"
                className="input with-icon"
                required
                value={creds.password}
                onChange={e => setCreds({ ...creds, password: e.target.value })}
                placeholder="••••••••••"
              />
            </div>
          </div>

          {error && <div className="admin-error">{error}</div>}

          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Login to Dashboard'}
          </button>
        </form>

        <p className="al-hint">Demo: Use <code>ieee@ned.edu.pk</code> / any password</p>
      </div>
    </div>
  );
};

export default SocietyLogin;
