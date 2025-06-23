import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaDownload, FaPython, FaDocker, FaAws, FaLinux, FaDatabase } from 'react-icons/fa';
import { SiPytorch } from 'react-icons/si';
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

  const techStack = [
    { name: 'Python', icon: <FaPython /> },
    { name: 'PyTorch', icon: <SiPytorch /> },
    { name: 'Docker', icon: <FaDocker /> },
    { name: 'AWS', icon: <FaAws /> },
    { name: 'PostgreSQL', icon: <FaDatabase /> },
    { name: 'Linux', icon: <FaLinux /> }
  ];

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
            <span className="hero-position">Software Engineer & AI Researcher</span>
          </motion.h1>
          <motion.p className="hero-description" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.5 }}>
		Driven by boundless curiosity for cutting-edge technologies in machine learning and cybersecurity. I have developed quantum-enhanced AI models, graph neural networks for threat detection. From medical AI applications to network security solutions, I tackle complex challenges with innovative approaches.
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
              <img src="/assets/images/Photo.png" alt="Uday Kiran" className="profile-image" />
            </div>
            <div className="image-frame"></div>
          </div>
        </motion.div>
      </div>
      <motion.div className="tech-stack" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.5 }}>
        <div className="tech-stack-title">Tech Stack |</div>
        <div className="tech-icons">
          {techStack.map((tech, i) => (
            <div key={i} className="tech-icon">
              <div className="tech-icon-inner">
                {tech.icon}
              </div>
              <div className="tech-icon-name">{tech.name}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
