import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import EventCard from '../components/EventCard';
import { db } from '../services/db';
import { Users, CalendarDays, TrendingUp, Building2, MapPin, Clock, Quote, Sparkles } from 'lucide-react';
import './Home.css';

const FILTERS = ['All', 'Workshop', 'Hackathon', 'Competition', 'Seminar', 'Social'];

const TypewriterText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayedText}<span className="cursor-blink">|</span></span>;
};

const AnimatedCounter = ({ value }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = parseInt(value, 10);
    if (start === end) return;
    let timer = setInterval(() => {
      start += Math.ceil(end / 20);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{count}</span>;
};

const Home = () => {
  const [eventsList, setEventsList] = useState([]);
  const [societiesList, setSocietiesList] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [allSocieties, setAllSocieties] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      const evs = await db.getEvents();
      const socs = await db.getSocieties();
      setEventsList(evs);
      setSocietiesList(socs.slice(0, 5));
      setAllSocieties(socs);
    };
    fetchData();
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const filtered = activeFilter === 'All'
    ? eventsList
    : eventsList.filter(e => e.type === activeFilter);

  const verifiedCount = allSocieties.filter(s => s.isVerified).length;

  const timeStr = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const dateStr = currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="home-page">
      <div className="home-layout container">

        {/* ── Main Feed ─── */}
        <main className="home-feed-col">

          {/* Premium Hero Section */}
          <motion.div 
            className="home-hero-premium glass"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="hero-glow"></div>
            <motion.span 
              className="hero-badge-premium"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <Sparkles size={14} className="mr-1" /> NED University of Engineering & Technology
            </motion.span>
            <h1 className="hero-title-premium">
              <TypewriterText text="Connecting Every Society." />
            </h1>
            <p className="hero-subtitle-premium">
              The official student directory and event platform built exclusively for the NED community. Elevate your campus experience.
            </p>
          </motion.div>

          {/* Filter chips with Framer Motion LayoutId */}
          <div className="home-filters-premium">
            {FILTERS.map(f => (
              <button
                key={f}
                className={`home-filter-chip-premium ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {activeFilter === f && (
                  <motion.div
                    layoutId="active-filter"
                    className="filter-active-bg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="filter-text">{f}</span>
              </button>
            ))}
          </div>

          {/* Feed */}
          <div className="events-feed">
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 && (
                <motion.div 
                  key="empty-state"
                  className="feed-empty-premium glass"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <div className="empty-illustration">
                    <div className="empty-circle c1"></div>
                    <div className="empty-circle c2"></div>
                    <CalendarDays size={48} className="empty-icon" />
                  </div>
                  <h3>No upcoming events</h3>
                  <p>Check back later or explore other categories.</p>
                </motion.div>
              )}
              {filtered.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <EventCard event={event} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <footer className="home-footer text-center">
            <p>© 2026 UniConnect · Built for the NED University Community</p>
            <p className="text-muted" style={{ fontSize: '0.75rem', marginTop: '0.2rem' }}>
              Empowering campus life and student collaboration.
            </p>
          </footer>
        </main>

        {/* ── Sidebar ─── */}
        <aside className="home-sidebar hidden-mobile">
          
          {/* ── Campus Info Widget ── */}
          <motion.div 
            className="sb-campus-widget card sb-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="sb-widget-header">
              <div className="sb-widget-logo-premium">
                <Building2 size={20} />
              </div>
              <div>
                <h3 className="sb-widget-title">UniConnect</h3>
                <p className="sb-widget-uni">NED University · Karachi</p>
              </div>
            </div>

            <div className="sb-time-block-premium">
              <div className="sb-time-row">
                <Clock size={14} className="text-accent" />
                <span className="sb-clock">{timeStr}</span>
              </div>
              <span className="sb-date">{dateStr}</span>
            </div>

            {/* Stats grid with Animated Counters */}
            <div className="sb-stats-grid-premium">
              <div className="sb-stat-box-premium">
                <Users size={16} className="sb-stat-icon blue" />
                <span className="sb-stat-num"><AnimatedCounter value={allSocieties.length} /></span>
                <span className="sb-stat-lbl">Societies</span>
              </div>
              <div className="sb-stat-box-premium">
                <CalendarDays size={16} className="sb-stat-icon orange" />
                <span className="sb-stat-num"><AnimatedCounter value={eventsList.length} /></span>
                <span className="sb-stat-lbl">Events</span>
              </div>
              <div className="sb-stat-box-premium">
                <TrendingUp size={16} className="sb-stat-icon green" />
                <span className="sb-stat-num"><AnimatedCounter value={verifiedCount} /></span>
                <span className="sb-stat-lbl">Verified</span>
              </div>
              <div className="sb-stat-box-premium">
                <Building2 size={16} className="sb-stat-icon purple" />
                <span className="sb-stat-num"><AnimatedCounter value={1} /></span>
                <span className="sb-stat-lbl">Campus</span>
              </div>
            </div>

            <Link to="/register" className="btn btn-primary w-full sb-cta-premium">
              Register Your Society
            </Link>
          </motion.div>

          {/* Campus Quote of the Day */}
          <motion.div 
            className="card sb-card quote-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Quote size={24} className="quote-icon" />
            <p className="quote-text">"Engineering is not only the study of 45 subjects, but it is moral studies of intellectual life."</p>
            <span className="quote-author">— Prakhar Srivastav</span>
          </motion.div>

          {/* ── Suggested Societies ── */}
          <motion.div 
            className="card sb-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="sb-section-header">
              <h4>Suggested Societies</h4>
              <Link to="/directory" className="sb-see-all">See all</Link>
            </div>
            <ul className="sb-soc-list">
              {societiesList.map((soc, i) => (
                <motion.li 
                  key={soc.id} 
                  className="sb-soc-item"
                  whileHover={{ x: 4 }}
                >
                  <Link to={`/society/${soc.id}`} className="sb-soc-link">
                    <img
                      src={soc.logo}
                      alt={soc.name}
                      className="sb-soc-avatar"
                      onError={e => { e.target.src = 'https://i.pravatar.cc/150?img=5'; }}
                    />
                    <div className="sb-soc-info">
                      <span className="sb-soc-name">{soc.name}</span>
                      <span className="sb-soc-cat">{soc.category}</span>
                    </div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </aside>
      </div>
    </div>
  );
};

export default Home;
