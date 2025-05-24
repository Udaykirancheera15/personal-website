/**
 * AI Assistant API Client
 * This file handles communication with the backend AI service
 */
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Sends a message to the AI assistant and gets a response
 * @param {string} message - User message to send to the AI
 * @returns {Promise<string>} - The AI's response
 */
export const sendMessage = async (message) => {
  try {
    // Send request to backend API
    const response = await axios.post(`${API_URL}/api/ai/chat`, { message });

    // Handle different response formats
    if (typeof response.data === 'string') {
      return response.data;
    } else if (response.data.reply) {
      return response.data.reply;
    } else if (response.data.response) {
      return response.data.response;
    } else if (response.data.generated_text) {
      return response.data.generated_text;
    }

    throw new Error('Unexpected response format from server');
  } catch (error) {
    console.error('Error sending message to AI:', error);

    // Extract error message from different possible locations
    const errorMessage = 
      error.response?.data?.error?.message || 
      error.response?.data?.error ||
      error.response?.data?.details ||
      error.message;

    // Try fallback API if available
    try {
      const fallbackResponse = await axios.post(`${API_URL}/api/ai/chat/fallback`, { message });
      if (fallbackResponse.data.reply) {
        return fallbackResponse.data.reply;
      }
    } catch (fallbackError) {
      // Fallback also failed
      console.error('Fallback AI also failed:', fallbackError);
    }

    throw new Error(errorMessage || 'Failed to get response from AI assistant');
  }
};

/**
 * Checks if the AI service is available
 * @returns {Promise<boolean>} - True if the service is available
 */
export const checkAIServiceStatus = async () => {
  try {
    await axios.get(`${API_URL}/api/ai/status`);
    return true;
  } catch (error) {
    console.warn('AI service might be unavailable:', error.message);
    return false;
  }
};
