import React, { useState, useEffect } from 'react';
import { Shield, Check, X, Edit, Trash2, Plus, ArrowLeft, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { db } from '../services/db';
import AdminLogin from './AdminLogin';
import './AdminPanel.css';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');
  
  // Data State
  const [pendingRegs, setPendingRegs] = useState([]);
  const [societiesList, setSocietiesList] = useState([]);

  // Modal / Form States
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEditingSociety, setCurrentEditingSociety] = useState(null);

  // Form Field States
  const [formFields, setFormFields] = useState({
    name: '',
    category: 'Technical',
    email: '',
    contact: '',
    description: '',
    aboutUs: '',
    logo: '',
    cover: '',
    presidentName: '',
    presidentEmail: '',
    presidentRoll: '',
    department: '',
    followers: 1200
  });

  useEffect(() => {
    // Check if admin is logged in from session storage
    const logged = sessionStorage.getItem('uc_admin_logged');
    if (logged === 'true') {
      setIsAdminLoggedIn(true);
    }
    loadData();
  }, []);

  const loadData = () => {
    setPendingRegs(db.getPendingRegistrations());
    setSocietiesList(db.getSocieties());
  };

  const handleAdminLogin = () => {
    sessionStorage.setItem('uc_admin_logged', 'true');
    setIsAdminLoggedIn(true);
    loadData();
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('uc_admin_logged');
    setIsAdminLoggedIn(false);
  };

  // Pending Actions
  const handleApprove = (id) => {
    const success = db.approveRegistration(id);
    if (success) {
      alert('Society registration application approved successfully!');
      loadData();
    }
  };

  const handleReject = (id) => {
    if (window.confirm('Are you sure you want to reject this registration application?')) {
      db.rejectRegistration(id);
      alert('Registration application rejected.');
      loadData();
    }
  };

  // CRUD: Create
  const handleCreateSubmit = (e) => {
    e.preventDefault();
    db.addSociety({
      name: formFields.name,
      category: formFields.category,
      email: formFields.email,
      contact: formFields.contact,
      description: formFields.description,
      aboutUs: formFields.aboutUs,
      logo: formFields.logo || "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=200&h=200",
      cover: formFields.cover || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200",
      presidentName: formFields.presidentName,
      presidentEmail: formFields.presidentEmail,
      presidentRoll: formFields.presidentRoll,
      department: formFields.department,
      followers: parseInt(formFields.followers) || 0,
      isVerified: true
    });
    alert('Society created successfully!');
    setShowCreateModal(false);
    resetForm();
    loadData();
  };

  // CRUD: Edit
  const openEdit = (soc) => {
    setCurrentEditingSociety(soc);
    setFormFields({
      name: soc.name || '',
      category: soc.category || 'Technical',
      email: soc.email || '',
      contact: soc.contact || '',
      description: soc.description || '',
      aboutUs: soc.aboutUs || '',
      logo: soc.logo || '',
      cover: soc.cover || '',
      presidentName: soc.presidentName || '',
      presidentEmail: soc.presidentEmail || '',
      presidentRoll: soc.presidentRoll || '',
      department: soc.department || '',
      followers: soc.followers || 0
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    db.updateSociety(currentEditingSociety.id, {
      name: formFields.name,
      category: formFields.category,
      email: formFields.email,
      contact: formFields.contact,
      description: formFields.description,
      aboutUs: formFields.aboutUs,
      logo: formFields.logo,
      cover: formFields.cover,
      presidentName: formFields.presidentName,
      presidentEmail: formFields.presidentEmail,
      presidentRoll: formFields.presidentRoll,
      department: formFields.department,
      followers: parseInt(formFields.followers) || 0
    });
    alert('Society updated successfully!');
    setShowEditModal(false);
    resetForm();
    loadData();
  };

  // CRUD: Delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this society? This action is permanent.')) {
      db.deleteSociety(id);
      alert('Society deleted successfully.');
      loadData();
    }
  };

  const resetForm = () => {
    setFormFields({
      name: '',
      category: 'Technical',
      email: '',
      contact: '',
      description: '',
      aboutUs: '',
      logo: '',
      cover: '',
      presidentName: '',
      presidentEmail: '',
      presidentRoll: '',
      department: '',
      followers: 1200
    });
    setCurrentEditingSociety(null);
  };

  if (!isAdminLoggedIn) {
    return <AdminLogin onLogin={handleAdminLogin} />;
  }

  return (
    <div className="admin-panel-container container">
      {/* Header */}
      <div className="admin-header-row">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Shield size={32} className="admin-shield-icon" />
          <div>
            <h1>Admin Control Panel</h1>
            <p className="text-muted">Manage active societies and verify registration applications</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline" onClick={() => navigate('/directory')}>
            <ArrowLeft size={16} /> Public View
          </button>
          <button className="btn btn-primary" onClick={handleAdminLogout} style={{ background: '#e53e3e' }}>
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-tabs-bar">
        <button
          className={`admin-tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          📋 Pending Requests ({pendingRegs.length})
        </button>
        <button
          className={`admin-tab-btn ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          🏢 Active Societies ({societiesList.length})
        </button>
      </div>

      {/* Tab Content */}
      <div className="admin-tab-content">
        
        {/* PENDING APPLICATIONS TAB */}
        {activeTab === 'pending' && (
          <div className="pending-list">
            {pendingRegs.length === 0 ? (
              <div className="card empty-panel-card">
                <h3>No pending registration requests</h3>
                <p className="text-muted">New applications submitted through "Register Society" will show up here.</p>
              </div>
            ) : (
              pendingRegs.map(reg => (
                <div key={reg.id} className="card pending-request-card animate-fade-in">
                  <div className="pending-card-header">
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <img src={reg.logo} alt={reg.societyName} className="pending-logo" />
                      <div>
                        <h3>{reg.societyName}</h3>
                        <span className="society-cat-badge">{reg.societyCategory}</span>
                      </div>
                    </div>
                    <div className="pending-actions-btns">
                      <button className="btn-approve" onClick={() => handleApprove(reg.id)}>
                        <Check size={18} /> Approve
                      </button>
                      <button className="btn-reject" onClick={() => handleReject(reg.id)}>
                        <X size={18} /> Reject
                      </button>
                    </div>
                  </div>

                  <div className="pending-details-grid">
                    <div>
                      <h4>Society Details</h4>
                      <p><strong>Official Email:</strong> {reg.officialEmail || reg.email}</p>
                      <p><strong>Contact:</strong> {reg.contactNumber || reg.contact || 'N/A'}</p>
                      <p><strong>Short Description:</strong> {reg.description}</p>
                      <p><strong>About Us Preview:</strong> {reg.aboutUs || 'N/A'}</p>
                    </div>
                    <div>
                      <h4>President Admin Details</h4>
                      <p><strong>Name:</strong> {reg.presidentName}</p>
                      <p><strong>University Email:</strong> {reg.presidentEmail}</p>
                      <p><strong>Roll Number:</strong> {reg.presidentRoll}</p>
                      <p><strong>Department:</strong> {reg.department}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ACTIVE SOCIETIES TAB */}
        {activeTab === 'active' && (
          <div className="active-management">
            <div className="management-actions-row">
              <h3>Active Registry</h3>
              <button className="btn btn-primary" onClick={() => { resetForm(); setShowCreateModal(true); }}>
                <Plus size={16} /> Create Society
              </button>
            </div>

            <div className="admin-societies-grid">
              {societiesList.map(soc => (
                <div key={soc.id} className="card active-soc-card">
                  <div className="soc-banner-img" style={{ backgroundImage: `url(${soc.cover})` }} />
                  <div className="soc-card-body">
                    <img src={soc.logo} alt={soc.name} className="soc-card-logo" />
                    <h3 style={{ marginTop: '0.5rem' }}>{soc.name}</h3>
                    <span className="society-cat-badge">{soc.category}</span>
                    <p className="text-muted text-clamp">{soc.description}</p>
                    
                    <div className="admin-soc-card-actions">
                      <button className="btn-edit" onClick={() => openEdit(soc)}>
                        <Edit size={16} /> Edit
                      </button>
                      <button className="btn-delete" onClick={() => handleDelete(soc.id)}>
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CREATE MODAL */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal-content card">
            <div className="modal-header">
              <h2>Create New Society</h2>
              <button className="close-btn" onClick={() => setShowCreateModal(false)}><X /></button>
            </div>
            <form onSubmit={handleCreateSubmit} className="modal-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Society Name *</label>
                  <input type="text" className="input" required value={formFields.name} onChange={e => setFormFields({...formFields, name: e.target.value})} placeholder="Cybersecurity Club" />
                </div>
                <div className="form-group">
                  <label>Category *</label>
                  <select className="input" value={formFields.category} onChange={e => setFormFields({...formFields, category: e.target.value})}>
                    <option value="Technical">Technical</option>
                    <option value="Arts">Arts</option>
                    <option value="Sports">Sports</option>
                    <option value="Social">Social</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Official Email *</label>
                  <input type="email" className="input" required value={formFields.email} onChange={e => setFormFields({...formFields, email: e.target.value})} placeholder="cybersec@ned.edu.pk" />
                </div>
                <div className="form-group">
                  <label>Contact Number</label>
                  <input type="text" className="input" value={formFields.contact} onChange={e => setFormFields({...formFields, contact: e.target.value})} placeholder="+92 300 1234567" />
                </div>
                <div className="form-group">
                  <label>Logo Image URL</label>
                  <input type="text" className="input" value={formFields.logo} onChange={e => setFormFields({...formFields, logo: e.target.value})} placeholder="https://..." />
                </div>
                <div className="form-group">
                  <label>Cover Image URL</label>
                  <input type="text" className="input" value={formFields.cover} onChange={e => setFormFields({...formFields, cover: e.target.value})} placeholder="https://..." />
                </div>
                <div className="form-group">
                  <label>President Name</label>
                  <input type="text" className="input" value={formFields.presidentName} onChange={e => setFormFields({...formFields, presidentName: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>President University Email</label>
                  <input type="email" className="input" value={formFields.presidentEmail} onChange={e => setFormFields({...formFields, presidentEmail: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>President Roll Number</label>
                  <input type="text" className="input" value={formFields.presidentRoll} onChange={e => setFormFields({...formFields, presidentRoll: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <input type="text" className="input" value={formFields.department} onChange={e => setFormFields({...formFields, department: e.target.value})} />
                </div>
                <div className="form-group full-width">
                  <label>Short Description *</label>
                  <textarea className="input" required rows="2" value={formFields.description} onChange={e => setFormFields({...formFields, description: e.target.value})} placeholder="Catchy summary for directory cards."></textarea>
                </div>
                <div className="form-group full-width">
                  <label>Detailed About Us *</label>
                  <textarea className="input" required rows="4" value={formFields.aboutUs} onChange={e => setFormFields({...formFields, aboutUs: e.target.value})} placeholder="Detailed mission statement, values, and description for the About Us tab."></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setShowCreateModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Society</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content card">
            <div className="modal-header">
              <h2>Edit Society Details</h2>
              <button className="close-btn" onClick={() => setShowEditModal(false)}><X /></button>
            </div>
            <form onSubmit={handleEditSubmit} className="modal-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Society Name *</label>
                  <input type="text" className="input" required value={formFields.name} onChange={e => setFormFields({...formFields, name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Category *</label>
                  <select className="input" value={formFields.category} onChange={e => setFormFields({...formFields, category: e.target.value})}>
                    <option value="Technical">Technical</option>
                    <option value="Arts">Arts</option>
                    <option value="Sports">Sports</option>
                    <option value="Social">Social</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Official Email *</label>
                  <input type="email" className="input" required value={formFields.email} onChange={e => setFormFields({...formFields, email: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Contact Number</label>
                  <input type="text" className="input" value={formFields.contact} onChange={e => setFormFields({...formFields, contact: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Logo Image URL</label>
                  <input type="text" className="input" value={formFields.logo} onChange={e => setFormFields({...formFields, logo: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Cover Image URL</label>
                  <input type="text" className="input" value={formFields.cover} onChange={e => setFormFields({...formFields, cover: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>President Name</label>
                  <input type="text" className="input" value={formFields.presidentName} onChange={e => setFormFields({...formFields, presidentName: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>President University Email</label>
                  <input type="email" className="input" value={formFields.presidentEmail} onChange={e => setFormFields({...formFields, presidentEmail: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>President Roll Number</label>
                  <input type="text" className="input" value={formFields.presidentRoll} onChange={e => setFormFields({...formFields, presidentRoll: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <input type="text" className="input" value={formFields.department} onChange={e => setFormFields({...formFields, department: e.target.value})} />
                </div>
                <div className="form-group full-width">
                  <label>Short Description *</label>
                  <textarea className="input" required rows="2" value={formFields.description} onChange={e => setFormFields({...formFields, description: e.target.value})}></textarea>
                </div>
                <div className="form-group full-width">
                  <label>Detailed About Us *</label>
                  <textarea className="input" required rows="4" value={formFields.aboutUs} onChange={e => setFormFields({...formFields, aboutUs: e.target.value})}></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
