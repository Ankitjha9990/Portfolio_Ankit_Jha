import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import '../styles/Hero.css';

const FRAME_COUNT = 168;

function getFramePath(index) {
  const padded = String(index).padStart(3, '0');
  return `/Sequence/frame_${padded}_delay-0.041s.webp`;
}

export default function Hero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [images, setImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Optimized batched preloader
  useEffect(() => {
    const loadedImages = new Array(FRAME_COUNT);

    // Load first frame immediately
    const firstImg = new Image();
    firstImg.src = getFramePath(0);
    loadedImages[0] = firstImg;

    firstImg.onload = () => {
      setImages(loadedImages);
      setIsLoaded(true);

      // Load remaining frames in small batches to avoid network clogging
      let currentIndex = 1;
      const loadBatch = () => {
        if (currentIndex >= FRAME_COUNT) return;
        
        const batchSize = Math.min(4, FRAME_COUNT - currentIndex);
        let loadedInBatch = 0;
        
        for (let i = 0; i < batchSize; i++) {
          const idx = currentIndex + i;
          const img = new Image();
          img.src = getFramePath(idx);
          loadedImages[idx] = img;
          
          const onImgLoad = () => {
            loadedInBatch++;
            if (loadedInBatch === batchSize) {
              currentIndex += batchSize;
              loadBatch();
            }
          };
          img.onload = onImgLoad;
          img.onerror = onImgLoad;
        }
      };
      
      loadBatch();
    };
  }, []);

  const drawFrame = useCallback(
    (index) => {
      const canvas = canvasRef.current;
      if (!canvas || !images.length) return;
      const ctx = canvas.getContext('2d');
      const img = images[Math.floor(index)];
      if (!img || !img.complete || !img.naturalWidth) return;

      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      const canvasW = canvas.width;
      const canvasH = canvas.height;
      const imgW = img.naturalWidth;
      const imgH = img.naturalHeight;

      const scale = Math.max(canvasW / imgW, canvasH / imgH);
      const drawW = imgW * scale;
      const drawH = imgH * scale;
      const drawX = (canvasW - drawW) / 2;
      const drawY = (canvasH - drawH) / 2;

      ctx.clearRect(0, 0, canvasW, canvasH);
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    },
    [images]
  );

  // Initial draw
  useEffect(() => {
    if (isLoaded) {
      drawFrame(0);
    }
  }, [isLoaded, drawFrame]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (isLoaded) drawFrame(0);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded, drawFrame]);

  // Setup scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isLoaded) {
      const frameIndex = latest * (FRAME_COUNT - 1);
      drawFrame(frameIndex);
    }
  });

  return (
    <section 
      className="hero-wrapper" 
      id="home" 
      ref={containerRef}
    >
      <div className="hero-sticky">
        <div className="hero-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hero-badge"
          >
            <span className="hero-badge-dot"></span>
            AI Engineer &amp; Creative Builder
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-title"
          >
            I Build Technology <br />
            That <span className="hero-title-highlight">Resonates.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hero-description"
          >
            Fusing analytical thinking with a deep sense of aesthetics to create digital products that don&apos;t just work — they leave a lasting impact.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hero-actions"
          >
            <a href="/Resume_Ankit_Jha.docx" target="_blank" rel="noopener noreferrer" className="btn-primary">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </a>
            <a href="https://wa.me/919990976019?text=Hi%20Ankit,%20I%20loved%20your%20portfolio!" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </motion.div>
        </div>

        <div className="hero-right">
          <div className="hero-canvas-container">
            <canvas ref={canvasRef} className="hero-canvas" />
          </div>

          {/* Floating Cards for depth */}
          <motion.div 
            className="glass-card card-1"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="glass-card-icon">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div className="glass-card-text">
              <h4>Front-End Dev</h4>
              <p>React, Vite, Motion</p>
            </div>
          </motion.div>

          <motion.div 
            className="glass-card card-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <div className="glass-card-icon">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="glass-card-text">
              <h4>AI Solutions</h4>
              <p>Generative AI Integration</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
