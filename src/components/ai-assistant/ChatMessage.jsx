/**
 * Chat Message Component
 * Renders individual chat messages with appropriate styling
 */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

// Animation variants
const messageVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const ChatMessage = ({ message, isLastMessage }) => {
  const { role, content } = message;
  const isAssistant = role === 'assistant';
  
  // Format links in messages
  const formatMessage = (text) => {
    return text;
  };
  
  return (
    <motion.div
      className={`chat-message ${isAssistant ? 'assistant' : 'user'}`}
      initial="hidden"
      animate="visible"
      variants={messageVariants}
      data-testid={`${role}-message`}
    >
      {isAssistant ? (
        <div className="avatar assistant-avatar">
          {/* You can add an assistant avatar icon here */}
          🤖
        </div>
      ) : (
        <div className="avatar user-avatar">
          {/* You can add a user avatar icon here */}
          👤
        </div>
      )}
      
      <div className="message-content">
        {/* Use ReactMarkdown to render markdown content */}
        <ReactMarkdown>{formatMessage(content)}</ReactMarkdown>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
