import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/CustomCursor.css';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.classList.contains('project-card') ||
        e.target.classList.contains('cert-card') ||
        e.target.closest('.timeline-card') ||
        e.target.closest('.stat-item') ||
        e.target.classList.contains('skill-pill')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      scale: 1,
      backgroundColor: 'transparent',
      border: '1px solid rgba(255, 255, 255, 0.4)',
    },
    hover: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      scale: 1,
      backgroundColor: 'rgba(6, 182, 212, 0.08)',
      border: '1px solid rgba(6, 182, 212, 0.8)',
    }
  };

  const dotVariants = {
    default: {
      x: mousePosition.x - 2,
      y: mousePosition.y - 2,
      backgroundColor: '#ffffff',
      scale: 1,
    },
    hover: {
      x: mousePosition.x - 2,
      y: mousePosition.y - 2,
      backgroundColor: '#06b6d4',
      scale: 1,
    }
  }

  return (
    <>
      <motion.div
        className="custom-cursor-ring"
        variants={variants}
        animate={isHovering ? "hover" : "default"}
        transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
      />
      <motion.div
        className="custom-cursor-dot"
        variants={dotVariants}
        animate={isHovering ? "hover" : "default"}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />
    </>
  );
}
