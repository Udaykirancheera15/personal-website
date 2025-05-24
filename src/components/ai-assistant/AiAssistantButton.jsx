import React from 'react';
import { motion } from 'framer-motion';
import { useAiAssistant } from '../../context/AiAssistantContext';
import { RiRobot2Line } from 'react-icons/ri';
import './AiAssistantButton.scss';

const AiAssistantButton = () => {
  const { isChatOpen, toggleChat } = useAiAssistant();

  return (
    <motion.button
      className="ai-assistant-button"
      onClick={toggleChat}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isChatOpen ? "Close AI assistant" : "Open AI assistant"}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <RiRobot2Line />
      <span className="button-text">
        {isChatOpen ? "Close" : "Taurus-AI"}
      </span>
    </motion.button>
  );
};

export default AiAssistantButton;
