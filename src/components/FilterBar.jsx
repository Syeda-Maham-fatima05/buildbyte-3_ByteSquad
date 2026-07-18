import React, { useState } from 'react';
import './FilterBar.css';

const FilterBar = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filters = [
    'All', '⭐ Featured', '📢 Announcements', '🎯 Recruitment', 
    '💻 Hackathons', '🏆 Competitions', '🎤 Seminars', 
    '🛠 Workshops', '❤️ Volunteer', '🎨 Arts', '🤖 Technical', '⚽ Sports'
  ];

  return (
    <div className="filter-bar-container">
      <div className="filter-bar">
        {filters.map(filter => (
          <button 
            key={filter} 
            className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
