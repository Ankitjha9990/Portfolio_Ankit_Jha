import { useEffect, useRef, useState } from 'react';
import React from 'react';
import { motion } from 'framer-motion';
import '../styles/AboutMe.css';

const stats = [
  { target: 3, label: 'Months Industry Experience' },
  { target: 3, label: 'Projects Shipped' },
  { target: 3, label: 'Certifications Earned' },
  { target: 2, label: 'National Hackathon Finalist' },
];

function AnimatedCounter({ target }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let current = 0;
          const duration = 1200;
          const stepTime = Math.max(Math.floor(duration / target), 50);
          const timer = setInterval(() => {
            current++;
            setCount(current);
            if (current >= target) clearInterval(timer);
          }, stepTime);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="stat-number">
      {count}
    </span>
  );
}

function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

export default function AboutMeSplit() {
  const revealRef = useReveal();

  return (
    <section className="about-section reveal-section" id="about" ref={revealRef}>
      <motion.div 
        className="about-left"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        {stats.map((stat, i) => (
          <motion.div 
            className="stat-item" 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <AnimatedCounter target={stat.target} />
            <div className="stat-label">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
      <motion.div 
        className="about-right"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="about-heading">From Curious Observer to Creative Builder</h2>
        <p className="about-body">
          The Geeta taught me to focus on the work, not the applause. So I build quietly, refine
          obsessively, and let the output speak. As a Computer Science (AI &amp; ML) undergrad at
          Quad AI school of technology and a former Front-End Developer Intern at Cheerio AI, I
          sit at the intersection of technology, design, and storytelling. I believe the best
          digital products don&apos;t just work — they resonate. I&apos;ve always been the kind of
          person who notices the details others overlook — the spacing in a layout, the logic
          behind a pattern, the emotion a color palette quietly carries. That observer&apos;s
          mindset shaped me into someone who blends analytical thinking with a deep sense of
          aesthetics. I&apos;m not chasing titles or shortcuts. I&apos;m building — quietly,
          deliberately, and with a long-term vision.
        </p>
      </motion.div>
    </section>
  );
}
