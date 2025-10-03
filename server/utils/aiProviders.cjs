/**
 * AI Providers implementation with intelligent rotation and fallback
 * This file contains functions to interact with different AI providers
 * and automatically switches between them when daily limits are reached
 */
require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Provider status tracking
const PROVIDER_STATUS_FILE = path.join(__dirname, '../provider-status.json');

// Initialize provider status
let providerStatus = {
  gemini: { available: true, lastError: null, errorCount: 0, lastUsed: null },
  openrouter: { available: true, lastError: null, errorCount: 0, lastUsed: null },
  huggingface: { available: true, lastError: null, errorCount: 0, lastUsed: null }
};

// Load existing provider status
try {
  if (fs.existsSync(PROVIDER_STATUS_FILE)) {
    const savedStatus = JSON.parse(fs.readFileSync(PROVIDER_STATUS_FILE, 'utf8'));
    providerStatus = { ...providerStatus, ...savedStatus };
  }
} catch (error) {
  console.warn('Could not load provider status:', error.message);
}

// Save provider status
const saveProviderStatus = () => {
  try {
    fs.writeFileSync(PROVIDER_STATUS_FILE, JSON.stringify(providerStatus, null, 2));
  } catch (error) {
    console.warn('Could not save provider status:', error.message);
  }
};

// Check API key availability
const checkAPIKeys = () => {
  const keys = {
    gemini: !!process.env.GEMINI_API_KEY,
    openrouter: !!process.env.OPENROUTER_API_KEY,
    huggingface: !!process.env.HUGGING_FACE_API_KEY
  };
  console.log('API Keys Status:', keys);
  return keys;
};

checkAPIKeys();

// Error detection functions
const isRateLimitError = (error) => {
  if (!error.response) return false;
  
  const status = error.response.status;
  const data = error.response.data;
  const message = error.message?.toLowerCase() || '';
  
  // Common rate limit indicators
  return (
    status === 429 || // Too Many Requests
    status === 403 || // Forbidden (often used for quota exceeded)
    (data && typeof data === 'string' && (
      data.includes('quota') ||
      data.includes('limit') ||
      data.includes('rate') ||
      data.includes('exceeded')
    )) ||
    message.includes('quota') ||
    message.includes('limit') ||
    message.includes('rate')
  );
};

const isTemporaryError = (error) => {
  if (!error.response) return true; // Network errors are usually temporary
  
  const status = error.response.status;
  return status >= 500 || status === 429 || status === 503;
};

// Provider management functions
const markProviderError = (providerName, error) => {
  const isRateLimit = isRateLimitError(error);
  const isTemp = isTemporaryError(error);
  
  providerStatus[providerName].errorCount++;
  providerStatus[providerName].lastError = {
    message: error.message,
    status: error.response?.status,
    isRateLimit,
    isTemporary: isTemp,
    timestamp: new Date().toISOString()
  };
  
  // Mark as unavailable if it's a rate limit error or too many errors
  if (isRateLimit || providerStatus[providerName].errorCount >= 3) {
    providerStatus[providerName].available = false;
    console.log(`🚫 Provider ${providerName} marked as unavailable:`, {
      isRateLimit,
      errorCount: providerStatus[providerName].errorCount,
      error: error.message
    });
  }
  
  saveProviderStatus();
};

const markProviderSuccess = (providerName) => {
  providerStatus[providerName].available = true;
  providerStatus[providerName].errorCount = 0;
  providerStatus[providerName].lastError = null;
  providerStatus[providerName].lastUsed = new Date().toISOString();
  saveProviderStatus();
};

const getNextAvailableProvider = () => {
  const apiKeys = checkAPIKeys();
  const availableProviders = [];
  
  // Check each provider
  for (const [provider, status] of Object.entries(providerStatus)) {
    if (apiKeys[provider] && status.available) {
      availableProviders.push({
        name: provider,
        lastUsed: status.lastUsed,
        errorCount: status.errorCount
      });
    }
  }
  
  if (availableProviders.length === 0) {
    // Reset all providers if none are available (daily reset scenario)
    console.log('🔄 No providers available, resetting all...');
    Object.keys(providerStatus).forEach(provider => {
      if (apiKeys[provider]) {
        providerStatus[provider].available = true;
        providerStatus[provider].errorCount = 0;
      }
    });
    saveProviderStatus();
    return getNextAvailableProvider();
  }
  
  // Sort by last used (least recently used first) and error count
  availableProviders.sort((a, b) => {
    if (a.errorCount !== b.errorCount) {
      return a.errorCount - b.errorCount;
    }
    if (!a.lastUsed) return -1;
    if (!b.lastUsed) return 1;
    return new Date(a.lastUsed) - new Date(b.lastUsed);
  });
  
  return availableProviders[0].name;
};

// Load resume data for AI context
const resumeData = {
  name: "Uday Kiran Cheera",
  title: "Machine Learning and Cybersecurity Enthusiast",
  contact: {
    phone: "+91-9494481055",
    email: "cheeraudaykiran@gmail.com",
    linkedin: "https://linkedin.com/in/uday116",
    github: "https://github.com/udaykirancheera15"
  },
  professionalSummary:
    "Driven with boundless curiosity for exploring cutting-edge technologies including machine learning, cybersecurity, and DevOps. Hands-on experience in algorithm development, predictive modeling, digital forensics, and ethical hacking. Skilled in Python scripting, penetration testing, and Linux containerization.",
  education: [
    {
      degree: "B.Tech in Information Technology",
      institution: "JNTU Vizianagaram",
      date: "May 2025"
    },
    {
      degree: "Intermediate",
      institution: "Sasi New Gen. Junior College, Velivennu",
      percentage: "94.4%",
      date: "May 2020"
    },
    {
      degree: "SSC",
      institution: "Sasi E.M High School, Velivennu",
      gpa: "9.7",
      date: "April 2018"
    }
  ],
  experience: [
    {
      title: "Cybersecurity Intern",
      company: "APSAC(Andhra Pradesh Space Applications Center) (in Association with Blackbucks Engineering Pvt Ltd.)",
      location: "Andhra Pradesh",
      date: "Jan 2025 – May 2025",
      details: [
        "Performed threat analysis and vulnerability assessments",
        "Developed risk assessment frameworks and Built an HoneyPot",
        "Implemented cybersecurity protocols"
      ]
    },
    {
      title: "Research Intern - Software Engineering (ML)",
      company: "NIT Warangal",
      date: "May 2024 – July 2024",
      details: [
        "Developed hybrid ML models for software effort estimation",
        "Implemented bio-inspired optimization (Firefly , PSO)",
        "Used Hyperopt for tuning and feature engineering"
      ]
    },
    {
      title: "Cyber Forensics Intern",
      company: "Innogeecks Technologies",
      location: "Vijayawada",
      date: "Jul 2024 – Aug 2024",
      details: [
        "Used EnCase, FTK Imager, Autopsy for investigations",
        "Automated forensics using Python, reducing time by 40%",
        "Performed penetration testing using Metasploit and Nmap"
      ]
    }
  ],
  technicalProjects: [
    {
      title: "Diabetic Retinopathy Detection using Quantum Vision Transformers",
      tools: ["PyTorch", "OpenCV", "FastAPI", "Docker"],
      date: "Dec 2024 – Apr 2025",
      highlights: [
        "Achieved 94% accuracy using quantum-enhanced Vision Transformer",
        "Reduced computational complexity by 35%",
        "Achieved High Qudriatic Kappa Score which is best for clinical validation"
      ]
    },
    {
      title: "Dynamic Graph Neural Network for Network Threat Detection",
      tools: ["PyTorch Geometric", "Wireshark", "GNS3", "Docker"],
      date: "Dec 2024 – Apr 2025",
      highlights: [
        "Achieved 92% zero-day detection accuracy",
        "Temporal graph modeling of network traffic",
        "Automated alerts for enterprise monitoring"
      ]
    },
    {
      title: "WorkWise AI Platform (IBM Hackathon)",
      tools: ["IBM Granite", "Flask", "Bootstrap"],
      date: "Apr 2025 – May 2025",
      highlights: [
        "Career guidance system aligned with UN SDG 8",
        "Bias detection and inclusive job matching",
        "Resume optimization and learning recommendations"
      ]
    },
    {
      title: "Multi-Service Cybersecurity Honeypot System",
      tools: ["ELK Stack", "Python", "Docker"],
      date: "Nov 2023 – Dec 2023",
      highlights: [
        "Simulated SSH/HTTP/FTP/Telnet services",
        "Real-time attack visualization dashboard",
        "Geolocation-based threat tracking"
      ]
    }
  ],
  skills: [
    "Python", "Java", "C/C++", "JavaScript", "R", "Rust", "SQL",
    "PyTorch", "TensorFlow", "Scikit-learn", "Keras", "OpenCV",
    "Vision Transformers", "GNNs", "CNN", "RNN", "BERT", "GPT",
    "Pandas", "NumPy", "Matplotlib", "Seaborn",
    "AWS", "IBM Cloud", "Docker", "Kubernetes", "CI/CD",
    "React.js", "Node.js", "Flask", "FastAPI", "Django",
    "PostgreSQL", "MongoDB", "MySQL", "Elasticsearch",
    "Penetration Testing", "Digital Forensics", "Threat Analysis",
    "Linux", "Vim", "GNS3", "Wireshark", "Postman", "Jupyter"
  ],
  certifications: [
  {
    name: "Micromasters in Big Data Technology",
    issuer: "Hong Kong University of Science and Technology",
    link: "https://credentials.edx.org/records/programs/shared/d29c5b1a66ba4090b7509c056736d69b"
  },
  {
    name: "Micromasters in Cybersecurity",
    issuer: "Rochester Institute of Technology",
    link: "https://credentials.edx.org/records/programs/shared/027569b35dc6468ab934e4c483476af3"
  },
  {
    name: "Certified Oracle DataBase Foundations",
    link: "https://tinyurl.com/yc28d5nr"
  },
  {
    name: "Programming in C++ Certification",
    issuer: "NPTEL",
    link: null
  },
  {
    name: "Machine Learning Master",
    issuer: "Altair",
    link: "https://openbadgefactory.com/v1/assertion/036df2b4b0ce29eaedb39900a1ded618e9404977"
  },
  {
    name: "Professional Certificate in Blockchain for Business",
    issuer: "Linux FoundationX",
    link: "https://credentials.edx.org/credentials/35a6225738e248c182c1ef87b86f2802/"
  },
  {
    name: "Cloud Application Development Foundations",
    issuer: "IBM",
    link: "https://credentials.edx.org/credentials/5f22791da593413fb972818c45787f31/"
  },
  {
    name: "Professional Certificate in Cloud Solutions Architecture",
    issuer: "AWS",
    link: "https://credentials.edx.org/credentials/016a5eddbab94900be3851938c8e09f5/"
  },
  {
    name: "DevOps on AWS",
    link: "https://credentials.edx.org/credentials/777bcc0b4a4940829b87c330e8e21945/"
  },
  {
    name: "Fundamentals of Neuroscience",
    issuer: "Harvard University",
    link: "https://credentials.edx.org/credentials/df91da51bbff4983a11bc680de2576af/"
  },
  {
    name: "Professional Certificate in Human-Robot Interaction",
    issuer: "University of Canterbury",
    link: "https://credentials.edx.org/credentials/73b4dca90f2845cbb9f71bc56b1eb21c/"
  },
  {
    name: "Introduction to Kubernetes and Cloud Native Technologies",
    issuer: "Linux Foundation",
    link: "https://credentials.edx.org/credentials/55d1716cb63a4937a73e44429384a63d/"
  },
  {
    name: "Professional Certificate in OpenSource Software Development, Linux, Git",
    issuer: "Linux Foundation",
    link: "https://credentials.edx.org/credentials/831eb21bec2f4964b196af5156752015/"
  },
  {
    name: "Rust Programming",
    issuer: "Pragmatic AI Labs",
    link: "https://credentials.edx.org/credentials/f07b334cce124723819bca65c7c88537/"
  },
  {
    name: "Secure Software Development Fundamentals",
    issuer: "Linux Foundation",
    link: "https://credentials.edx.org/credentials/886a2c72e779461ab309cbbff7ca319c/"
  },
  {
    name: "Fundamentals of Google AI for Web-Based Machine Learning",
    issuer: "Google",
    link: "https://credentials.edx.org/credentials/0a02e3e92d64430a8523af929e5c54d0/"
  },
  {
    name: "Professional Certificate in Leadership and Communication",
    issuer: "HarvardX",
    link: "https://credentials.edx.org/credentials/9ca2fdd7f7c94f06aeb63a3501f9556e/"
  },
  {
    name: "Oracle Certified Artificial Intelligence with Machine Learning in Java",
    link: "https://tinyurl.com/mpsxvenw"
  },
  {
    name: "Quantum Computing with Semiconductor Technology",
    issuer: "Delft University of Technology",
    link: "https://credentials.edx.org/credentials/d5696bfe0235404b9f8674c50313a637/"
  },
  {
    name: "Advanced Embedded Systems on Arm",
    issuer: "ArmEducationX",
    link: "https://credentials.edx.org/credentials/0c1f00d38be94eaeae3e743d29afbbe9/"
  },
  {
    name: "Professional Certificate in Stock Trading",
    issuer: "New York Institute of Finance",
    link: "https://credentials.edx.org/credentials/b99522ef5e04478daaae5e7f8eb2944c/"
  }

  ],
  leadershipAchievements: [
    "Technical Event Coordinator - ITYUKTA 2K24",
    "Technology Instructor - SKP&TVR High School",
    "Volunteer - Sikshana Foundation",
    "Published research in software engineering",
    "Open Source Contributor - ML & Cybersecurity"
  ],
  links: {
    demoRetinopathy: "https://youtu.be/diabetic-retinopathy-demo",
    demoWorkWise: "https://youtu.be/workwise-ai-demo",
    gnnRepo: "https://github.com/Udaykirancheera15/Threat_Detection_GNN",
    workwiseRepo: "https://github.com/Udaykirancheera15/workwise-ai"
  }
};

// System prompt template for Gemini - includes emoji style instruction and resume context
const systemPrompt = `
You are Taurus, a helpful and friendly AI assistant for Uday Kiran Cheera's portfolio website.

STYLE INSTRUCTIONS:
- Use emojis occasionally to make responses friendly 😊
- Keep responses concise but informative
- Be conversational and engaging
- Use markdown formatting for emphasis when needed
- Sound enthusiastic and professional

KNOWLEDGE CONTEXT:
You have access to detailed information about Uday Kiran Cheera:
${JSON.stringify(resumeData, null, 2)}

Use this information when answering questions about his skills, projects, experience, education, or background.
If someone asks about hiring, collaboration, or contacting Uday, direct them to his contact information.
`;

/**
 * Main AI response function with intelligent provider rotation
 * @param {string} userMessage - The message from the user
 * @returns {Promise<string>} - The AI response
 */
const getAIResponse = async (userMessage) => {
  const maxRetries = 3;
  let lastError = null;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const provider = getNextAvailableProvider();
    
    if (!provider) {
      throw new Error('No AI providers available');
    }
    
    console.log(`🤖 Attempting with provider: ${provider} (attempt ${attempt + 1}/${maxRetries})`);
    
    try {
      let response;
      
      switch (provider) {
        case 'gemini':
          response = await callGemini(userMessage);
          break;
        case 'openrouter':
          response = await callOpenRouter(userMessage);
          break;
        case 'huggingface':
          response = await callHuggingFace(userMessage);
          break;
        default:
          throw new Error(`Unknown provider: ${provider}`);
      }
      
      markProviderSuccess(provider);
      console.log(`✅ Success with provider: ${provider}`);
      return response;
      
    } catch (error) {
      console.error(`❌ Provider ${provider} failed:`, error.message);
      markProviderError(provider, error);
      lastError = error;
      
      // If it's not a rate limit error, try the same provider again
      if (!isRateLimitError(error) && attempt < maxRetries - 1) {
        continue;
      }
    }
  }
  
  // If all providers failed, return a friendly fallback message
  console.error('All AI providers failed:', lastError?.message);
  return "Hi there! 👋 I'm Taurus, Uday's AI assistant. I'm currently experiencing some technical difficulties, but I'm here to help! You can reach Uday directly at cheeraudaykiran@gmail.com for any inquiries. 😊";
};

/**
 * Get a response from Google's Gemini API
 * @param {string} userMessage - The message from the user
 * @returns {Promise<string>} - The AI response
 */
const callGemini = async (userMessage) => {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('Gemini API key is not configured');
  }

  const requestBody = {
    contents: [
      {
        parts: [
          { text: `${systemPrompt}\n\nUser question: ${userMessage}` }
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
  };

  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
    requestBody,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000
    }
  );

  // Check if we have a valid response
  if (response.data && response.data.candidates && response.data.candidates.length > 0) {
    const candidate = response.data.candidates[0];
    
    if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
      return candidate.content.parts[0].text;
    }
  }

  throw new Error('Invalid response structure from Gemini API');
};

/**
 * Get a response from Hugging Face API
 * @param {string} userMessage - The message from the user
 * @returns {Promise<string>} - The AI response
 */
const callHuggingFace = async (userMessage) => {
  const apiKey = process.env.HUGGING_FACE_API_KEY;
  
  if (!apiKey) {
    throw new Error('Hugging Face API key is not configured');
  }

  const response = await axios.post(
    "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
    {
      inputs: `<s>[INST] ${systemPrompt}\n\nUser: ${userMessage} [/INST]`,
      parameters: {
        max_new_tokens: 1024,
        temperature: 0.7,
        top_p: 0.95,
        do_sample: true,
        return_full_text: false
      }
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      timeout: 30000
    }
  );

  if (response.data && Array.isArray(response.data) && response.data.length > 0) {
    return response.data[0].generated_text || "I'm here to help! Could you please rephrase your question? 😊";
  }

  throw new Error('Invalid response from Hugging Face API');
};

/**
 * OpenRouter API call
 * @param {string} userMessage - The message from the user
 * @returns {Promise<string>} - The AI response
 */
const callOpenRouter = async (userMessage) => {
  // Clean up API key if it has "Bearer " prefix by accident
  const apiKeyRaw = process.env.OPENROUTER_API_KEY;
  if (!apiKeyRaw) {
    throw new Error('OpenRouter API key is not configured');
  }
  const apiKey = apiKeyRaw.startsWith('Bearer ') ? apiKeyRaw.slice(7) : apiKeyRaw;

  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "openai/gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ],
      temperature: 0.7,
      max_tokens: 1024
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "CheeraPortfolio",
      },
      timeout: 30000,
    }
  );

  if (response.data && response.data.choices && response.data.choices.length > 0) {
    return response.data.choices[0].message.content;
  }

  throw new Error('Invalid response from OpenRouter API');
};

// Additional utility functions
const getProviderStatus = () => {
  return {
    providers: providerStatus,
    apiKeys: checkAPIKeys(),
    nextProvider: getNextAvailableProvider()
  };
};

const resetProviderStatus = () => {
  Object.keys(providerStatus).forEach(provider => {
    providerStatus[provider] = {
      available: true,
      lastError: null,
      errorCount: 0,
      lastUsed: null
    };
  });
  saveProviderStatus();
  console.log('🔄 All provider statuses reset');
};

// Backward compatibility - keep the old function name
const getGeminiResponse = getAIResponse;

module.exports = { 
  // Main function (new intelligent system)
  getAIResponse,
  
  // Backward compatibility
  getGeminiResponse,
  
  // Individual provider functions
  callGemini,
  callOpenRouter,
  callHuggingFace,
  
  // Utility functions
  getProviderStatus,
  resetProviderStatus,
  
  // Legacy exports (deprecated but kept for compatibility)
  getHuggingFaceResponse: callHuggingFace
};

