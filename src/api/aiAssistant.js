/**
 * AI Assistant API Client
 * This file handles communication with the backend AI service
 */
import axios from 'axios';

// Use VITE_API_URL if set, otherwise default based on environment
const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === 'production' 
    ? window.location.origin  // Use same origin in production
    : 'http://localhost:3000');

/**
 * Sends a message to the AI assistant and gets a response
 * @param {string} message - User message to send to the AI
 * @returns {Promise<string>} - The AI's response
 */
export const sendMessage = async (message) => {
  try {
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      throw new Error('Message cannot be empty');
    }

    const response = await axios.post(`${API_URL}/api/ai/chat`, 
      { message: message.trim() },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 15000 // 15 second timeout
      }
    );

    if (!response.data) {
      throw new Error('Empty response from server');
    }

    // Handle the Gemini response format
    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return response.data.response || 
           response.data.text ||
           "Hi! I'm here to help but my daily limit has been exhausted. Could you please try after some time 😊";
    
  } catch (error) {
    console.error('AI Request Failed:', {
      config: error.config,
      response: error.response?.data,
      message: error.message
    });

    // Return a friendly error message
    return "Hi there! 👋 I'm currently having some technical difficulties. " +
           "You can reach Uday directly at cheeraudaykiran@gmail.com. " +
           "How can I assist you? 😊";
  }
};

/**
 * Checks if the AI service is available
 * @returns {Promise<boolean>} - True if the service is available
 */
export const checkAIServiceStatus = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/ai/health`, {
      timeout: 5000
    });
    
    return response.data?.status === 'ok' || 
           response.data?.healthy === true || 
           response.status === 200;
           
  } catch (error) {
    console.warn('AI service status check failed:', {
      error: error.response?.data || error.message,
      endpoint: `${API_URL}/api/ai/health`
    });
    return false;
  }
};

/**
 * Utility function to verify API configuration
 */
export const verifyAPIConfig = () => {
  console.group('API Configuration');
  console.log('API Base URL:', API_URL);
  console.log('Environment Variables:', {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    NODE_ENV: import.meta.env.MODE
  });
  console.groupEnd();
  
  return {
    apiUrl: API_URL,
    env: import.meta.env.MODE
  };
};
