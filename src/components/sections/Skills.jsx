import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { FaCode, FaDesktop, FaServer, FaDatabase, FaMobileAlt, FaTools, FaCloud, FaShieldAlt } from 'react-icons/fa';
import { skillsData } from '../../data/skills';
import './Skills.scss';

// Define categories with icons
const categories = [
  { id: 'all', label: 'All Skills' },
  { id: 'frontend', label: 'Frontend', icon: <FaDesktop /> },
  { id: 'backend', label: 'Backend', icon: <FaServer /> },
  { id: 'database', label: 'Database', icon: <FaDatabase /> },
  { id: 'mobile', label: 'Mobile', icon: <FaMobileAlt /> },
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

// Limit the number of skills to display per category to ensure all fit on screen
const getVisibleSkills = (skills, category) => {
  // Filter skills by category
  const filtered = category === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === category);
  
  // Limit to a maximum number that can fit on screen (adjust as needed)
  return filtered.slice(0, 8); // Show max 8 skill cards
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
      <ul className="skill-list">
        {/* Limit to max 4 skills per card for space */}
        {skill.skills.slice(0, 4).map((item, j) => (
          <li key={j}>{item}</li>
        ))}
      </ul>
    </motion.div>
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  const [visibleSkills, setVisibleSkills] = useState([]);
  
  // Update visible skills when category changes
  useEffect(() => {
    setVisibleSkills(getVisibleSkills(skillsData, activeCategory));
  }, [activeCategory]);

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
              With a strong foundation in multiple technologies and programming languages,
              I bring a versatile skill set to every project. My expertise spans frontend
              and backend development, database design, cloud services, and more.
            </p>
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
              {visibleSkills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Skills;
