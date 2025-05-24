import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { experienceData } from '../../data/experience';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import './Experience.scss';

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [direction, setDirection] = useState(null);

  const nextExperience = () => {
    setDirection('right');
    setActiveIndex((prev) => (prev === experienceData.length - 1 ? 0 : prev + 1));
  };

  const prevExperience = () => {
    setDirection('left');
    setActiveIndex((prev) => (prev === 0 ? experienceData.length - 1 : prev - 1));
  };

  // Auto-advance carousel with pause on hover
  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        nextExperience();
      }, 7000); // Change slide every 7 seconds
      
      return () => clearInterval(interval);
    }
  }, [isPaused, activeIndex]);

  const variants = {
    enter: (direction) => ({
      x: direction === 'right' ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    exit: (direction) => ({
      x: direction === 'right' ? -300 : 300,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.4
      }
    })
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const activeJob = experienceData[activeIndex];

  return (
    <motion.section
      className="experience"
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="experience-bg-gradient"></div>
      <div className="experience-bg-dots"></div>
      
      <motion.div className="section-header" variants={itemVariants}>
        <h2 className="section-title">Experience</h2>
        <div className="title-underline"></div>
      </motion.div>
      
      <div className="experience-container">
        <motion.div className="experience-tabs" variants={itemVariants}>
          {experienceData.map((job, idx) => (
            <motion.button
              key={idx}
              className={`tab-button ${activeIndex === idx ? 'active' : ''}`}
              onClick={() => {
                setDirection(idx > activeIndex ? 'right' : 'left');
                setActiveIndex(idx);
              }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="company-name">{job.company}</span>
              {activeIndex === idx && (
                <motion.div
                  className="active-indicator"
                  layoutId="activeTabIndicator"
                  transition={{ type: 'spring', duration: 0.5 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>
        
        <div className="experience-content">
          <button 
            className="nav-button prev-button" 
            onClick={prevExperience}
            aria-label="Previous experience"
          >
            <FaChevronLeft />
          </button>
          
          <div className="card-container">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="experience-card"
              >
                <div className="card-header">
                  <div className="role-company">
                    <div className="icon-wrapper">
                      <FaBriefcase />
                    </div>
                    <div>
                      <h3 className="job-title">{activeJob.role}</h3>
                      <h4 className="company-title">{activeJob.company}</h4>
                    </div>
                  </div>
                  <div className="job-duration">
                    <div className="duration-pill">{activeJob.date}</div>
                  </div>
                </div>
                
                <div className="card-body">
                  <p className="job-description">{activeJob.description}</p>
                </div>
                
                <div className="card-footer">
                  <div className="technologies">
                    {activeJob.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <button 
            className="nav-button next-button" 
            onClick={nextExperience}
            aria-label="Next experience"
          >
            <FaChevronRight />
          </button>
        </div>
        
        <div className="experience-indicators">
          {experienceData.map((_, idx) => (
            <button
              key={idx}
              className={`indicator-dot ${activeIndex === idx ? 'active' : ''}`}
              onClick={() => {
                setDirection(idx > activeIndex ? 'right' : 'left');
                setActiveIndex(idx);
              }}
              aria-label={`Go to experience ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Experience;
