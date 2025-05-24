import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaDownload } from 'react-icons/fa';
import Button from '../ui/Button';
import Scene from '../3d/Scene';
import './Hero.scss';

const Hero = () => {
  const statsRef = useRef(null);

  useEffect(() => {
    // Animate numbers
    const statsElements = statsRef.current?.querySelectorAll('.stat-number');
    if (statsElements) {
      statsElements.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'), 10);
        let count = 0;
        const duration = 2000;
        const interval = Math.max(10, duration / target);
        const counter = setInterval(() => {
          count += 1;
          stat.textContent = count;
          if (count >= target) {
            stat.textContent = target;
            clearInterval(counter);
          }
        }, interval);
      });
    }
  }, []);

  return (
    <section className="hero">
      <Scene />
      <div className="hero-bg-elements">
        {/* Floating shapes & particles */}
        <div className="floating-shape floating-shape-1"></div>
        <div className="floating-shape floating-shape-2"></div>
        <div className="floating-shape floating-shape-3"></div>
        <div className="floating-shape floating-shape-4"></div>
        <div className="floating-shape floating-shape-5"></div>
        <div className="hero-particles">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                '--move-x': `${(Math.random() - 0.5) * 200}px`,
                '--move-y': `${(Math.random() - 0.5) * 200}px`,
              }}
            ></div>
          ))}
        </div>
        <div className="code-dots">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="code-dot"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
      <div className="hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div className="hero-greeting" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
            <div className="greeting-line"></div>
            <div className="greeting-text">Hello, I'm</div>
          </motion.div>
          <motion.h1 className="hero-title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}>
            Uday Kiran
            <span className="hero-position">Software Engineer / AI Researcher</span>
          </motion.h1>
          <motion.p className="hero-description" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.5 }}>
		I specialize in Machine Learning, Software Development, and DevOps with a focus on security and optimization. From AI research and GNN applications to cybersecurity and cloud infrastructure, I develop robust solutions for complex challenges.
          </motion.p>
          <motion.div className="hero-buttons" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.5 }}>
            <Button 
							variant="primary" 
							icon={<FaArrowRight />} 
							iconPosition="right"
							onClick={() => {
								if (window.fullpage_api) {
									window.fullpage_api.moveTo('contact');
								}
							}}
						>
							Get in Touch
						</Button>

            <Button variant="secondary" icon={<FaDownload />} iconPosition="right" onClick={() => window.open('/resume.pdf', '_blank')}>
              Download CV
            </Button>
          </motion.div>
          <motion.div className="hero-stats" ref={statsRef} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.5 }}>
            <div className="stat-item">
              <div className="stat-number" data-target="8">0</div>
              <div className="stat-label">Months Experience</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number" data-target="6">0</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number" data-target="10">0</div>
              <div className="stat-label">Certifications</div>
            </div>
          </motion.div>
        </motion.div>
        <motion.div className="hero-image" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, duration: 0.7 }}>
          <div className="image-container">
            <div className="image-backdrop"></div>
            <div className="profile-image-wrap">
              <img src="/assets/images/profile.jpg" alt="Uday Kiran" className="profile-image" />
            </div>
            <div className="image-frame"></div>
            <div className="floating-badge">
              <div className="badge-icon">
                <FaDownload />
              </div>
              <div className="badge-text">Resume Available</div>
            </div>
            <div className="floating-code">
              <code>
                const developer = {'{'}
                name: "Uday",
                skills: ["React", "Node", "Three.js"]
                {'}'}
              </code>
            </div>
          </div>
        </motion.div>
      </div>
      <motion.div className="tech-stack" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.5 }}>
        <div className="tech-stack-title">Tech Stack |</div>
        <div className="tech-icons">
          {['React', 'Node.js', 'Python', 'Three.js', 'MongoDB'].map((tech, i) => (
            <div key={i} className="tech-icon">
              <div className="tech-icon-inner">
                <i className={`devicon-${tech.toLowerCase().replace('.js', 'js')}-plain`}></i>
              </div>
              <div className="tech-icon-name">{tech}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
