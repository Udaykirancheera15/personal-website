/**
 * AI Routes handler
 * This file manages the API endpoints for interacting with the AI assistant
 */
const express = require('express');
const router = express.Router();
const { getGeminiResponse, getHuggingFaceResponse } = require('../utils/aiProviders.cjs');

// POST endpoint for chat interactions
router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Use Gemini as the primary AI provider
    const response = await getGeminiResponse(message);
    res.json({ reply: response });
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ 
      error: 'Failed to get AI response',
      details: error.message
    });
  }
});

// Fallback route using Hugging Face (for backup)
router.post('/chat/fallback', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    const response = await getHuggingFaceResponse(message);
    res.json({ reply: response });
  } catch (error) {
    console.error('Fallback AI Error:', error);
    res.status(500).json({ 
      error: 'Failed to get fallback AI response',
      details: error.message
    });
  }
});

module.exports = router;
