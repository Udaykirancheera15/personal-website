import React from 'react';
import { motion } from 'framer-motion';
import './Preloader.scss';

const Preloader = () => {
  return (
    <div className="chat-preloader">
      <div className="avatar assistant-avatar">
        <div className="robot-face">
          <div className="eye left"></div>
          <div className="eye right"></div>
        </div>
      </div>
      <div className="typing-indicator">
        <motion.div 
          className="dot"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
        <motion.div 
          className="dot"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
        />
        <motion.div 
          className="dot"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
        />
      </div>
    </div>
  );
};

export default Preloader;
