import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Bookmark, Share2, Calendar, MapPin, Mail, Phone, ArrowLeft, Users, ImageIcon, Shield, User } from 'lucide-react';
import { db } from '../services/db';
import './SocietyProfile.css';

const SocietyProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('about');
  const [society, setSociety] = useState(null);
  const [societyEvents, setSocietyEvents] = useState([]);
  const [societyPosts, setSocietyPosts] = useState([]);
  const [societyGallery, setSocietyGallery] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const list = await db.getSocieties();
      const found = list.find(s => s.id === id);
      if (found) {
        setSociety(found);
        const allEvs = await db.getEvents();
        const evs = allEvs.filter(e => e.societyId === found.id);
        setSocietyEvents(evs);
        const allPosts = await db.getPosts();
        setSocietyPosts(allPosts[found.id] || []);
        const allGalleries = await db.getGalleries();
        setSocietyGallery(allGalleries[found.id] || []);
      }
    };
    fetchData();
  }, [id]);

  if (!society) {
    return (
      <div className="container" style={{ paddingTop: '6rem', minHeight: '60vh' }}>
        <h2>Society not found.</h2>
        <button className="btn btn-primary mt-4" onClick={() => navigate('/directory')}>
          Go to Directory
        </button>
      </div>
    );
  }

  const upcomingEvents = societyEvents.filter(e => !e.isToday);
  const pastEvents = societyEvents.filter(e => e.isToday);

  const tabs = [
    { key: 'about', label: 'ℹ️ About Us', count: null },
    { key: 'posts', label: '📝 Posts', count: societyPosts.length },
    { key: 'events', label: '📅 Events', count: societyEvents.length },
    { key: 'gallery', label: '🖼 Gallery', count: societyGallery.length },
  ];

  return (
    <div className="society-profile-page">
      {/* Cover */}
      <div className="society-cover-banner" style={{ backgroundImage: `url(${society.cover})` }}>
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} /> Back
        </button>
        <div className="cover-overlay" />
      </div>

      {/* Header Info */}
      <div className="container society-header-info">
        <div className="header-left">
          <img src={society.logo} alt={society.name} className="society-logo-xl" />
          <div>
            <h1 className="society-heading">
              {society.name}
              {society.isVerified && <span className="verified-chip">✔ Verified</span>}
            </h1>
            <span className="society-cat-badge">{society.category}</span>
            <div className="society-contact-row">
              <span><Mail size={14} /> {society.email}</span>
              {society.contact && <span><Phone size={14} /> {society.contact}</span>}
            </div>
          </div>
        </div>

        <div className="header-right">
          <div className="header-stats">
            <div className="stat-item"><span className="stat-num">{society.postsCount || societyPosts.length}</span><span className="stat-lbl">Posts</span></div>
            <div className="stat-item"><span className="stat-num">{society.eventsCount || societyEvents.length}</span><span className="stat-lbl">Events</span></div>
          </div>
          <button className="btn btn-outline" style={{ cursor: 'default', opacity: 0.8 }}>
            Public View Mode
          </button>
        </div>
      </div>

      {/* Quick Summary */}
      <div className="container">
        <p className="society-bio">{society.description}</p>
      </div>

      {/* Tabs */}
      <div className="tabs-wrapper">
        <div className="container tabs-bar">
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label} {tab.count !== null && <span className="tab-count">{tab.count}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="container tab-content">
        {/* ABOUT US */}
        {activeTab === 'about' && (
          <div className="about-us-tab-content card animate-fade-in" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: '#ffffff', borderRadius: '16px' }}>
            <div>
              <h3 style={{ color: 'var(--primary-deep-blue)', marginBottom: '0.75rem', fontSize: '1.4rem' }}>Our Mission & Values</h3>
              <p style={{ lineHeight: '1.7', color: '#4A5568', fontSize: '1.05rem', whiteSpace: 'pre-wrap' }}>
                {society.aboutUs || society.description}
              </p>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0' }} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <div style={{ background: '#F7FAFC', padding: '1.25rem', borderRadius: '12px', border: '1px solid #EDF2F7' }}>
                <h4 style={{ color: 'var(--primary-deep-blue)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={18} /> Official Contacts
                </h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#4A5568' }}>
                  <li><strong>Official Email:</strong> {society.email}</li>
                  {society.contact && <li><strong>Contact Number:</strong> {society.contact}</li>}
                  <li><strong>Category:</strong> {society.category}</li>
                </ul>
              </div>

              {society.presidentName && (
                <div style={{ background: '#F7FAFC', padding: '1.25rem', borderRadius: '12px', border: '1px solid #EDF2F7' }}>
                  <h4 style={{ color: 'var(--primary-deep-blue)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <User size={18} /> President Administration
                  </h4>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#4A5568' }}>
                    <li><strong>President:</strong> {society.presidentName}</li>
                    {society.presidentEmail && <li><strong>President Email:</strong> {society.presidentEmail}</li>}
                    {society.presidentRoll && <li><strong>Roll Number:</strong> {society.presidentRoll}</li>}
                    {society.department && <li><strong>Department:</strong> {society.department}</li>}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* POSTS */}
        {activeTab === 'posts' && (
          <div className="posts-grid">
            {societyPosts.length === 0 && <p className="empty-msg">No posts yet.</p>}
            {societyPosts.map(post => (
              <div key={post.id} className="card post-card">
                {post.image && <img src={post.image} alt={post.title} className="post-img" />}
                <div className="post-card-body">
                  <p className="post-title">{post.title}</p>
                  <span className="post-time text-muted">{post.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EVENTS */}
        {activeTab === 'events' && (
          <div className="events-list">
            {societyEvents.length === 0 && <p className="empty-msg">No events yet.</p>}
            {societyEvents.map(ev => (
              <div key={ev.id} className="card event-row">
                {ev.image && <img src={ev.image} alt={ev.title} className="event-row-img" />}
                <div className="event-row-body">
                  <div className="event-row-badge">{ev.type}</div>
                  <h3>{ev.title}</h3>
                  <p className="text-muted">{ev.description}</p>
                  <div className="event-row-meta">
                    <span><Calendar size={14} /> {ev.date} • {ev.time}</span>
                    <span><MapPin size={14} /> {ev.venue}</span>
                  </div>
                  <button className="btn btn-accent" style={{ marginTop: '0.75rem', opacity: 0.85 }} onClick={() => alert('This platform is in view-only demo mode. Event registration is open directly to all campus students.')}>
                    Event Info
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* GALLERY */}
        {activeTab === 'gallery' && (
          <div>
            {societyGallery.length === 0 && (
              <div className="empty-gallery">
                <ImageIcon size={48} className="text-muted" />
                <p className="text-muted">No gallery photos yet.</p>
              </div>
            )}
            <div className="gallery-grid">
              {societyGallery.map((img, i) => (
                <div key={i} className="gallery-item">
                  <img src={img} alt={`Gallery ${i + 1}`} />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SocietyProfile;
