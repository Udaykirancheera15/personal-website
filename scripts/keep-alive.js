// Keep-alive script to prevent Render free tier cold starts
const https = require('https');

const BACKEND_URL = 'https://portfolio-backend.onrender.com'; // Update with your backend URL
const FRONTEND_URL = 'https://cheera-udaykiran.onrender.com'; // Update with your frontend URL

function pingService(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(`${url}/api/health`, (res) => {
      console.log(`✅ Pinged ${url} - Status: ${res.statusCode}`);
      resolve(res.statusCode);
    });
    
    req.on('error', (err) => {
      console.log(`❌ Failed to ping ${url}:`, err.message);
      reject(err);
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function keepAlive() {
  try {
    await pingService(BACKEND_URL);
    console.log(`🔄 Keep-alive ping sent at ${new Date().toISOString()}`);
  } catch (error) {
    console.error('Keep-alive failed:', error.message);
  }
}

// Ping every 14 minutes (before 15-minute sleep threshold)
setInterval(keepAlive, 14 * 60 * 1000);

// Initial ping
keepAlive();

console.log('🚀 Keep-alive service started');