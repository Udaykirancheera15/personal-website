import React, { useEffect, useRef, useState } from 'react';
import { AiAssistantProvider } from './context/AiAssistantContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Certificates from './components/sections/Certificates';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ui/ScrollToTop';
import Preloader from './components/preloader/Preloader';
import AiAssistant from './components/ai-assistant/AiAssistant';
import AiAssistantButton from './components/ai-assistant/AiAssistantButton';
import './styles/globals.scss';
import 'fullpage.js/dist/fullpage.min.css';

import fullpage from 'fullpage.js';

function App() {
  const [loading, setLoading] = useState(true);
  const fullpageRef = useRef(null);
  const [preloaderDone, setPreloaderDone] = useState(false);

  // Minimum display time for preloader (4 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setPreloaderDone(true);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  // Only hide loading when both preloader is done AND content is ready
  useEffect(() => {
    if (preloaderDone) {
      // Additional small delay for smooth transition
      const timer = setTimeout(() => {
        setLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [preloaderDone]);

  useEffect(() => {
    let fpApi;
    if (!loading && fullpageRef.current) {
      fpApi = new fullpage('#fullpage', {
        autoScrolling: true,
        navigation: true,
        anchors: [
          "hero", "about", "skills", "experience",
          "projects", "certificates", "contact"
        ],
        navigationTooltips: [
          "Home", "About", "Skills", "Experience",
          "Projects", "Certificates", "Contact"
        ],
        showActiveTooltip: true,
        scrollHorizontally: false,
        responsiveWidth: 992, // Increased from 900 to 992 for better tablet experience
        responsiveHeight: 600, // Add responsive height for better mobile experience
        verticalCentered: true,
        fitToSection: true,
        scrollingSpeed: 700,
        easingcss3: 'ease-out',
        // Mobile optimizations
        touchSensitivity: 5,
        normalScrollElementTouchThreshold: 5,
        bigSectionsDestination: 'top',
      });
      
      return () => {
        if (fpApi && typeof fpApi.destroy === 'function') fpApi.destroy('all');
      };
    }
  }, [loading]);

  return (
    <ThemeProvider>
      <AiAssistantProvider>
        <div className="app">
          {loading ? (
            <Preloader onComplete={() => setPreloaderDone(true)} />
          ) : (
            <>
              <Navbar />
              <div id="fullpage" ref={fullpageRef}>
                <div className="section" data-anchor="hero"><Hero /></div>
                <div className="section" data-anchor="about"><About /></div>
                <div className="section" data-anchor="skills"><Skills /></div>
                <div className="section" data-anchor="experience"><Experience /></div>
                <div className="section" data-anchor="projects"><Projects /></div>
                <div className="section" data-anchor="certificates"><Certificates /></div>
                <div className="section" data-anchor="contact"><Contact /></div>
              </div>
              <Footer />
              <ScrollToTop />
              <AiAssistant />
              <AiAssistantButton />
            </>
          )}
        </div>
      </AiAssistantProvider>
    </ThemeProvider>
  );
}

export default App;
