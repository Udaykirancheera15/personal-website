import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { certificatesData } from '../../data/certificates';
import './Certificates.scss';

// Mobile detection hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
};

const CertificateModal = ({ isOpen, onClose, url, title, canEmbed }) => {
  const [iframeError, setIframeError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Disable fullpage.js scrolling when modal is open
      if (window.fullpage_api) {
        window.fullpage_api.setAllowScrolling(false);
        window.fullpage_api.setKeyboardScrolling(false);
      }
      document.body.style.overflow = 'hidden';
      setIframeError(false); // Reset error state
    } else {
      // Re-enable fullpage.js scrolling when modal is closed
      if (window.fullpage_api) {
        window.fullpage_api.setAllowScrolling(true);
        window.fullpage_api.setKeyboardScrolling(true);
      }
      document.body.style.overflow = '';
    }

    return () => {
      if (window.fullpage_api) {
        window.fullpage_api.setAllowScrolling(true);
        window.fullpage_api.setKeyboardScrolling(true);
      }
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleIframeError = () => {
    setIframeError(true);
  };

  const openInNewWindow = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div 
        className="certificate-viewer-overlay fullpage-modal" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99999
        }}
      >
        <motion.div 
          className="certificate-viewer-modal"
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="certificate-viewer-header">
            <h3 className="certificate-viewer-title">{title}</h3>
            <div className="certificate-viewer-actions">
              <button className="certificate-viewer-external" onClick={openInNewWindow} title="Open in new window">
                <FaExternalLinkAlt />
              </button>
              <button className="certificate-viewer-close" onClick={onClose}>
                <FaTimes />
              </button>
            </div>
          </div>
          <div className="certificate-viewer-content">
            {canEmbed === false || iframeError ? (
              <div className="certificate-viewer-fallback">
                <div className="fallback-icon">
                  <FaExternalLinkAlt size={48} />
                </div>
                <h4>Can't Display Certificate</h4>
                <p>This certificate cannot be embedded for security reasons.</p>
                <button className="fallback-button" onClick={openInNewWindow}>
                  Open Certificate in New Window
                </button>
              </div>
            ) : (
              <iframe 
                src={url} 
                title={`${title} - Certificate Viewer`}
                className="certificate-viewer-iframe"
                loading="lazy"
                onError={handleIframeError}
                onLoad={(e) => {
                  // Check if iframe loaded successfully
                  try {
                    e.target.contentDocument;
                  } catch (error) {
                    handleIframeError();
                  }
                }}
              />
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body // Render directly to body, bypassing fullpage.js structure
  );
};

const Certificates = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerUrl, setViewerUrl] = useState('');
  const [viewerTitle, setViewerTitle] = useState('');
  const [canEmbed, setCanEmbed] = useState(true);
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  const isMobile = useIsMobile();

  const openViewer = (url, title, canEmbed = true) => {
    setViewerUrl(url);
    setViewerTitle(title);
    setViewerOpen(true);
    setCanEmbed(canEmbed);
  };

  const closeViewer = () => {
    setViewerOpen(false);
    setViewerUrl('');
    setViewerTitle('');
  };

  // Adjust navigation for mobile (show 1 card) vs desktop (show 3 cards)
  const cardsToShow = isMobile ? 1 : 3;
  const maxIndex = certificatesData.length - cardsToShow;
  
  const goToPrevious = () => setCurrentIndex(prev => prev === 0 ? maxIndex : prev - 1);
  const goToNext = () => setCurrentIndex(prev => prev === maxIndex ? 0 : prev + 1);
  const goToDot = (idx) => setCurrentIndex(idx);

  return (
    <section className="certificates" ref={ref}>
      <div className="certificate-shape-1"></div>
      <div className="certificate-shape-2"></div>
      <div className="section-header">
        <h2 className="section-title">My Certificates</h2>
        <p className="section-subtitle">
          Professional certifications and educational achievements
        </p>
      </div>
      <div className="certificates-container">
        <div className="certificates-wrapper">
          <motion.div
            className="certificates-grid"
            animate={{ 
              transform: isMobile 
                ? `translateX(-${currentIndex * 100}%)` 
                : `translateX(-${currentIndex * 33.333}%)`
            }}
            transition={{ duration: 0.5, ease: [0.645, 0.045, 0.355, 1.000] }}
          >
            {certificatesData.map((cert, idx) => (
              <motion.div
                key={cert.id}
                className="certificate-card"
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * (idx % 6), duration: 0.5 }}
                whileHover={!isMobile ? { y: -10, rotateY: 5 } : {}}
              >
                <div className="certificate-header">
                  <div className="certificate-icon">{cert.icon}</div>
                  <h3 className="certificate-title">{cert.title}</h3>
                  <div className="certificate-issuer">{cert.issuer}</div>
                </div>
                <div className="certificate-body">
                  <p className="certificate-description">{cert.description}</p>
                  <div className="certificate-footer">
                    <div className="certificate-date">{cert.date}</div>
                    <motion.div
                      className="certificate-link"
                      onClick={() => openViewer(cert.credential, cert.title, cert.canEmbed)}
                      whileHover={!isMobile ? { x: 5 } : {}}
                      whileTap={{ scale: 0.95 }}
                    >
                      {cert.linkText || 'View Credential'} <FaExternalLinkAlt />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="certificates-navigation">
          <motion.button 
            className="cert-nav-btn" 
            onClick={goToPrevious} 
            whileHover={!isMobile ? { y: -3 } : {}} 
            whileTap={{ scale: 0.95 }}
          >
            <FaChevronLeft />
          </motion.button>
          <motion.button 
            className="cert-nav-btn" 
            onClick={goToNext} 
            whileHover={!isMobile ? { y: -3 } : {}} 
            whileTap={{ scale: 0.95 }}
          >
            <FaChevronRight />
          </motion.button>
        </div>
        <div className="certificates-dots">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <div
              key={idx}
              className={`certificates-dot ${currentIndex === idx ? 'active' : ''}`}
              onClick={() => goToDot(idx)}
            />
          ))}
        </div>
      </div>

      {/* Modal rendered via Portal */}
      <CertificateModal 
        isOpen={viewerOpen}
        onClose={closeViewer}
        url={viewerUrl}
        title={viewerTitle}
        canEmbed={canEmbed}
      />
    </section>
  );
};

export default Certificates;
