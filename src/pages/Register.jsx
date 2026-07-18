import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../services/db';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    societyName: '',
    societyCategory: '',
    officialEmail: '',
    presidentName: '',
    presidentEmail: '',
    presidentRoll: '',
    department: '',
    contactNumber: '',
    description: '',
    aboutUs: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await db.submitRegistration({
        societyName: formData.societyName,
        societyCategory: formData.societyCategory,
        officialEmail: formData.officialEmail,
        presidentName: formData.presidentName,
        presidentEmail: formData.presidentEmail,
        presidentRoll: formData.presidentRoll,
        department: formData.department,
        contactNumber: formData.contactNumber,
        description: formData.description,
        password: formData.password,
        aboutUs: formData.aboutUs || `We are ${formData.societyName}, dedicated to academic and extracurricular growth in our field.`,
        logo: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=200&h=200",
        cover: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200"
      });

      alert('Registration application submitted successfully! It has been sent to the secret Admin panel at /admin for approval.');
      navigate('/directory');
    } catch (err) {
      setError(err.message || 'Failed to submit registration request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container container">
      <div className="register-card card">
        <div className="register-header">
          <h2>Register Society</h2>
          <p className="text-muted">Submit your application to list your society on UniConnect.</p>
        </div>

        {error && <div className="error-message animate-fade-in" style={{ padding: '10px', background: '#fee2e2', color: '#991b1b', borderRadius: '6px', marginBottom: '15px', fontSize: '0.9rem' }}>⚠️ {error}</div>}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-section">
            <h3>Society Details</h3>
            
            <div className="form-group">
              <label>Society Name *</label>
              <input type="text" name="societyName" className="input" required value={formData.societyName} onChange={handleChange} placeholder="e.g. Cybersecurity Club" />
            </div>
            
            <div className="form-group">
              <label>Society Category *</label>
              <select name="societyCategory" className="input" required value={formData.societyCategory} onChange={handleChange}>
                <option value="">Select a category</option>
                <option value="Technical">Technical</option>
                <option value="Arts">Arts & Culture</option>
                <option value="Sports">Sports</option>
                <option value="Social">Social</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Official Society Email *</label>
              <input type="email" name="officialEmail" className="input" required value={formData.officialEmail} onChange={handleChange} placeholder="society@university.edu" />
            </div>
            
            <div className="form-group full-width">
              <label>Society Summary / Short Description *</label>
              <textarea name="description" className="input textarea" required rows="2" value={formData.description} onChange={handleChange} placeholder="A short, catchy description for cards."></textarea>
            </div>

            <div className="form-group full-width">
              <label>Detailed "About Us" Section *</label>
              <textarea name="aboutUs" className="input textarea" required rows="4" value={formData.aboutUs} onChange={handleChange} placeholder="Describe your mission, values, and goals. This will show up in the society profile About Us tab."></textarea>
            </div>
          </div>

          <div className="form-section">
            <h3>President Details</h3>
            
            <div className="form-group">
              <label>President Name *</label>
              <input type="text" name="presidentName" className="input" required value={formData.presidentName} onChange={handleChange} />
            </div>
            
            <div className="form-group">
              <label>President University Email *</label>
              <input type="email" name="presidentEmail" className="input" required value={formData.presidentEmail} onChange={handleChange} placeholder="email@uni.edu" />
            </div>
            
            <div className="form-group">
              <label>President Roll Number *</label>
              <input type="text" name="presidentRoll" className="input" required value={formData.presidentRoll} onChange={handleChange} placeholder="e.g. SE-2022-001" />
            </div>
            
            <div className="form-group">
              <label>Department *</label>
              <input type="text" name="department" className="input" required value={formData.department} onChange={handleChange} placeholder="e.g. Software Engineering" />
            </div>
            
            <div className="form-group">
              <label>Contact Number *</label>
              <input type="tel" name="contactNumber" className="input" required value={formData.contactNumber} onChange={handleChange} placeholder="e.g. +92 300 1234567" />
            </div>

            <div className="form-group">
              <label>Password *</label>
              <input type="password" name="password" className="input" required value={formData.password} onChange={handleChange} placeholder="Password for future dashboard login" />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full submit-btn" disabled={loading}>
            {loading ? 'Submitting Application...' : 'Submit Registration'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
