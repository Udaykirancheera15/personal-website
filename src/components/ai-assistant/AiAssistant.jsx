/**
 * AI Assistant Component
 * This is the main chatbot interface component
 */
import React, { useState, useEffect, useRef } from 'react';
import { useAiAssistant } from '../../context/AiAssistantContext';
import ChatMessage from './ChatMessage';
import ChatSuggestions from './ChatSuggestions';
import Preloader from './Preloader';
import './AiAssistant.scss';

// Icons
import { FiSend, FiX, FiMessageSquare, FiRefreshCw } from 'react-icons/fi';

const AiAssistant = () => {
  const { 
    isChatOpen, 
    toggleChat, 
    messages, 
    isLoading, 
    handleSendMessage,
    clearChat,
    suggestions 
  } = useAiAssistant();
  
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Focus input when chat is opened
  useEffect(() => {
    if (isChatOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 300);
    }
  }, [isChatOpen]);
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      handleSendMessage(input);
      setInput('');
    }
  };
  
  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };
  
  if (!isChatOpen) return null;
  
  return (
    <div className="ai-assistant">
      <div className="ai-assistant-header">
        <div className="ai-assistant-title">
          <FiMessageSquare />
          <h3>AI-ASSISTANT</h3>
        </div>
        <div className="ai-assistant-actions">
          <button 
            className="clear-button" 
            onClick={clearChat} 
            title="Clear chat"
            aria-label="Clear chat"
          >
            <FiRefreshCw />
          </button>
          <button 
            className="close-button" 
            onClick={toggleChat}
            aria-label="Close chat"
          >
            <FiX />
          </button>
        </div>
      </div>
      
      <div className="ai-assistant-messages">
        {messages.map((message, index) => (
          <ChatMessage 
            key={index} 
            message={message} 
            isLastMessage={index === messages.length - 1}
          />
        ))}
        
        {isLoading && <Preloader />}
        
        <div ref={messagesEndRef} />
      </div>
      
      {messages.length === 1 && (
        <ChatSuggestions 
          suggestions={suggestions} 
          onSuggestionClick={handleSuggestionClick} 
        />
      )}
      
      <form className="ai-assistant-input" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button 
          type="submit" 
          disabled={!input.trim() || isLoading}
          aria-label="Send message"
        >
          <FiSend />
        </button>
      </form>
    </div>
  );
};

export default AiAssistant;
