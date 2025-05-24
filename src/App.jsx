// App.jsx
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

  useEffect(() => {
    const timer = setTimeout(() => { setLoading(false); }, 2000);
    return () => clearTimeout(timer);
  }, []);

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
        responsiveWidth: 900,
        verticalCentered: true,
        fitToSection: true,
      });
      // Cleanup on unmount:
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
            <Preloader />
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
