import React, { useEffect, useState, useRef } from 'react';
import './Preloader.scss';

const Preloader = () => {
  const [phase, setPhase] = useState(0); // 0: logo, 1: tagline, 2: complete
  const [progress, setProgress] = useState(0);
  const [particles, setParticles] = useState([]);
  const canvasRef = useRef(null);
  const taglineRef = useRef(null);

  // Generate quantum particles
  useEffect(() => {
    const particleArray = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 0.8 + 0.2,
      opacity: Math.random() * 0.6 + 0.3,
      delay: Math.random() * 5,
      color: `hsl(${Math.random() * 60 + 180}, 80%, 60%)`
    }));
    setParticles(particleArray);
  }, []);

  // Progress simulation - slower and more controlled
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Slower progression with easing
        const increment = prev < 70 ? 
          Math.random() * 3 + 1 : 
          Math.random() * 2 + 0.5;
        return prev + increment;
      });
    }, 150); // Increased interval

    return () => clearInterval(progressInterval);
  }, []);

  // Phase transitions with longer durations
  useEffect(() => {
    const timer1 = setTimeout(() => setPhase(1), 1800); // Longer initial phase
    return () => clearTimeout(timer1);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const exitTimeout = setTimeout(() => setPhase(2), 1200); // Longer exit buffer
      return () => clearTimeout(exitTimeout);
    }
  }, [progress]);

  // Quantum field animated background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationId;
    let time = 0;
    const particles = [];
    const PARTICLE_COUNT = 80;

    // Initialize particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        color: `hsla(${Math.random() * 60 + 180}, 80%, 60%, ${Math.random() * 0.4 + 0.1})`
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 15, 20, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connecting lines between particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = `hsla(190, 80%, 60%, ${1 - distance / 150})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        // Draw particle
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw pulsing center orb
      const pulseSize = 5 + Math.sin(time * 0.005) * 3;
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, 100 + pulseSize
      );
      gradient.addColorStop(0, 'hsla(190, 80%, 60%, 0.2)');
      gradient.addColorStop(1, 'hsla(190, 80%, 60%, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 100 + pulseSize, 0, Math.PI * 2);
      ctx.fill();

      time += 16;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  // Typewriter effect for tagline
  useEffect(() => {
    if (phase >= 1 && taglineRef.current) {
      const words = taglineRef.current.querySelectorAll('.tagline-word');
      words.forEach((word, i) => {
        const text = word.getAttribute('data-word');
        word.textContent = '';
        let charIndex = 0;
        
        const typeInterval = setInterval(() => {
          if (charIndex < text.length) {
            word.textContent += text[charIndex];
            charIndex++;
          } else {
            clearInterval(typeInterval);
          }
        }, 80 + i * 20);
      });
    }
  }, [phase]);

  return (
    <div className={`preloader ${phase === 2 ? 'preloader--exit' : ''}`}>
      <canvas ref={canvasRef} className="preloader__canvas" />
      
      {/* Quantum particles */}
      <div className="preloader__particles">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="quantum-particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${5 + particle.speed * 3}s`
            }}
          />
        ))}
      </div>

      <div className="preloader__content">
        {/* Quantum Core Logo */}
        <div className={`preloader__logo ${phase >= 0 ? 'active' : ''}`}>
          <div className="quantum-core">
            {/* Pulsing center */}
            <div className="core-pulse">
              <div className="core-inner">
                <svg viewBox="0 0 100 100" width="40" height="40">
                  <path 
                    className="quantum-path"
                    d="M20,50 Q35,30 50,50 T80,50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <path 
                    className="quantum-path"
                    d="M20,60 Q35,40 50,60 T80,60"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path 
                    className="quantum-path"
                    d="M20,40 Q35,20 50,40 T80,40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
            
            {/* Orbiting electrons */}
            <div className="electron-orbit electron-orbit--1">
              <div className="electron"></div>
            </div>
            <div className="electron-orbit electron-orbit--2">
              <div className="electron"></div>
            </div>
            <div className="electron-orbit electron-orbit--3">
              <div className="electron"></div>
            </div>
          </div>
        </div>

        {/* Tagline with typewriter effect */}
        <div className={`preloader__tagline ${phase >= 1 ? 'active' : ''}`} ref={taglineRef}>
          <div className="tagline-container">
            <div className="tagline-line tagline-line--1">
              <span className="tagline-word" data-word="Driven"></span>
              <span className="tagline-word" data-word="by"></span>
              <span className="tagline-word tagline-word--highlight" data-word="Curiosity"></span>
            </div>
            <div className="tagline-line tagline-line--2">
              <span className="tagline-word" data-word="Fueled"></span>
              <span className="tagline-word" data-word="by"></span>
              <span className="tagline-word tagline-word--highlight" data-word="Innovation"></span>
            </div>
          </div>
        </div>

        {/* Quantum Progress Section */}
        <div className={`preloader__progress-section ${phase >= 1 ? 'active' : ''}`}>
          <div className="progress-container">
            <div className="progress-track">
              <div 
                className="progress-fill"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                <div className="progress-glow"></div>
                <div className="progress-sparkles"></div>
              </div>
            </div>
            <div className="progress-text">
              <span className="progress-label">Initializing Interface...</span>
              <span className="progress-percent">{Math.round(Math.min(progress, 100))}%</span>
            </div>
          </div>
        </div>

        {/* Binary status indicators */}
        <div className="preloader__status">
          <div className="binary-stream">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="binary-digit">
                {Math.random() > 0.5 ? '1' : '0'}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Floating tech elements */}
      <div className="preloader__elements">
        <div className="tech-element tech-element--chip"></div>
        <div className="tech-element tech-element--circuit"></div>
        <div className="tech-element tech-element--data"></div>
      </div>
    </div>
  );
};

export default Preloader;
