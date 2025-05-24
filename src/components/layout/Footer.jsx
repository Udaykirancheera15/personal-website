import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaTwitter, FaEnvelope } from 'react-icons/fa';
import './Footer.scss';

const Footer = () => {
  return (
    <footer>
      <div className="footer-waves">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
        </svg>
      </div>
      
      <div className="footer-container">
        <div className="footer-about">
          <h3>
            <span>UK</span>Portfolio
          </h3>
          <p>
            Creating innovative digital experiences with modern web technologies.
            Let's build something amazing together.
          </p>
          <div className="footer-social">
            <motion.a 
              href="https://github.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-social-link"
              whileHover={{ y: -5, rotate: 10 }}
            >
              <FaGithub />
            </motion.a>
            <motion.a 
              href="https://linkedin.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-social-link"
              whileHover={{ y: -5, rotate: 10 }}
            >
              <FaLinkedinIn />
            </motion.a>
            <motion.a 
              href="https://twitter.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-social-link"
              whileHover={{ y: -5, rotate: 10 }}
            >
              <FaTwitter />
            </motion.a>
            <motion.a 
              href="mailto:contact@example.com" 
              className="footer-social-link"
              whileHover={{ y: -5, rotate: 10 }}
            >
              <FaEnvelope />
            </motion.a>
          </div>
        </div>
        
        <div className="footer-links-container">
          <div className="footer-links-column">
            <h4 className="footer-title">Navigation</h4>
            <ul className="footer-links">
              <li><a href="#hero">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#experience">Experience</a></li>
            </ul>
          </div>
          
          <div className="footer-links-column">
            <h4 className="footer-title">More Links</h4>
            <ul className="footer-links">
              <li><a href="#projects">Projects</a></li>
              <li><a href="#certificates">Certificates</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="/resume.pdf" target="_blank">Resume</a></li>
            </ul>
          </div>
          
          <div className="footer-newsletter">
            <h4 className="footer-title">Stay Connected</h4>
            <p>Subscribe to my newsletter for the latest updates.</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                className="newsletter-input" 
                placeholder="Your email" 
                required 
              />
              <button type="submit" className="newsletter-btn">
                <FaEnvelope />
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Uday Kiran. All rights reserved.</p>
      </div>
      
      <div className="footer-shape-1"></div>
      <div className="footer-shape-2"></div>
    </footer>
  );
};

export default Footer;
