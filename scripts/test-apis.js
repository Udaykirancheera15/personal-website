// Test script for API endpoints
const axios = require('axios');

const BACKEND_URL = 'https://portfolio-backend.onrender.com'; // Update with your actual URL

async function testHealthCheck() {
  try {
    console.log('🔍 Testing health check...');
    const response = await axios.get(`${BACKEND_URL}/api/health`);
    console.log('✅ Health check passed:', response.data);
    return true;
  } catch (error) {
    console.log('❌ Health check failed:', error.message);
    return false;
  }
}

async function testAIChat() {
  try {
    console.log('🤖 Testing AI chat...');
    const response = await axios.post(`${BACKEND_URL}/api/ai/chat`, {
      message: 'Hello, tell me about Uday\'s skills'
    });
    console.log('✅ AI chat working:', response.data.response?.substring(0, 100) + '...');
    return true;
  } catch (error) {
    console.log('❌ AI chat failed:', error.response?.data || error.message);
    return false;
  }
}

async function testContactForm() {
  try {
    console.log('📧 Testing contact form...');
    const response = await axios.post(`${BACKEND_URL}/api/contact`, {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Message',
      message: 'This is a test message from the API test script.'
    });
    console.log('✅ Contact form working:', response.data);
    return true;
  } catch (error) {
    console.log('❌ Contact form failed:', error.response?.data || error.message);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Starting API tests...\n');
  
  const healthOk = await testHealthCheck();
  console.log('');
  
  const aiOk = await testAIChat();
  console.log('');
  
  const contactOk = await testContactForm();
  console.log('');
  
  console.log('📊 Test Results:');
  console.log(`Health Check: ${healthOk ? '✅' : '❌'}`);
  console.log(`AI Assistant: ${aiOk ? '✅' : '❌'}`);
  console.log(`Contact Form: ${contactOk ? '✅' : '❌'}`);
  
  if (healthOk && aiOk && contactOk) {
    console.log('\n🎉 All tests passed! Your APIs are working correctly.');
  } else {
    console.log('\n⚠️ Some tests failed. Check the logs above for details.');
  }
}

runTests();