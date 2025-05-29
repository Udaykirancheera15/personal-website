/**
 * AI Routes handler
 * This file manages the API endpoints for interacting with the AI assistant
 */
const express = require('express');
const router = express.Router();
const { getGeminiResponse } = require('../utils/aiProviders.cjs');

// Middleware to log requests
router.use((req, res, next) => {
  console.log(`AI Route: ${req.method} ${req.path} at ${new Date().toISOString()}`);
  next();
});

// POST endpoint for chat interactions
router.post('/chat', async (req, res) => {
  try {
    console.log('Full headers:', req.headers);
    console.log('Raw body:', req.body);
    
    const { message } = req.body;
    
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Valid message is required',
        received: typeof message 
      });
    }

    const trimmedMessage = message.trim();
    console.log('Processing message:', trimmedMessage);

    // Use Gemini as the AI provider
    const response = await getGeminiResponse(trimmedMessage);
    
    console.log('AI response generated successfully');
    
    // Return response in the format your frontend expects
    res.json({ 
      response: response,  // Changed from 'reply' to 'response'
      reply: response,     // Keep both for compatibility
      timestamp: new Date().toISOString(),
      provider: 'gemini'
    });
    
  } catch (error) {
    console.error('AI Chat Error:', error);
    
    // Return a friendly error message
    const fallbackMessage = "Hi there! 👋 I'm currently having some technical difficulties. " +
                           "You can reach Uday directly at cheeraudaykiran@gmail.com. " +
                           "How can I assist you? 😊";
    
    res.status(500).json({ 
      response: fallbackMessage,  // Changed from 'reply' to 'response'
      reply: fallbackMessage,     // Keep both for compatibility
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    availableEndpoints: ['/chat'],
    envStatus: {
      gemini: !!process.env.GEMINI_API_KEY,
      openrouter: !!process.env.OPENROUTER_API_KEY,
      huggingface: !!process.env.HUGGING_FACE_API_KEY
    }
  });
});

// Test endpoint for debugging
router.post('/test', (req, res) => {
  console.log('Test endpoint called with:', req.body);
  res.json({ 
    message: 'Test endpoint working!',
    received: req.body,
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
