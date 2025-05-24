/**
 * Chat Suggestions Component
 * Shows clickable suggestion buttons for common queries
 */
import React from 'react';
import { motion } from 'framer-motion';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

const ChatSuggestions = ({ suggestions, onSuggestionClick }) => {
  return (
    <motion.div 
      className="chat-suggestions"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <p className="suggestions-title">Try asking:</p>
      <div className="suggestions-container">
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={index}
            className="suggestion-button"
            onClick={() => onSuggestionClick(suggestion)}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {suggestion}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default ChatSuggestions;
