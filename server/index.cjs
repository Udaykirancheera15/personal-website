/**
 * Main server file for the portfolio with AI assistant integration
 * This file sets up the Express server and configures routes
 */
const express = require('express');
const path = require('path');
const cors = require('cors'); // For cross-origin requests during development
const dotenv = require('dotenv');
// Load environment variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes
// Serve static assets from the front-end build
app.use(express.static(path.join(__dirname, '..', 'dist')));
// Routes
const aiRoutes = require('./routes/ai.cjs');
const contactRoutes = require('./routes/contact.cjs');
app.use('/api/ai', aiRoutes);
app.use('/api/contact', contactRoutes);
// Fallback for SPA (React Router support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});
// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log(`AI assistant is ready to chat!`);
});

