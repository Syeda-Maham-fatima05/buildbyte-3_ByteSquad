import React, { useState } from 'react';
import { Lock, Shield } from 'lucide-react';
import './AdminLogin.css';

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'uniconnect@2026';

const AdminLogin = ({ onLogin }) => {
  const [creds, setCreds] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      if (creds.username === ADMIN_USER && creds.password === ADMIN_PASS) {
        onLogin();
      } else {
        setError('Invalid credentials. Access denied.');
      }
      setLoading(false);
    }, 700);
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card card">
        <div className="admin-login-icon">
          <Shield size={40} />
        </div>
        <h2 className="admin-login-title">Super Admin</h2>
        <p className="admin-login-sub">UniConnect Control Panel · NED UET</p>
        <p className="admin-secret-note">🔒 Restricted Access Only</p>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="al-field">
            <label>Username</label>
            <input
              type="text"
              className="input"
              required
              value={creds.username}
              onChange={e => setCreds({ ...creds, username: e.target.value })}
              placeholder="admin"
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
            {loading ? 'Verifying...' : 'Enter Panel'}
          </button>
        </form>

        <p className="al-hint">Demo: <code>admin</code> / <code>uniconnect@2026</code></p>
      </div>
    </div>
  );
};

export default AdminLogin;
