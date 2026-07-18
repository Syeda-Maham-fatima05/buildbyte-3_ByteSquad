import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { db } from '../services/db';
import './Directory.css';

const Directory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [societiesList, setSocietiesList] = useState([]);

  useEffect(() => {
    setSocietiesList(db.getSocieties());
  }, []);

  const filteredSocieties = societiesList.filter(society => {
    const nameMatch = society.name ? society.name.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    const categoryMatch = society.category ? society.category.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    return nameMatch || categoryMatch;
  });

  return (
    <div className="directory-container container">
      <div className="directory-header">
        <div>
          <h1 className="text-primary">Society Directory</h1>
          <p className="text-muted">Discover student organizations across campus</p>
        </div>
        
        <div className="directory-search">
          <Search className="search-icon" size={18} />
          <input 
            type="text" 
            placeholder="Search societies by name or category..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="directory-grid">
        {filteredSocieties.map(society => (
          <Link to={`/society/${society.id}`} key={society.id} className="card society-card animate-fade-in" style={{ textDecoration: 'none', display: 'block' }}>
            <div className="society-cover" style={{ backgroundImage: `url(${society.cover})` }}>
              <div className="society-avatar-wrapper">
                <img src={society.logo} alt={society.name} className="society-avatar-large" />
              </div>
            </div>
            
            <div className="society-card-content">
              <h3 className="society-name-large">
                {society.name} {society.isVerified && <span className="verified-badge">✔</span>}
              </h3>
              <span className="society-category">{society.category}</span>
              
              <p className="society-description">{society.description}</p>
              
              <div className="society-stats">
                <div className="stat" style={{ alignItems: 'flex-start' }}>
                  <span className="stat-value">{society.eventsCount}</span>
                  <span className="stat-label">Events Hosted</span>
                </div>
              </div>
              
              <button className="btn btn-outline w-full mt-4" style={{ pointerEvents: 'none' }}>View Profile</button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Directory;
