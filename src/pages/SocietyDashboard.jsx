import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../services/db';
import {
  Calendar, Users, Edit3, LogOut, LayoutDashboard,
  Plus, Trash2, Save, X, Image, Film, FileText,
  ChevronRight, Eye, Settings
} from 'lucide-react';
import './SocietyDashboard.css';

const SocietyDashboard = () => {
  const navigate = useNavigate();
  const [society, setSociety] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);

  // Forms
  const [editForm, setEditForm] = useState({});
  const [postForm, setPostForm] = useState({ title: '', image: '', time: 'Just now' });
  const [eventForm, setEventForm] = useState({ title: '', description: '', date: '', time: '', venue: '', type: 'Workshop', image: '' });
  const [galleryUrl, setGalleryUrl] = useState('');
  const [showPostForm, setShowPostForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingSociety, setEditingSociety] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const checkAndLoad = async () => {
      const loggedStr = sessionStorage.getItem('uc_society_logged');
      if (!loggedStr) { navigate('/society-login'); return; }
      const loggedSociety = JSON.parse(loggedStr);
      const list = await db.getSocieties();
      const current = list.find(s => s.id === loggedSociety.id);
      if (!current) { sessionStorage.removeItem('uc_society_logged'); navigate('/society-login'); return; }
      await loadSociety(current);
    };
    checkAndLoad();
  }, [navigate]);

  const loadSociety = async (soc) => {
    setSociety(soc);
    setEditForm({ ...soc });
    const allPosts = await db.getPosts();
    setPosts(allPosts[soc.id] || []);
    const allEvents = await db.getEvents();
    setEvents(allEvents.filter(e => e.societyId === soc.id));
    const allGalleries = await db.getGalleries();
    setGallery(allGalleries[soc.id] || []);
  };

  const refreshAll = async () => {
    const list = await db.getSocieties();
    const current = list.find(s => s.id === society.id);
    if (current) {
      sessionStorage.setItem('uc_society_logged', JSON.stringify(current));
      await loadSociety(current);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('uc_society_logged');
    navigate('/');
  };

  /* ── Edit Society Info ── */
  const handleSaveSociety = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await db.updateSociety(society.id, editForm);
      setEditingSociety(false);
      await refreshAll();
      alert('Society info updated successfully!');
    } catch (err) {
      alert(err.message || 'Failed to update society info.');
    } finally {
      setSaving(false);
    }
  };

  /* ── Posts ── */
  const handleAddPost = async (e) => {
    e.preventDefault();
    try {
      await db.addPost(society.id, postForm.title, postForm.title, postForm.image);
      const allPosts = await db.getPosts();
      setPosts(allPosts[society.id] || []);
      setPostForm({ title: '', image: '', time: 'Just now' });
      setShowPostForm(false);
      alert('Post created successfully!');
    } catch (err) {
      alert(err.message || 'Failed to create post.');
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await db.deletePost(postId);
      const allPosts = await db.getPosts();
      setPosts(allPosts[society.id] || []);
      alert('Post deleted!');
    } catch (err) {
      alert(err.message || 'Failed to delete post.');
    }
  };

  /* ── Events ── */
  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      await db.addEvent(society.id, eventForm);
      const allEvents = await db.getEvents();
      setEvents(allEvents.filter(ev => ev.societyId === society.id));
      setEventForm({ title: '', description: '', date: '', time: '', venue: '', type: 'Workshop', image: '' });
      setShowEventForm(false);
      alert('Event created successfully!');
    } catch (err) {
      alert(err.message || 'Failed to create event.');
    }
  };

  const handleDeleteEvent = async (evId) => {
    if (!window.confirm('Delete this event?')) return;
    try {
      await db.deletePost(evId);
      const allEvents = await db.getEvents();
      setEvents(allEvents.filter(ev => ev.societyId === society.id));
      alert('Event deleted!');
    } catch (err) {
      alert(err.message || 'Failed to delete event.');
    }
  };

  /* ── Gallery ── */
  const handleAddGallery = async (e) => {
    e.preventDefault();
    if (!galleryUrl.trim()) return;
    try {
      await db.addGalleryImage(society.id, galleryUrl.trim());
      const allGalleries = await db.getGalleries();
      setGallery(allGalleries[society.id] || []);
      setGalleryUrl('');
      alert('Image added to gallery!');
    } catch (err) {
      alert(err.message || 'Failed to add image to gallery.');
    }
  };

  const handleDeleteGallery = async (idx) => {
    const targetUrl = gallery[idx];
    if (!window.confirm('Delete this photo from gallery?')) return;
    try {
      await db.deleteGalleryImage(society.id, targetUrl);
      const allGalleries = await db.getGalleries();
      setGallery(allGalleries[society.id] || []);
      alert('Photo deleted!');
    } catch (err) {
      alert(err.message || 'Failed to delete photo.');
    }
  };

  if (!society) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p>Loading...</p>
    </div>
  );

  const menuItems = [
    { key: 'overview', icon: '📊', label: 'Overview' },
    { key: 'edit-profile', icon: '✏️', label: 'Edit Profile' },
    { key: 'posts', icon: '📝', label: `Posts (${posts.length})` },
    { key: 'events', icon: '📅', label: `Events (${events.length})` },
    { key: 'gallery', icon: '🖼️', label: `Gallery (${gallery.length})` },
  ];

  return (
    <div className="soc-dash-page">
      {/* Top Header */}
      <div className="soc-dash-header">
        <div className="soc-dash-header-left">
          <img src={society.logo} alt={society.name} className="soc-dash-logo" />
          <div>
            <h1>{society.name}</h1>
            <p className="text-muted">President: {society.presidentName || 'Admin'} · {society.category}</p>
          </div>
        </div>
        <div className="soc-dash-header-right">
          <button className="btn btn-outline" onClick={() => navigate(`/society/${society.id}`)}>
            <Eye size={16} /> Public View
          </button>
          <button className="btn soc-logout-btn" onClick={handleLogout}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      <div className="soc-dash-body">
        {/* Sidebar */}
        <aside className="soc-dash-sidebar">
          {menuItems.map(item => (
            <button
              key={item.key}
              className={`soc-menu-item ${activeSection === item.key ? 'active' : ''}`}
              onClick={() => setActiveSection(item.key)}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
              <ChevronRight size={16} className="menu-arrow" />
            </button>
          ))}
        </aside>

        {/* Main Content */}
        <main className="soc-dash-main">

          {/* ── OVERVIEW ── */}
          {activeSection === 'overview' && (
            <div className="dash-section">
              <h2 className="section-title">Dashboard Overview</h2>
              <div className="stats-row">
                <div className="stat-card orange">
                  <Calendar size={28} />
                  <div className="stat-number">{events.length}</div>
                  <div className="stat-label">Events</div>
                </div>
                <div className="stat-card green">
                  <FileText size={28} />
                  <div className="stat-number">{posts.length}</div>
                  <div className="stat-label">Posts</div>
                </div>
                <div className="stat-card purple">
                  <Image size={28} />
                  <div className="stat-number">{gallery.length}</div>
                  <div className="stat-label">Gallery Photos</div>
                </div>
              </div>

              <div className="overview-grid">
                <div className="card overview-card">
                  <h3>Society Info</h3>
                  <div className="info-row"><span>Email</span><strong>{society.email}</strong></div>
                  <div className="info-row"><span>Contact</span><strong>{society.contact || 'N/A'}</strong></div>
                  <div className="info-row"><span>Verified</span><strong>{society.isVerified ? '✅ Yes' : '❌ Pending'}</strong></div>
                  <button className="btn btn-outline mt-4" style={{ width: '100%' }} onClick={() => setActiveSection('edit-profile')}>
                    <Settings size={16} /> Edit Info
                  </button>
                </div>
                <div className="card overview-card">
                  <h3>Recent Posts</h3>
                  {posts.slice(0, 3).map(p => (
                    <div key={p.id} className="recent-item">
                      <span>📝</span>
                      <span className="recent-text">{p.title}</span>
                      <span className="text-muted" style={{ fontSize: '0.8rem' }}>{p.time}</span>
                    </div>
                  ))}
                  {posts.length === 0 && <p className="text-muted">No posts yet. Create one!</p>}
                  <button className="btn btn-outline mt-4" style={{ width: '100%' }} onClick={() => setActiveSection('posts')}>
                    Manage Posts
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── EDIT PROFILE ── */}
          {activeSection === 'edit-profile' && (
            <div className="dash-section">
              <h2 className="section-title">Edit Society Profile</h2>
              <form onSubmit={handleSaveSociety} className="edit-form card">
                <div className="edit-grid">
                  <div className="form-group">
                    <label>Society Name</label>
                    <input className="input" value={editForm.name || ''} onChange={e => setEditForm({...editForm, name: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select className="input" value={editForm.category || ''} onChange={e => setEditForm({...editForm, category: e.target.value})}>
                      <option>Technical</option><option>Arts</option><option>Sports</option><option>Social</option><option>Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Official Email</label>
                    <input className="input" type="email" value={editForm.email || ''} onChange={e => setEditForm({...editForm, email: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label>Contact Number</label>
                    <input className="input" value={editForm.contact || ''} onChange={e => setEditForm({...editForm, contact: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Logo Image URL</label>
                    <input className="input" value={editForm.logo || ''} onChange={e => setEditForm({...editForm, logo: e.target.value})} placeholder="https://..." />
                  </div>
                  <div className="form-group">
                    <label>Cover Image URL</label>
                    <input className="input" value={editForm.cover || ''} onChange={e => setEditForm({...editForm, cover: e.target.value})} placeholder="https://..." />
                  </div>
                  <div className="form-group full-w">
                    <label>Short Description (shown in cards)</label>
                    <textarea className="input" rows="2" value={editForm.description || ''} onChange={e => setEditForm({...editForm, description: e.target.value})} />
                  </div>
                  <div className="form-group full-w">
                    <label>Detailed About Us</label>
                    <textarea className="input" rows="4" value={editForm.aboutUs || ''} onChange={e => setEditForm({...editForm, aboutUs: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>President Name</label>
                    <input className="input" value={editForm.presidentName || ''} onChange={e => setEditForm({...editForm, presidentName: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>President Email</label>
                    <input className="input" type="email" value={editForm.presidentEmail || ''} onChange={e => setEditForm({...editForm, presidentEmail: e.target.value})} />
                  </div>
                </div>
                <div className="form-footer">
                  <button type="submit" className="btn btn-primary" disabled={saving}>
                    <Save size={16} /> {saving ? 'Saving...' : 'Save All Changes'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ── POSTS ── */}
          {activeSection === 'posts' && (
            <div className="dash-section">
              <div className="section-header">
                <h2 className="section-title">Manage Posts</h2>
                <button className="btn btn-primary" onClick={() => setShowPostForm(!showPostForm)}>
                  <Plus size={16} /> New Post
                </button>
              </div>

              {showPostForm && (
                <form onSubmit={handleAddPost} className="card create-form animate-fade-in">
                  <h3>Create New Post</h3>
                  <div className="form-group">
                    <label>Post Caption / Title *</label>
                    <input className="input" required value={postForm.title} onChange={e => setPostForm({...postForm, title: e.target.value})} placeholder="What do you want to share?" />
                  </div>
                  <div className="form-group">
                    <label>Image or Poster URL (optional)</label>
                    <input className="input" value={postForm.image} onChange={e => setPostForm({...postForm, image: e.target.value})} placeholder="https://images.unsplash.com/..." />
                  </div>
                  {postForm.image && (
                    <img src={postForm.image} alt="Preview" className="media-preview" onError={e => e.target.style.display='none'} />
                  )}
                  <div className="form-actions">
                    <button type="button" className="btn btn-outline" onClick={() => setShowPostForm(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary"><Plus size={16} /> Publish Post</button>
                  </div>
                </form>
              )}

              <div className="content-list">
                {posts.length === 0 && <div className="empty-state">No posts yet. Create your first post! 📝</div>}
                {posts.map(post => (
                  <div key={post.id} className="card content-item animate-fade-in">
                    {post.image && <img src={post.image} alt={post.title} className="content-thumb" onError={e => e.target.style.display='none'} />}
                    <div className="content-info">
                      <p className="content-title">{post.title}</p>
                      <span className="text-muted content-meta">{post.time}</span>
                    </div>
                    <button className="btn-del-item" onClick={() => handleDeletePost(post.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── EVENTS ── */}
          {activeSection === 'events' && (
            <div className="dash-section">
              <div className="section-header">
                <h2 className="section-title">Manage Events</h2>
                <button className="btn btn-primary" onClick={() => setShowEventForm(!showEventForm)}>
                  <Plus size={16} /> New Event
                </button>
              </div>

              {showEventForm && (
                <form onSubmit={handleAddEvent} className="card create-form animate-fade-in">
                  <h3>Create New Event</h3>
                  <div className="edit-grid">
                    <div className="form-group">
                      <label>Event Title *</label>
                      <input className="input" required value={eventForm.title} onChange={e => setEventForm({...eventForm, title: e.target.value})} placeholder="Workshop, Seminar, Competition..." />
                    </div>
                    <div className="form-group">
                      <label>Event Type</label>
                      <select className="input" value={eventForm.type} onChange={e => setEventForm({...eventForm, type: e.target.value})}>
                        <option>Workshop</option><option>Competition</option><option>Seminar</option><option>Hackathon</option><option>Social</option><option>Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Date *</label>
                      <input className="input" type="date" required value={eventForm.date} onChange={e => setEventForm({...eventForm, date: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>Time *</label>
                      <input className="input" required value={eventForm.time} onChange={e => setEventForm({...eventForm, time: e.target.value})} placeholder="e.g. 10:00 AM – 2:00 PM" />
                    </div>
                    <div className="form-group">
                      <label>Venue *</label>
                      <input className="input" required value={eventForm.venue} onChange={e => setEventForm({...eventForm, venue: e.target.value})} placeholder="e.g. Main Auditorium, NED" />
                    </div>
                    <div className="form-group">
                      <label>Poster / Banner URL</label>
                      <input className="input" value={eventForm.image} onChange={e => setEventForm({...eventForm, image: e.target.value})} placeholder="https://..." />
                    </div>
                    <div className="form-group full-w">
                      <label>Description *</label>
                      <textarea className="input" rows="3" required value={eventForm.description} onChange={e => setEventForm({...eventForm, description: e.target.value})} placeholder="Describe what this event is about..." />
                    </div>
                  </div>
                  {eventForm.image && (
                    <img src={eventForm.image} alt="Preview" className="media-preview" onError={e => e.target.style.display='none'} />
                  )}
                  <div className="form-actions">
                    <button type="button" className="btn btn-outline" onClick={() => setShowEventForm(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary"><Plus size={16} /> Publish Event</button>
                  </div>
                </form>
              )}

              <div className="content-list">
                {events.length === 0 && <div className="empty-state">No events yet. Add your first event! 📅</div>}
                {events.map(ev => (
                  <div key={ev.id} className="card content-item animate-fade-in">
                    {ev.image && <img src={ev.image} alt={ev.title} className="content-thumb" onError={e => e.target.style.display='none'} />}
                    <div className="content-info">
                      <p className="content-title">{ev.title}</p>
                      <span className="text-muted content-meta">📅 {ev.date} · 📍 {ev.venue} · {ev.type}</span>
                    </div>
                    <button className="btn-del-item" onClick={() => handleDeleteEvent(ev.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── GALLERY ── */}
          {activeSection === 'gallery' && (
            <div className="dash-section">
              <div className="section-header">
                <h2 className="section-title">Manage Gallery</h2>
              </div>

              <form onSubmit={handleAddGallery} className="card create-form" style={{ flexDirection: 'row', alignItems: 'flex-end', gap: '1rem' }}>
                <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                  <label>Image / Photo URL</label>
                  <input className="input" value={galleryUrl} onChange={e => setGalleryUrl(e.target.value)} placeholder="https://images.unsplash.com/..." required />
                </div>
                <button type="submit" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
                  <Plus size={16} /> Add Photo
                </button>
              </form>

              {gallery.length === 0 && <div className="empty-state" style={{ marginTop: '1rem' }}>No photos yet. Add some! 🖼️</div>}
              <div className="gallery-manage-grid">
                {gallery.map((imgUrl, idx) => (
                  <div key={idx} className="gallery-manage-item">
                    <img src={imgUrl} alt={`Photo ${idx+1}`} onError={e => e.target.style.display='none'} />
                    <button className="gallery-del-btn" onClick={() => handleDeleteGallery(idx)}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default SocietyDashboard;
