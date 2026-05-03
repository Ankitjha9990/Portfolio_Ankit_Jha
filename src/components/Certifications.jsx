import { motion } from 'framer-motion';
import '../styles/Certifications.css';

const certs = [
  {
    title: 'Introduction to Generative AI',
    issuer: 'Google',
  },
  {
    title: 'Anthropic Certified: Claude Code in Action',
    issuer: 'Anthropic',
  },
  {
    title: 'AI Tools Workshop',
    issuer: 'Quad AI school of technology',
  },
];

export default function Certifications() {
  return (
    <section className="certs-section" id="certifications">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        Certifications
      </motion.h2>
      <div className="certs-grid">
        {certs.map((cert, i) => (
          <motion.div
            className="cert-card"
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" }}
          >
            <div className="cert-icon">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
            </div>
            <h3 className="cert-title">{cert.title}</h3>
            <div className="cert-issuer">{cert.issuer}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
