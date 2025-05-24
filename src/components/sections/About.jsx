import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { FaLaptopCode, FaMobileAlt, FaServer, FaDatabase } from 'react-icons/fa';
import Button from '../ui/Button';
import './About.scss';

const About = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="about" ref={ref}>
      <div className="about-shape-1"></div>
      <div className="about-shape-2"></div>
      <div className="section-header">
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">
          Get to know more about me, my background, and what I do
        </p>
      </div>
      <div className="about-content">
        <motion.div className="about-img-container" initial={{ opacity: 0, x: -50 }} animate={isVisible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
          <img src="/assets/images/profile.jpg" alt="About Uday Kiran" className="about-img" />
          <div className="about-img-overlay"></div>
          <div className="about-experience">
            <div className="experience-number">3<span>+</span></div>
            <div className="experience-text">Years of Experience</div>
          </div>
        </motion.div>
        <motion.div className="about-text" initial={{ opacity: 0, x: 50 }} animate={isVisible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
          <div className="about-subtitle">Who am I?</div>
          <h3 className="about-heading">I'm Uday Kiran, a Full Stack Developer</h3>
          <p className="about-description">
            I'm a passionate developer with a strong foundation in both frontend and backend technologies.
            With over 3 years of experience, I've worked on various projects ranging from web applications
            to mobile apps and enterprise solutions. I'm dedicated to creating efficient, scalable, and
            user-friendly applications that solve real-world problems.
          </p>
          <div className="about-features">
            <motion.div className="feature-item" initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.5 }}>
              <div className="feature-icon">
                <FaLaptopCode />
              </div>
              <div className="feature-text">
                <h4>Web Development</h4>
                <p>Creating responsive and interactive web applications using modern frameworks and libraries.</p>
              </div>
            </motion.div>
            <motion.div className="feature-item" initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3, duration: 0.5 }}>
              <div className="feature-icon">
                <FaMobileAlt />
              </div>
              <div className="feature-text">
                <h4>Mobile Apps</h4>
                <p>Developing cross-platform mobile applications with React Native and other technologies.</p>
              </div>
            </motion.div>
            <motion.div className="feature-item" initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4, duration: 0.5 }}>
              <div className="feature-icon">
                <FaServer />
              </div>
              <div className="feature-text">
                <h4>Backend Services</h4>
                <p>Building robust and scalable backend services with Node.js, Express, and Python.</p>
              </div>
            </motion.div>
            <motion.div className="feature-item" initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5, duration: 0.5 }}>
              <div className="feature-icon">
                <FaDatabase />
              </div>
              <div className="feature-text">
                <h4>Database Design</h4>
                <p>Designing and implementing efficient database structures with MongoDB, PostgreSQL, and more.</p>
              </div>
            </motion.div>
          </div>
          <motion.div className="about-cta" initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6, duration: 0.5 }}>
            <Button variant="accent" onClick={() => window.open('/resume.pdf', '_blank')}>
              Download My Resume
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
