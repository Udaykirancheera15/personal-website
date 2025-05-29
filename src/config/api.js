// API Configuration for different environments
const config = {
  development: {
    API_BASE_URL: 'http://localhost:3000',
  },
  production: {
    API_BASE_URL: 'https://portfolio-backend-v6dn.onrender.com', // Replace with your actual backend service URL
  }
};

const environment = import.meta.env.MODE || 'development';
export const API_CONFIG = config[environment];

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.API_BASE_URL}${endpoint}`;
};