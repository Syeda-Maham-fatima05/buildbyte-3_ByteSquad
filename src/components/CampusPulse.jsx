import React from 'react';
import { Flame, Clock, Megaphone, Trophy } from 'lucide-react';
import './CampusPulse.css';

const CampusPulse = () => {
  return (
    <div className="campus-pulse card">
      <div className="pulse-header">
        <h2 className="pulse-title">⚡ Campus Pulse</h2>
        <span className="pulse-subtitle">What's happening right now</span>
      </div>
      
      <div className="pulse-grid">
        <div className="pulse-item trending">
          <div className="pulse-icon-wrapper bg-orange">
            <Flame size={20} className="pulse-icon" />
          </div>
          <div className="pulse-info">
            <span className="pulse-label">Trending Event</span>
            <h4 className="pulse-value">AI Bootcamp 2026</h4>
          </div>
        </div>
        
        <div className="pulse-item today">
          <div className="pulse-icon-wrapper bg-blue">
            <Clock size={20} className="pulse-icon" />
          </div>
          <div className="pulse-info">
            <span className="pulse-label">Happening Today</span>
            <h4 className="pulse-value">Embedded Systems Workshop</h4>
          </div>
        </div>
        
        <div className="pulse-item announcement">
          <div className="pulse-icon-wrapper bg-purple">
            <Megaphone size={20} className="pulse-icon" />
          </div>
          <div className="pulse-info">
            <span className="pulse-label">Latest Announcement</span>
            <h4 className="pulse-value">Hackathon Registration Open</h4>
          </div>
        </div>
        
        <div className="pulse-item featured">
          <div className="pulse-icon-wrapper bg-gold">
            <Trophy size={20} className="pulse-icon" />
          </div>
          <div className="pulse-info">
            <span className="pulse-label">Featured Society</span>
            <h4 className="pulse-value">Photography Society</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusPulse;
