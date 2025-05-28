import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { FaRobot, FaShieldAlt, FaCloud, FaCode } from 'react-icons/fa';
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

        </motion.div>
        <motion.div className="about-text" initial={{ opacity: 0, x: 50 }} animate={isVisible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
          <div className="about-subtitle">Who am I?</div>
          <h3 className="about-heading">I'm Uday Kiran, a Tech Enthusiast & Researcher</h3>
          <p className="about-description">
            I'm a recent Graduate in Information Technology from JNTU Vizianagaram with boundless curiosity for 
            exploring cutting-edge technologies. My expertise spans machine learning, cybersecurity, and DevOps, 
            backed by extensive research experience and hands-on internships. I'm passionate about tackling 
            complex challenges in AI applications, network security, and digital forensics while continuously 
            pushing technological boundaries.
          </p>
          <div className="about-features">
            <motion.div className="feature-item" initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.5 }}>
              <div className="feature-icon">
                <FaRobot />
              </div>
              <div className="feature-text">
                <h4>AI & Machine Learning</h4>
                <p>Developing advanced ML models, quantum-enhanced vision transformers, and graph neural networks for real-world applications.</p>
              </div>
            </motion.div>
            <motion.div className="feature-item" initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3, duration: 0.5 }}>
              <div className="feature-icon">
                <FaShieldAlt />
              </div>
              <div className="feature-text">
                <h4>Cybersecurity</h4>
                <p>Specializing in digital forensics, penetration testing, threat analysis, and security protocols for critical infrastructure.</p>
              </div>
            </motion.div>
            <motion.div className="feature-item" initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4, duration: 0.5 }}>
              <div className="feature-icon">
                <FaCloud />
              </div>
              <div className="feature-text">
                <h4>Cloud & DevOps</h4>
                <p>Building scalable solutions with AWS, Docker, Kubernetes, and implementing CI/CD pipelines for efficient deployment.</p>
              </div>
            </motion.div>
            <motion.div className="feature-item" initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5, duration: 0.5 }}>
              <div className="feature-icon">
                <FaCode />
              </div>
              <div className="feature-text">
                <h4>Research & Development</h4>
                <p>Contributing to academic research in software engineering, publishing findings, and developing innovative solutions.</p>
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
