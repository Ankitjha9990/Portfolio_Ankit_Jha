import { useState, useCallback } from 'react';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import CustomCursor from './components/CustomCursor';
import TagScroll from './components/TagScroll';
import AboutMeSplit from './components/AboutMeSplit';
import Skills from './components/Skills';
import ProjectsGrid from './components/ProjectsGrid';
import JourneyTimeline from './components/JourneyTimeline';
import Certifications from './components/Certifications';
import Footer from './components/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <CustomCursor />
      {!loaded && <Preloader onComplete={handlePreloaderComplete} />}

      <main style={{ background: '#0d0d0d', color: '#ffffff', minHeight: '100vh' }}>
        <Hero />
        <div style={{ position: 'relative', zIndex: 10, background: '#0d0d0d' }}>
          <TagScroll />
          <AboutMeSplit />
          <Skills />
          <ProjectsGrid />
          <JourneyTimeline />
          <Certifications />
          <Footer />
        </div>
      </main>
    </>
  );
}
