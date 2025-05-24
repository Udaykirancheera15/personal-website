import React from 'react';
import { motion } from 'framer-motion';

const LogoAnimation = () => {
  // Animation variants
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <motion.div
      variants={logoVariants}
      initial="hidden"
      animate="visible"
      className="logo-animation"
    >
      <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.circle 
          cx="50" 
          cy="50" 
          r="45" 
          stroke="url(#gradient)" 
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.path 
          d="M30 65V35L70 65V35" 
          stroke="url(#gradient)" 
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3a7bd5" />
            <stop offset="100%" stopColor="#00d2ff" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

export default LogoAnimation;
