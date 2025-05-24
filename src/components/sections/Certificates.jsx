import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { certificatesData } from '../../data/certificates';
import './Certificates.scss';

const Certificates = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerUrl, setViewerUrl] = useState('');
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

  const openViewer = (url) => {
    setViewerUrl(url);
    setViewerOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeViewer = () => {
    setViewerOpen(false);
    document.body.style.overflow = '';
  };

  const goToPrevious = () => setCurrentIndex(prev => prev === 0 ? certificatesData.length - 3 : prev - 1);
  const goToNext = () => setCurrentIndex(prev => prev === certificatesData.length - 3 ? 0 : prev + 1);
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
            animate={{ transform: `translateX(-${currentIndex * 33.333}%)` }}
            transition={{ duration: 0.5, ease: [0.645, 0.045, 0.355, 1.000] }}
          >
            {certificatesData.map((cert, idx) => (
              <motion.div
                key={cert.id}
                className="certificate-card"
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * (idx % 6), duration: 0.5 }}
                whileHover={{ y: -10, rotateY: 5 }}
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
                      onClick={() => openViewer(cert.credential)}
                      whileHover={{ x: 5 }}
                    >
                      View Credential <FaExternalLinkAlt />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="certificates-navigation">
          <motion.button className="cert-nav-btn" onClick={goToPrevious} whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}>
            <FaChevronLeft />
          </motion.button>
          <motion.button className="cert-nav-btn" onClick={goToNext} whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}>
            <FaChevronRight />
          </motion.button>
        </div>
        <div className="certificates-dots">
          {Array.from({ length: certificatesData.length - 2 }).map((_, idx) => (
            <div
              key={idx}
              className={`certificates-dot ${currentIndex === idx ? 'active' : ''}`}
              onClick={() => goToDot(idx)}
            />
          ))}
        </div>
      </div>
      <AnimatePresence>
        {viewerOpen && (
          <motion.div className="certificate-viewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="certificate-viewer-content">
              <button className="certificate-viewer-close" onClick={closeViewer}>
                <FaTimes />
              </button>
              <iframe src={viewerUrl} title="Certificate Viewer" className="certificate-viewer-iframe"></iframe>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;
