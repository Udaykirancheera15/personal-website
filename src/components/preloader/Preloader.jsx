import React from 'react';
import { motion } from 'framer-motion';
import LogoAnimation from './LogoAnimation';
import './Preloader.scss';

const Preloader = () => {
  return (
    <motion.div 
      className="preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="preloader-content">
        <LogoAnimation />
        <motion.div 
          className="loading-bar-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="loading-bar"></div>
        </motion.div>
        <motion.p
          className="loading-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          Loading awesome content...
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Preloader;
