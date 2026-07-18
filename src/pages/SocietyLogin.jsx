import React, { useState } from 'react';
import { Lock, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { db } from '../services/db';
import { supabase } from '../lib/supabaseClient';
import './AdminLogin.css'; // Reusing admin login styles

const SocietyLogin = () => {
  const navigate = useNavigate();
  const [creds, setCreds] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: creds.email,
        password: creds.password
      });
      
      if (authError) throw authError;

      const societies = await db.getSocieties();
      const society = societies.find(s => s.id === data.user.id);

      if (society) {
        if (society.status === 'approved') {
          sessionStorage.setItem('uc_society_logged', JSON.stringify(society));
          navigate('/society/dashboard');
        } else {
          setError('Your society application is pending approval.');
          await supabase.auth.signOut();
        }
      } else {
        setError('Society profile not found.');
        await supabase.auth.signOut();
      }
    } catch (err) {
      setError(err.message || 'Invalid credentials or login failed.');
    } finally {
      setLoading(false);
    }
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
