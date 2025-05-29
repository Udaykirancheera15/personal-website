/**
 * Main server file for portfolio with AI and contact form
 */
const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3000; // Changed to match your AI server

// CORS configuration
const allowedOrigins = (process.env.CORS_ALLOWED_ORIGIN || 'http://localhost:5173,http://localhost:3000,https://cheera-udaykiran-wlj7.onrender.com,https://cheera-udaykiran.onrender.com').split(',');

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    email_configured: !!process.env.EMAIL_USER,
    port: PORT
  });
});

// Load AI routes first (they seem to be working)
try {
  const aiRoutes = require('./routes/ai.cjs');
  app.use('/api/ai', aiRoutes);
  console.log('✅ AI routes loaded successfully');
} catch (err) {
  console.log('❌ AI routes failed to load:', err.message);
}

// Contact routes
try {
	const contactRoutes = require('./routes/contact.cjs');
	app.use('/api/contact', contactRoutes);

  console.log('✅ Contact routes loaded successfully');
} catch (err) {
  console.log('❌ Contact routes failed to load:', err.message);
}

// Serve static files
app.use(express.static(path.join(__dirname, '..', 'dist')));

// Error handling
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error',
    message: err.message
  });
});

// SPA fallback
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
  } else {
    res.status(404).json({ error: 'API endpoint not found' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 Email: ${process.env.EMAIL_USER ? 'Configured ✅' : 'Not configured ❌'}`);
  console.log(`🤖 AI Assistant: Available`);
  console.log(`📝 Contact Form: Available`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});
