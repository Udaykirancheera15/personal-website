import { useState } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import Button from '../ui/Button';
import axios from 'axios';
import './Contact.scss';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Get the API base URL from environment or use default
      const baseUrl = import.meta.env.VITE_API_URL || 
        (import.meta.env.MODE === 'production' 
          ? 'https://portfolio-backend-v6dn.onrender.com'  // Update with your actual backend URL
          : 'http://localhost:3000');
      const apiUrl = `${baseUrl}/api/contact`;

      
      // Send form data to the backend
      const response = await axios.post(apiUrl, formData);
      
      if (response.data.success) {
        setSubmitStatus({ 
          success: true, 
          message: response.data.message || 'Your message has been sent successfully!' 
        });
        // Reset form after successful submission
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(response.data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({ 
        success: false, 
        message: error.response?.data?.message || 'Failed to send message. Please try again later.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact" ref={ref}>
      <div className="contact-shape-1"></div>
      <div className="contact-shape-2"></div>
      <div className="section-header">
        <h2 className="section-title">Contact Me</h2>
        <p className="section-subtitle">
          Get in touch for collaborations, opportunities, or just to say hello
        </p>
      </div>
      <div className="contact-container">
        <motion.div 
          className="contact-info" 
          initial={{ opacity: 0, x: -50 }} 
          animate={isVisible ? { opacity: 1, x: 0 } : {}} 
          transition={{ duration: 0.7 }}
        >
          <h3>Let's Connect</h3>
          <p>
            I'm always interested in new opportunities, collaborations, and challenges.
            Whether you have a project in mind, a question about my work, or just want
            to say hello, feel free to reach out. I'll get back to you as soon as possible.
          </p>
          <div className="contact-details">
            <motion.div 
              className="contact-item" 
              initial={{ opacity: 0, y: 20 }} 
              animate={isVisible ? { opacity: 1, y: 0 } : {}} 
              transition={{ delay: 0.2, duration: 0.5 }} 
              whileHover={{ x: 5 }}
            >
              <div className="contact-icon"><FaMapMarkerAlt /></div>
              <div className="contact-text"><h4>Location</h4><p>Andhra Pradesh, India</p></div>
            </motion.div>
            <motion.div 
              className="contact-item" 
              initial={{ opacity: 0, y: 20 }} 
              animate={isVisible ? { opacity: 1, y: 0 } : {}} 
              transition={{ delay: 0.3, duration: 0.5 }} 
              whileHover={{ x: 5 }}
            >
              <div className="contact-icon"><FaEnvelope /></div>
              <div className="contact-text"><h4>Email</h4><p>cheeraudaykiran@gmail.com</p></div>
            </motion.div>
            <motion.div 
              className="contact-item" 
              initial={{ opacity: 0, y: 20 }} 
              animate={isVisible ? { opacity: 1, y: 0 } : {}} 
              transition={{ delay: 0.4, duration: 0.5 }} 
              whileHover={{ x: 5 }}
            >
              <div className="contact-icon"><FaPhone /></div>
              <div className="contact-text"><h4>Phone</h4><p>+91 949-448-1055</p></div>
            </motion.div>
          </div>
          <motion.div 
            className="contact-social" 
            initial={{ opacity: 0, y: 20 }} 
            animate={isVisible ? { opacity: 1, y: 0 } : {}} 
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.a 
              href="https://github.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link" 
              whileHover={{ y: -5, rotate: 10 }}
            >
              <FaGithub />
            </motion.a>
            <motion.a 
              href="https://linkedin.com/in/uday116/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link" 
              whileHover={{ y: -5, rotate: 10 }}
            >
              <FaLinkedinIn />
            </motion.a>
            <motion.a 
              href="https://twitter.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link" 
              whileHover={{ y: -5, rotate: 10 }}
            >
              <FaTwitter />
            </motion.a>
          </motion.div>
        </motion.div>
        <motion.div 
          className="contact-form-container" 
          initial={{ opacity: 0, x: 50 }} 
          animate={isVisible ? { opacity: 1, x: 0 } : {}} 
          transition={{ duration: 0.7 }}
        >
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
                type="text" 
                id="name" 
                name="name" 
                className="form-control" 
                placeholder=" " 
                required 
                value={formData.name} 
                onChange={handleChange} 
              />
              <label htmlFor="name" className="form-label">Your Name</label>
            </div>
            <div className="form-group">
              <input 
                type="email" 
                id="email" 
                name="email" 
                className="form-control" 
                placeholder=" " 
                required 
                value={formData.email} 
                onChange={handleChange} 
              />
              <label htmlFor="email" className="form-label">Your Email</label>
            </div>
            <div className="form-group">
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                className="form-control" 
                placeholder=" " 
                required 
                value={formData.subject} 
                onChange={handleChange} 
              />
              <label htmlFor="subject" className="form-label">Subject</label>
            </div>
            <div className="form-group">
              <textarea 
                id="message" 
                name="message" 
                className="form-control" 
                placeholder=" " 
                required 
                value={formData.message} 
                onChange={handleChange}
              ></textarea>
              <label htmlFor="message" className="form-label">Your Message</label>
            </div>
            {submitStatus && (
              <div className={`submit-status ${submitStatus.success ? 'success' : 'error'}`}>
                {submitStatus.message}
              </div>
            )}
            <Button 
              type="submit" 
              variant="accent" 
              disabled={isSubmitting} 
              className="submit-btn"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
