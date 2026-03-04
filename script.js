/**
 * Vintage Portfolio - Main JavaScript
 * Contains: Typewriter effect, AI Chat, Animations, Contact Form
 */

// ========================================
// Portfolio Data for AI Chat
// ========================================
const portfolioData = {
    name: "Udaykiran Cheera",
    title: "AI/ML Engineer & Full Stack Developer",
    education: "Master's in Computer Science at Purdue University (AI & ML Specialization)",
    skills: [
        "Python", "TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "NLP", "GNN", "RAG",
        "React", "Node.js", "Express", "MongoDB", "SQL", "JavaScript", "HTML/CSS",
        "Git", "Docker", "AWS", "Linux", "Jira", "Datadog"
    ],
    experience: [
        {
            role: "Graduate Teaching Assistant",
            company: "Purdue University",
            period: "Aug 2023 - Present",
            details: "Teaching CS500 - Discrete Mathematics, grading assignments, mentoring 60+ students"
        },
        {
            role: "AI/ML Intern",
            company: "WorkWise AI",
            period: "May 2023 - Aug 2023",
            details: "Built ML pipelines, fine-tuned LLMs, developed Support Ticket Classification system"
        },
        {
            role: "Software Engineer",
            company: "Saketa",
            period: "Jun 2022 - May 2023",
            details: "Developed enterprise applications, implemented features, optimized performance"
        }
    ],
    projects: [
        {
            name: "GNN-based Drug Response Prediction",
            description: "Predicting drug response in cancer cell lines using Graph Neural Networks and multi-omics data"
        },
        {
            name: "Support Ticket Classification",
            description: "NLP-based system to automatically categorize and prioritize support tickets"
        },
        {
            name: "MCA - Malicious Code Analyzer",
            description: "Desktop application to detect and analyze malware using static and dynamic analysis"
        },
        {
            name: "Honeypot Deployment",
            description: "Deployed T-Pot honeypot to capture and analyze attack patterns and malware"
        },
        {
            name: "GLP - AI Logistics Platform",
            description: "Optimized logistics operations using ML for route optimization and demand forecasting"
        },
        {
            name: "Digital Forensics Toolkit",
            description: "Comprehensive toolkit for digital evidence collection and analysis"
        }
    ],
    certifications: [
        "Deep Learning Specialization - Coursera",
        "Machine Learning Specialization - Coursera",
        "AWS Certified Solutions Architect",
        "Google Data Analytics Professional Certificate",
        "Microsoft Azure AI Engineer Associate"
    ],
    contact: {
        email: "udaykirancheera15@gmail.com",
        location: "West Lafayette, Indiana",
        linkedin: "linkedin.com/in/udaykiran-cheera",
        github: "github.com/Udaykirancheera15"
    }
};

// ========================================
// AI Response Generator
// ========================================
function generateAIResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Skills related queries
    if (message.includes('skill') || message.includes('tech') || message.includes('tech stack') || message.includes('know')) {
        return `Udaykiran has expertise in:\n\n• **AI/ML**: Python, TensorFlow, PyTorch, Scikit-learn, OpenCV, NLP, GNN, RAG\n• **Full Stack**: React, Node.js, Express, MongoDB, SQL, JavaScript\n• **Tools**: Git, Docker, AWS, Linux, Jira, Datadog\n\nWould you like more details about any specific technology?`;
    }
    
    // Experience related queries
    if (message.includes('experience') || message.includes('work') || message.includes('job') || message.includes('intern')) {
        return `Here's Udaykiran's work experience:\n\n1. **Graduate Teaching Assistant** at Purdue University (Aug 2023 - Present)\n   Teaching CS500, mentoring 60+ students\n\n2. **AI/ML Intern** at WorkWise AI (May 2023 - Aug 2023)\n   Built ML pipelines and Support Ticket Classification\n\n3. **Software Engineer** at Saketa (Jun 2022 - May 2023)\n   Developed enterprise applications\n\nWould you like more details?`;
    }
    
    // Projects related queries
    if (message.includes('project') || message.includes('work') || message.includes('built') || message.includes('developed')) {
        return `Udaykiran has built several projects:\n\n• **GNN-based Drug Response Prediction** - ML for cancer treatment\n• **Support Ticket Classification** - NLP system\n• **MCA - Malicious Code Analyzer** - Security tool\n• **Honeypot Deployment** - Network security\n• **GLP - AI Logistics Platform** - Logistics optimization\n• **Digital Forensics Toolkit** - Forensics analysis\n\nWhich project would you like to know more about?`;
    }
    
    // Education related queries
    if (message.includes('education') || message.includes('study') || message.includes('degree') || message.includes('purdue')) {
        return `Udaykiran is currently pursuing a **Master's in Computer Science** at Purdue University with a specialization in **AI and ML**.\n\nThis graduate program focuses on advanced machine learning, deep learning, and artificial intelligence techniques.`;
    }
    
    // Contact related queries
    if (message.includes('contact') || message.includes('email') || message.includes('reach') || message.includes('hire')) {
        return `You can reach Udaykiran through:\n\n• **Email**: udaykirancheera15@gmail.com\n• **LinkedIn**: linkedin.com/in/udaykiran-cheera\n• **GitHub**: github.com/Udaykirancheera15\n• **Location**: West Lafayette, Indiana\n\nFeel free to connect!`;
    }
    
    // Certification related queries
    if (message.includes('certification') || message.includes('certificate') || message.includes('certified')) {
        return `Udaykiran has several certifications:\n\n• Deep Learning Specialization - Coursera\n• Machine Learning Specialization - Coursera\n• AWS Certified Solutions Architect\n• Google Data Analytics Professional Certificate\n• Microsoft Azure AI Engineer Associate\n\nWould you like more details?`;
    }
    
    // About/Introduction
    if (message.includes('who') || message.includes('about') || message.includes('intro') || message.includes('yourself')) {
        return `Hi! I'm Udaykiran Cheera, an AI/ML Engineer and Full Stack Developer.\n\nI'm currently pursuing my Master's in Computer Science at Purdue University with a specialization in AI & ML. I have 2+ years of experience building intelligent systems and scalable web applications.\n\nI specialize in Machine Learning, Deep Learning, NLP, and Full Stack Development. Would you like to know more about my skills, projects, or experience?`;
    }
    
    // Default response
    return `Thanks for your question! I know quite a bit about Udaykiran's background. You can ask me about:\n\n• His **skills** and technical expertise\n• His **work experience**\n• His **projects**\n• His **education** at Purdue\n• How to **contact** him\n• His **certifications**\n\nWhat would you like to know?`;
}

// ========================================
// Typewriter Effect
// ========================================
const phrases = [
    "Hi, I'm Udaykiran Cheera",
    "AI/ML Engineer",
    "Full Stack Developer",
    "Problem Solver"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterElement;

function initTypewriter() {
    typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;
    
    typewrite();
}

function typewrite() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }
    
    setTimeout(typewrite, typeSpeed);
}

// ========================================
// Navigation
// ========================================
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.vintage-nav');
        if (nav) {
            if (window.scrollY > 50) {
                nav.style.boxShadow = '0 4px 20px rgba(44, 36, 22, 0.25)';
            } else {
                nav.style.boxShadow = '0 4px 20px rgba(44, 36, 22, 0.15)';
            }
        }
    });
}

// ========================================
// AI Chat Widget
// ========================================
function initAIChat() {
    const chatToggle = document.getElementById('chatToggle');
    const chatWidget = document.getElementById('aiChat');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!chatToggle || !chatWidget) return;
    
    // Toggle chat
    chatToggle.addEventListener('click', () => {
        chatWidget.classList.toggle('active');
        if (chatWidget.classList.contains('active')) {
            chatToggle.classList.add('hidden');
            chatInput?.focus();
        }
    });
    
    // Close chat
    chatClose?.addEventListener('click', () => {
        chatWidget.classList.remove('active');
        chatToggle.classList.remove('hidden');
    });
    
    // Send message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';
        
        // Simulate AI thinking
        setTimeout(() => {
            const response = generateAIResponse(message);
            addMessage(response, 'bot');
        }, 500);
    }
    
    chatSend?.addEventListener('click', sendMessage);
    chatInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    
    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type === 'user' ? 'user-message' : 'bot-message'}`;
        messageDiv.innerHTML = `<p>${text.replace(/\n/g, '<br>')}</p>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// ========================================
// Contact Form
// ========================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        
        try {
            // Simulate form submission (replace with actual endpoint)
            // For now, we'll show a success message
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show success message
            form.classList.add('form-success');
            submitBtn.innerHTML = '<span>✓ Message Sent!</span>';
            
            // Reset form
            setTimeout(() => {
                form.reset();
                form.classList.remove('form-success');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                alert('Thank you for your message! Udaykiran will get back to you soon.');
            }, 2000);
            
        } catch (error) {
            console.error('Form submission error:', error);
            submitBtn.innerHTML = '<span>Error - Try Again</span>';
            submitBtn.disabled = false;
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
            }, 2000);
        }
    });
}

// ========================================
// Scroll Animations
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.skill-category, .timeline-item, .project-card, .stat-box').forEach(el => {
        observer.observe(el);
    });
}

// ========================================
// Lazy Loading Images
// ========================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// Initialize Everything
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initTypewriter();
    initNavigation();
    initAIChat();
    initContactForm();
    initScrollAnimations();
    initLazyLoading();
});

// Add CSS for scroll animations
const style = document.createElement('style');
style.textContent = `
    .skill-category, .timeline-item, .project-card, .stat-box {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .skill-category.fade-in, .timeline-item.fade-in, .project-card.fade-in, .stat-box.fade-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .skill-category:nth-child(1), .stat-box:nth-child(1) { transition-delay: 0.1s; }
    .skill-category:nth-child(2), .stat-box:nth-child(2) { transition-delay: 0.2s; }
    .skill-category:nth-child(3), .stat-box:nth-child(3) { transition-delay: 0.3s; }
    
    .timeline-item:nth-child(1) { transition-delay: 0.1s; }
    .timeline-item:nth-child(2) { transition-delay: 0.2s; }
    .timeline-item:nth-child(3) { transition-delay: 0.3s; }
    
    .project-card:nth-child(1) { transition-delay: 0.1s; }
    .project-card:nth-child(2) { transition-delay: 0.15s; }
    .project-card:nth-child(3) { transition-delay: 0.2s; }
    .project-card:nth-child(4) { transition-delay: 0.25s; }
    .project-card:nth-child(5) { transition-delay: 0.3s; }
    .project-card:nth-child(6) { transition-delay: 0.35s; }
`;
document.head.appendChild(style);
