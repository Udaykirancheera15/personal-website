import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from '../ui/ThemeToggle';
import './Navbar.scss';

const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = ({ activeSectionId }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    if (window.fullpage_api) {
      window.fullpage_api.moveTo(sectionId);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'scrolled' : ''} ${theme}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => scrollToSection('hero')}>
          <span className="logo-text">Portfolio</span>
        </div>
        <ul className="navbar-links desktop-links">
          {navLinks.map(link => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={activeSectionId === link.id ? 'active' : ''}
                onClick={e => {
                  e.preventDefault();
                  scrollToSection(link.id);
                }}
              >
                {link.label}
                {activeSectionId === link.id && (
                  <motion.div
                    className="active-indicator"
                    layoutId="activeNavIndicator"
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>
        <div className="navbar-right">
          <ThemeToggle />
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="mobile-links">
              {navLinks.map(link => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * navLinks.indexOf(link) }}
                >
                  <a
                    href={`#${link.id}`}
                    className={activeSectionId === link.id ? 'active' : ''}
                    onClick={e => {
                      e.preventDefault();
                      scrollToSection(link.id);
                    }}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
