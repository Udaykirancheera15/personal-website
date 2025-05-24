import React, { createContext, useState, useContext, useCallback } from 'react';
import { sendMessage } from '../api/aiAssistant';

const INITIAL_SUGGESTIONS = [
  "What are Cheera's technical skills?",
  "Can you summarize Cheera's experience?",
  "What projects has Cheera worked on?",
  "What makes Cheera a strong candidate?",
  "How can I contact Cheera?"
];

const AiAssistantContext = createContext();

export const useAiAssistant = () => useContext(AiAssistantContext);

export const AiAssistantProvider = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Hello! I\'m Taurus-AI, here to provide information about Cheera\'s professional profile. How can I assist you today?' 
    }
  ]);
  const [error, setError] = useState(null);

  const toggleChat = useCallback(() => {
    setIsChatOpen(prev => !prev);
    if (!isChatOpen) {
      setMessages([
        { 
          role: 'assistant', 
          content: 'Hello! I\'m Taurus-AI, here to provide information about Cheera\'s professional profile. How can I assist you today?' 
        }
      ]);
    }
  }, [isChatOpen]);

  const handleSendMessage = useCallback(async (messageText) => {
    if (!messageText.trim()) return;
    
    const userMessage = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await sendMessage(messageText);
      setMessages(prev => [
        ...prev, 
        { role: 'assistant', content: response }
      ]);
    } catch (err) {
      setError('Connection issue. Please try again.');
      setMessages(prev => [
        ...prev,
        { 
          role: 'assistant', 
          content: 'Apologies, I encountered a technical issue. Please try your question again.' 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearChat = useCallback(() => {
    setMessages([
      { 
        role: 'assistant', 
        content: 'Chat cleared. How may I assist you with information about Cheera?' 
      }
    ]);
  }, []);

  const value = {
    isChatOpen,
    toggleChat,
    messages,
    isLoading,
    error,
    handleSendMessage,
    clearChat,
    suggestions: INITIAL_SUGGESTIONS
  };

  return (
    <AiAssistantContext.Provider value={value}>
      {children}
    </AiAssistantContext.Provider>
  );
};
