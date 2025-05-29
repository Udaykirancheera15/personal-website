import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaSearch, FaChevronLeft, FaChevronRight, FaCode, FaMobile, FaRobot, FaServer, FaShieldAlt } from 'react-icons/fa';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { projectsData } from '../../data/projects';
import './Projects.scss';
import LinkHandler from '../ui/LinkHandler';

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

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedCard, setExpandedCard] = useState(null);
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  const isMobile = useIsMobile();

  // Define categories with icons
const categories = [
  { id: 'all', label: 'All', icon: <FaCode /> },
  { id: 'ai-ml', label: 'AI & ML', icon: <FaRobot /> },
  { id: 'cybersecurity', label: 'Cybersecurity', icon: <FaShieldAlt /> },
  { id: 'devops', label: 'DevOps', icon: <FaServer /> },
  { id: 'fullstack', label: 'Web', icon: <FaCode /> }
];


  // Reduced to 2 projects per page to make cards larger
  const projectsPerPage = 2;

  // Filter projects when active filter changes
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProjects(projectsData);
    } else {
      setFilteredProjects(projectsData.filter(p => p.categories.includes(activeFilter)));
    }
    setCurrentPage(1);
  }, [activeFilter]);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage, 
    currentPage * projectsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  const getCategoryIcon = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.icon : <FaCode />;
  };

  return (
    <section className="projects" ref={ref}>
      <div className="projects-bg-gradient"></div>
      
      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: -20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">My Projects</h2>
        <div className="title-underline"></div>
        <p className="section-subtitle">
          Explore some of my recent projects and technical work
        </p>
      </motion.div>
      
      <div className="projects-container">
        <motion.div 
          className="projects-filter"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((cat, idx) => (
            <motion.button
              key={cat.id}
              className={`filter-btn ${activeFilter === cat.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat.id)}
              whileHover={!isMobile ? { y: -3 } : {}}
              whileTap={{ scale: 0.95 }}
            >
              <span className="btn-icon">{cat.icon}</span>
              <span className="btn-text">{cat.label}</span>
              {activeFilter === cat.id && (
                <motion.div 
                  className="active-indicator" 
                  layoutId="activeFilterIndicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>
        
        <div className="projects-showcase">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter + currentPage}
              className="projects-grid"
              variants={containerVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              exit={{ opacity: 0 }}
            >
              {currentProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  className="project-card"
                  variants={itemVariants}
                  whileHover={!isMobile ? { 
                    y: -5,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)"
                  } : {}}
                  onClick={() => isMobile && setExpandedCard(expandedCard === project.id ? null : project.id)}
                >
                  <div className="project-image">
                    <img src={project.image} alt={project.title} />
                  </div>
                  
                  <div className={`project-overlay ${isMobile && expandedCard === project.id ? 'mobile-visible' : ''}`}>
                    <div className="project-content">
                      <h3 className="project-title">{project.title}</h3>
                      
                      <div className="project-category">
                        {project.categories.map((cat, i) => (
                          <span key={i} className="project-tag">
                            <span className="tag-icon">{getCategoryIcon(cat)}</span>
                            {cat}
                          </span>
                        ))}
                      </div>
                      
                      <p className="project-description">{project.description}</p>
                      

											<div className="project-links">
												{project.github ? (
													<a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
														<FaGithub />
														<span>Code</span>
													</a>
												) : (
													<LinkHandler url="github.com/unavailable" type="github">
														<span className="project-link">
															<FaGithub />
															<span>Code</span>
														</span>
													</LinkHandler>
												)}
												{project.demo ? (
													<a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link">
														<FaExternalLinkAlt />
														<span>Demo</span>
													</a>
												) : (
													<LinkHandler url="https://demo.unavailable" type="demo">
														<span className="project-link">
															<FaExternalLinkAlt />
															<span>Demo</span>
														</span>
													</LinkHandler>
												)}

												{project.details && (
													<LinkHandler url={project.details} type="details">
														<span className="project-link">
															<FaSearch />
															<span>Details</span>
														</span>
													</LinkHandler>
												)}
											</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          
          {filteredProjects.length === 0 && (
            <motion.div 
              className="no-projects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="no-projects-icon">
                <FaSearch />
              </div>
              <h3>No projects found</h3>
              <p>Try selecting a different category</p>
            </motion.div>
          )}
        </div>
        
        <div className="projects-navigation">
          <button 
            className={`nav-button prev ${currentPage === 1 ? 'disabled' : ''}`} 
            onClick={prevPage}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <FaChevronLeft />
          </button>
          
          <div className="pagination-dots">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                className={`pagination-dot ${currentPage === idx + 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(idx + 1)}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>
          
          <button 
            className={`nav-button next ${currentPage === totalPages ? 'disabled' : ''}`} 
            onClick={nextPage}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
      
      <div className="project-shape-1"></div>
      <div className="project-shape-2"></div>
    </section>
  );
};

export default Projects;
