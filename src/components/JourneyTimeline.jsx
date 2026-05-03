import { useEffect, useRef } from 'react';
import '../styles/Timeline.css';

const timelineData = [
  {
    year: '2023',
    title: 'Grade 11 & 12, Science Stream',
    desc: 'Built the foundation. Science, logic, and the early spark of curiosity for technology.',
  },
  {
    year: 'July 2025',
    title: 'BTech AI & ML — Quad AI school of technology',
    desc: 'Started the degree. Committed to the intersection of AI, design, and engineering.',
  },
  {
    year: 'Dec 2025',
    title: 'iHack E-Summit Finalist — IIT Bombay',
    desc: 'Competed at a national level. Proved that ideas built with purpose can stand in any room.',
  },
  {
    year: 'Nov 2025 - Feb 2026',
    title: 'Front-End Developer Intern @ Cheerio AI',
    desc: 'Shipped a real analytics dashboard. Learned what production-grade code actually means.',
  },
  {
    year: 'March 2026',
    title: 'Cine Curator & Vrihi Skydeck Shipped',
    desc: 'Two full projects built and deployed. React.js, APIs, real users.',
  },
  {
    year: 'April 2026',
    title: 'AI NEXUS 2026 Finalist — Chandigarh University',
    desc: 'Recognized for developing responsible AI solutions at a 24Hr National level innovation-focused hackathon.',
  },
];

export default function JourneyTimeline() {
  const itemsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    const currentItems = itemsRef.current;
    currentItems.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      currentItems.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section className="timeline-section" id="timeline">
      <h2>The Journey</h2>
      <div className="timeline">
        {timelineData.map((item, i) => (
          <div
            className="timeline-item"
            key={i}
            ref={(el) => {
              itemsRef.current[i] = el;
            }}
          >
            <div className="timeline-card">
              <div className="timeline-year">{item.year}</div>
              <div className="timeline-title">{item.title}</div>
              <div className="timeline-desc">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
