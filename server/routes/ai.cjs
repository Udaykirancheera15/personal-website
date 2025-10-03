/**
 * AI Routes handler
 * This file manages the API endpoints for interacting with the AI assistant
 */
const express = require('express');
const router = express.Router();
const { 
  getAIResponse, 
  getProviderStatus, 
  resetProviderStatus 
} = require('../utils/aiProviders.cjs');

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

    // Use intelligent AI provider rotation
    const response = await getAIResponse(trimmedMessage);
    
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

// Health check endpoint with provider status
router.get('/health', (req, res) => {
  const providerInfo = getProviderStatus();
  
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    availableEndpoints: ['/chat', '/status', '/reset'],
    ...providerInfo
  });
});

// Detailed provider status endpoint
router.get('/status', (req, res) => {
  const providerInfo = getProviderStatus();
  
  res.json({
    timestamp: new Date().toISOString(),
    system: 'AI Provider Rotation System',
    ...providerInfo,
    statistics: {
      totalProviders: Object.keys(providerInfo.providers).length,
      availableProviders: Object.values(providerInfo.providers).filter(p => p.available).length,
      providersWithErrors: Object.values(providerInfo.providers).filter(p => p.errorCount > 0).length
    }
  });
});

// Reset provider status endpoint (for admin use)
router.post('/reset', (req, res) => {
  try {
    resetProviderStatus();
    res.json({
      success: true,
      message: 'All provider statuses have been reset',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
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
