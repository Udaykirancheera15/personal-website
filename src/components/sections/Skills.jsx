import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { FaCode, FaDesktop, FaServer, FaDatabase, FaMobileAlt, FaTools, FaCloud, FaShieldAlt } from 'react-icons/fa';
import { skillsData } from '../../data/skills';
import './Skills.scss';

// Define categories with icons (removed 'All Skills')
const categories = [
  { id: 'backend', label: 'Backend', icon: <FaServer /> },
  { id: 'database', label: 'Database', icon: <FaDatabase /> },
  { id: 'devops', label: 'DevOps', icon: <FaTools /> },
  { id: 'cloud', label: 'Cloud', icon: <FaCloud /> },
  { id: 'security', label: 'Security', icon: <FaShieldAlt /> },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05 // Faster stagger for more cards
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

// Get skills for the selected category
const getVisibleSkills = (skills, category) => {
  // Filter skills by category (no 'all' option anymore)
  const filtered = skills.filter(skill => skill.category === category);
  
  // Return all skills for the selected category
  return filtered;
};

// Skill Card Component
const SkillCard = ({ skill }) => {
  return (
    <motion.div
      className="skill-card"
      variants={itemVariants}
      whileHover={{ y: -5 }}
    >
      <div className="card-header">
        <div className="skill-icon">{skill.icon}</div>
        <h3 className="skill-title">{skill.title}</h3>
      </div>
      
      {/* Proficiency Bar */}
      <div className="proficiency-container">
        <div className="proficiency-label">
          <span>Proficiency</span>
          <span className="proficiency-value">{skill.proficiency}%</span>
        </div>
        <div className="proficiency-bar">
          <motion.div 
            className="proficiency-fill"
            initial={{ width: 0 }}
            animate={{ width: `${skill.proficiency}%` }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
      
      <ul className="skill-list">
        {/* Show all skills for better visibility */}
        {skill.skills.map((item, j) => (
          <li key={j}>{item}</li>
        ))}
      </ul>
    </motion.div>
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('backend'); // Default to backend
  const [searchTerm, setSearchTerm] = useState('');
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  const [visibleSkills, setVisibleSkills] = useState([]);
  
  // Update visible skills when category or search term changes
  useEffect(() => {
    let filtered = getVisibleSkills(skillsData, activeCategory);
    
    if (searchTerm) {
      filtered = filtered.filter(skill => 
        skill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.skills.some(skillItem => 
          skillItem.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    setVisibleSkills(filtered);
  }, [activeCategory, searchTerm]);

  return (
    <section className="skills" ref={ref}>
      <div className="skill-shape-1"></div>
      <div className="skill-shape-2"></div>
      
      <div className="section-header sticky-header">
        <h2 className="section-title">My Skills</h2>
        <p className="section-subtitle">
          Explore my technical skills and expertise in various domains
        </p>
      </div>
      
      <div className="skills-content">
        <div className="skills-top">
          <motion.div 
            className="skills-text" 
            initial={{ opacity: 0, y: 20 }} 
            animate={isVisible ? { opacity: 1, y: 0 } : {}} 
            transition={{ duration: 0.5 }}
          >
            <h3>Technical Proficiency</h3>
            <p>
              From quantum-enhanced machine learning models to cybersecurity protocols,
              my skill set encompasses cutting-edge technologies across multiple domains. With hands-on 
              research experience and industry internships, I bring both theoretical knowledge and 
              practical expertise to complex technological challenges.
            </p>
          </motion.div>
          
          <div className="skills-controls">
            <motion.div 
              className="search-container"
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <input
                type="text"
                placeholder="Search skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="skills-search"
              />
            </motion.div>
            
            <div className="skill-categories">
              {categories.map((cat, idx) => (
                <motion.div
                  key={cat.id}
                  className={`skill-category ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.05 * idx, duration: 0.4 }}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {cat.icon && <span className="category-icon">{cat.icon}</span>}
                  {cat.label}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="skills-cards-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="skills-grid"
              variants={containerVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {visibleSkills.length > 0 ? (
                visibleSkills.map((skill) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))
              ) : (
                <motion.div 
                  className="no-results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="no-results-content">
                    <h3>No skills found</h3>
                    <p>Try adjusting your search or selecting a different category.</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Skills;
