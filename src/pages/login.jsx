import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import './login.css';

const Login = () => {
  const [loginType, setLoginType] = useState('student'); // 'student' | 'society'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Demo login as ${loginType}: ${formData.email} — Supabase Auth will connect here!`);
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        {/* Left Panel */}
        <div className="login-banner">
          <div className="banner-inner">
            <div className="banner-logo">🎓</div>
            <h1 className="banner-title">UniConnect</h1>
            <p className="banner-tagline">One Campus. One Platform. Endless Opportunities.</p>
            <ul className="banner-features">
              <li>📢 Never miss a society event</li>
              <li>🤖 Discover AI, Robotics &amp; more</li>
              <li>🏆 Join hackathons &amp; competitions</li>
              <li>📸 Explore campus life</li>
            </ul>
          </div>
        </div>

        {/* Right Panel – Form */}
        <div className="login-form-panel">
          <div className="login-card card">
            <h2 className="login-heading">Welcome Back 👋</h2>
            <p className="login-sub text-muted">Login to your UniConnect account</p>

            {/* Toggle */}
            <div className="login-toggle">
              <button
                className={`toggle-btn ${loginType === 'student' ? 'active' : ''}`}
                onClick={() => setLoginType('student')}
              >
                <User size={16} /> Student
              </button>
              <button
                className={`toggle-btn ${loginType === 'society' ? 'active' : ''}`}
                onClick={() => setLoginType('society')}
              >
                🏛 Society Admin
              </button>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="login-field">
                <label>
                  {loginType === 'student' ? 'University Email' : 'Society Official Email'}
                </label>
                <div className="input-icon-wrap">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    className="input with-icon"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={loginType === 'student' ? 'you@students.ned.edu.pk' : 'society@ned.edu.pk'}
                  />
                </div>
              </div>

              <div className="login-field">
                <label>Password</label>
                <div className="input-icon-wrap">
                  <Lock size={18} className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className="input with-icon with-icon-right"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                  />
                  <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="login-options">
                <label className="remember-me">
                  <input type="checkbox" /> Remember me
                </label>
                <a href="#" className="forgot-link text-primary">Forgot password?</a>
              </div>

              <button type="submit" className="btn btn-primary w-full login-submit-btn">
                Login
              </button>
            </form>

            {/* Demo hint */}
            <div className="demo-hint">
              <p>🧪 <strong>Demo credentials:</strong></p>
              {loginType === 'student'
                ? <p>Email: <code>demo@students.ned.edu.pk</code> / Pass: <code>demo123</code></p>
                : <p>Email: <code>ieee@ned.edu.pk</code> / Pass: <code>ieee123</code></p>
              }
            </div>

            <div className="login-footer">
              {loginType === 'student'
                ? <p className="text-muted">New student? <Link to="/register" className="text-primary">Register Society</Link> or just <Link to="/" className="text-primary">browse as guest</Link></p>
                : <p className="text-muted">New society? <Link to="/register" className="text-primary">Register here</Link></p>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
