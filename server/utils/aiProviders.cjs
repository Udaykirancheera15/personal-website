/**
 * AI Providers implementation
 * This file contains functions to interact with different AI providers
 */
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Load resume data for AI context
const resumeData = {
  // You can put your actual resume data here as JSON
  // This will be used to provide context to the AI assistant
  name: "Your Name",
  title: "Your Professional Title",
  skills: ["JavaScript", "React", "Node.js", "Express", "Three.js"],
  // Add more details from your resume
};

// System prompt template for Gemini - includes emoji style instruction and resume context
const systemPrompt = `
You are a helpful and friendly AI assistant for a portfolio website.
Your name is CheeraBot, designed to be helpful, friendly, and engaging.

STYLE INSTRUCTIONS:
- Use emoji occasionally to make your responses more friendly 😊
- Keep responses concise and helpful
- Be conversational and engaging
- Occasionally use markdown formatting for emphasis
- Sound enthusiastic and positive

KNOWLEDGE CONTEXT:
You have access to the following resume information:
${JSON.stringify(resumeData, null, 2)}

Use this information when answering questions about skills, projects, or experience.
`;

/**
 * Get a response from Google's Gemini API
 * @param {string} userMessage - The message from the user
 * @returns {Promise<string>} - The AI response
 */
const getGeminiResponse = async (userMessage) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error('Gemini API key is not configured');
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            role: "user",
            parts: [
              { text: systemPrompt }, 
              { text: userMessage }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }
    );

    // Extract the response text from Gemini API
    const generatedText = response.data.candidates[0].content.parts[0].text;
    return generatedText;
  } catch (error) {
    console.error("Gemini API error:", error?.response?.data || error.message);
    // Fall back to OpenRouter if Gemini fails
    return callOpenRouter(userMessage);
  }
};

/**
 * Get a response from Hugging Face API
 * @param {string} userMessage - The message from the user
 * @returns {Promise<string>} - The AI response
 */
const getHuggingFaceResponse = async (userMessage) => {
  try {
    const apiKey = process.env.HUGGING_FACE_API_KEY;
    
    if (!apiKey) {
      throw new Error('Hugging Face API key is not configured');
    }

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      {
        inputs: `<s>[INST] ${systemPrompt}\n\n${userMessage} [/INST]`,
        parameters: {
          max_new_tokens: 1024,
          temperature: 0.7,
          top_p: 0.95,
          do_sample: true,
        }
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data[0].generated_text;
  } catch (error) {
    console.error("Hugging Face API error:", error?.response?.data || error.message);
    return "Sorry, I'm having trouble connecting to my AI services right now. Please try again later! 🙁";
  }
};

/**
 * Fallback to OpenRouter API
 * @param {string} userMessage - The message from the user
 * @returns {Promise<string>} - The AI response
 */
const callOpenRouter = async (userMessage) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: "Bearer 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",
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "CheeraPortfolio",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("OpenRouter error:", error?.response?.data || error.message);
    return "Sorry, I'm having trouble connecting. Please try again later! 🙂";
  }
};

module.exports = { 
  getGeminiResponse, 
  getHuggingFaceResponse,
  callOpenRouter 
};
