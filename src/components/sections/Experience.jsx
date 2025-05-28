import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import './Experience.scss';

// Updated experience data based on resume (Professional + Volunteer Experience)
const experienceData = [
  {
    role: "Cybersecurity Intern",
    company: "Andhra Pradesh Space Application Center (APSAC)",
    date: "January 2025 – May 2025",
    type: "Professional",
    description: "Conducted threat analysis and vulnerability assessments . Developed security protocols and risk assessment frameworks ensuring data integrity and system resilience. Implemented cybersecurity measures.",
    technologies: ["Cybersecurity", "Threat Analysis", "Vulnerability Assessment", "Risk Management",  "Data Security"]
  },
  {
    role: "Cyber Forensics Intern",
    company: "Innogeecks Technologies Private Limited",
    date: "July 2024 – August 2024",
    type: "Professional",
    description: "Performed digital forensics investigations using industry-standard tools including EnCase, FTK Imager, and Autopsy for evidence acquisition and malware analysis. Developed automated Python scripts for artifact extraction and forensic report generation, reducing investigation time by 40%. Conducted security assessments using penetration testing tools in controlled environments.",
    technologies: ["Digital Forensics", "EnCase", "FTK Imager", "Autopsy", "Python", "Metasploit", "Nmap", "Penetration Testing"]
  },
  {
    role: "Research Intern - Software Engineering (ML)",
    company: "National Institute of Technology, Warangal",
    date: "May 2024 – July 2024",
    type: "Professional",
    description: "Developed hybrid machine learning models for software effort estimation, achieving 28% improvement in prediction accuracy using ensemble techniques combining Linear Regression, ANN, KNN, and SVM. Implemented bio-inspired optimization algorithms (Firefly, Particle Swarm) with Analogy-Based Estimation, resulting in enhanced model adaptability across diverse project contexts.",
    technologies: ["Machine Learning", "Python", "Linear Regression", "ANN", "KNN", "SVM", "Firefly Algorithm", "Particle Swarm Optimization", "Hyperopt"]
  },
  {
    role: "Technical Event Coordinator",
    company: "ITYUKTA 2K24, JNTUGV",
    date: "January 2024 – March 2024",
    type: "Leadership",
    description: "Led coordination of  technical event for ITYUKTA 2K24, managing event logistics, participant registration, and technical demonstrations. Organized workshops and competitions, facilitating knowledge sharing among students and promoting technical innovation within the university community.",
    technologies: ["Event Management", "Leadership", "Project Coordination", "Technical Presentations", "Team Management"]
  },

  {
    role: "Community Development Volunteer",
    company: "Sikshana Foundation",
    date: "June 2023 - August 2023",
    type: "Community Service",
    description: "Taught technology skills to 50+ underprivileged students as part of community development initiatives. Developed and delivered interactive workshops on digital literacy, basic programming, and computer fundamentals, empowering students with essential 21st-century skills for future opportunities.",
    technologies: ["Digital Literacy", "Workshop Development", "Community Impact", "Student Mentoring"]
  }
];

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
                      <span className={`experience-type ${activeJob.type.toLowerCase().replace(' ', '-')}`}>
                        {activeJob.type}
                      </span>
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
