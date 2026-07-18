import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Bot, Cpu, Monitor, Zap } from 'lucide-react';
import './Background.css';

const ICONS = [
  { Icon: GraduationCap, top: '15%', left: '10%', delay: 0 },
  { Icon: BookOpen, top: '40%', left: '85%', delay: 1 },
  { Icon: Bot, top: '70%', left: '15%', delay: 2 },
  { Icon: Cpu, top: '20%', left: '80%', delay: 3 },
  { Icon: Monitor, top: '85%', left: '75%', delay: 4 },
  { Icon: Zap, top: '50%', left: '5%', delay: 5 },
];

// Generate 20 random particles
const PARTICLES = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  duration: 10 + Math.random() * 20,
  delay: Math.random() * 5,
  size: 2 + Math.random() * 4
}));

const Background = () => {
  return (
    <div className="premium-bg-wrapper">
      {/* Animated Gradient Mesh Background */}
      <div className="bg-gradient-mesh"></div>

      {/* Subtle Grid Pattern Overlay */}
      <div className="premium-grid-pattern"></div>
      
      {/* Animated Gradient Blobs */}
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>
      <div className="bg-blob blob-3"></div>

      {/* Tiny Animated Particles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={`particle-${p.id}`}
          className="bg-particle"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{
            y: [0, -100],
            x: [0, Math.random() * 40 - 20],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}

      {/* Floating Icons */}
      {ICONS.map((item, idx) => (
        <motion.div
          key={`icon-${idx}`}
          className="bg-floating-icon"
          style={{ top: item.top, left: item.left }}
          animate={{
            y: [0, -25, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 12,
            delay: item.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <item.Icon size={40} strokeWidth={1} />
        </motion.div>
      ))}
    </div>
  );
};

export default Background;
