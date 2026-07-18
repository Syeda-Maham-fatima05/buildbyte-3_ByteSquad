import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, BadgeCheck, Calendar, MapPin, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './EventCard.css';

const CHIP_COLORS = {
  Workshop:    'chip-workshop',
  Competition: 'chip-competition',
  Hackathon:   'chip-hackathon',
  Seminar:     'chip-seminar',
  Social:      'chip-social',
  Other:       'chip-other',
};

/* Normalize images: accepts a single string or an array */
const getImages = (event) => {
  if (Array.isArray(event.images) && event.images.length > 0) return event.images;
  if (event.image) return [event.image];
  return [];
};

const MediaCarousel = ({ images, title }) => {
  const [idx, setIdx] = useState(0);

  if (images.length === 0) return null;

  const prev = (e) => { e.stopPropagation(); setIdx(i => (i - 1 + images.length) % images.length); };
  const next = (e) => { e.stopPropagation(); setIdx(i => (i + 1) % images.length); };

  return (
    <div className="ec-media-wrapper">
      {/* Blurred background image for full uncropped look */}
      <motion.img
        src={images[idx]}
        alt=""
        className="ec-media-bg-blur"
        onError={e => { e.target.style.display = 'none'; }}
      />
      <AnimatePresence mode="wait">
        <motion.img
          key={images[idx]}
          src={images[idx]}
          alt={title}
          className="ec-media-img"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onError={e => { e.target.style.display = 'none'; }}
        />
      </AnimatePresence>
      {images.length > 1 && (
        <>
          <button className="ec-carousel-btn ec-carousel-prev" onClick={prev} aria-label="Previous">
            <ChevronLeft size={20} />
          </button>
          <button className="ec-carousel-btn ec-carousel-next" onClick={next} aria-label="Next">
            <ChevronRight size={20} />
          </button>
          <div className="ec-dots">
            {images.map((_, i) => (
              <button
                key={i}
                className={`ec-dot${i === idx ? ' active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setIdx(i); }}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
          <span className="ec-counter">{idx + 1} / {images.length}</span>
        </>
      )}
    </div>
  );
};

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const images = getImages(event);
  const chipClass = CHIP_COLORS[event.type] || 'chip-other';

  return (
    <motion.article 
      className="ec-card" 
      role="article"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* ── Header ─── */}
      <div className="ec-header">
        <button
          className="ec-society-btn"
          onClick={() => navigate(`/society/${event.societyId}`)}
          aria-label={`View ${event.societyName} profile`}
        >
          <img
            src={event.societyLogo}
            alt={event.societyName}
            className="ec-avatar"
            onError={e => { e.target.src = 'https://i.pravatar.cc/150?img=5'; }}
          />
          <div className="ec-society-info">
            <div className="ec-society-name-row">
              <span className="ec-society-name">{event.societyName}</span>
              {event.isVerified && (
                <BadgeCheck size={15} className="ec-verified" aria-label="Verified" />
              )}
              <span className={`badge-chip ${chipClass} ec-chip`}>{event.type}</span>
            </div>
            <div className="ec-meta-row">
              <Calendar size={12} />
              <span>{event.date} · {event.time}</span>
            </div>
          </div>
        </button>
        <button className="ec-more-btn" aria-label="More options">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* ── Caption ─── */}
      <div className="ec-caption">
        <p className="ec-title">{event.title}</p>
        {event.description && (
          <p className="ec-description">{event.description}</p>
        )}
      </div>

      {/* ── Media ─── */}
      <MediaCarousel images={images} title={event.title} />

      {/* ── Venue footer ─── */}
      {event.venue && (
        <div className="ec-footer">
          <MapPin size={13} />
          <span>{event.venue}</span>
        </div>
      )}
    </motion.article>
  );
};

export default EventCard;
