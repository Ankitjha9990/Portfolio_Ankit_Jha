import { motion } from 'framer-motion';
import '../styles/ProjectsGrid.css';

const projects = [
  {
    title: 'Cine Curator — Movie Discovery Web App',
    date: 'Apr 2026',
    org: 'Quad AI school of technology',
    desc: 'Developed a movie discovery web application using React.js, React Bootstrap, CSS, and the OMDb API. Features dynamic movie search, interactive movie cards, and detailed content rendering using API-based data fetching and component-based architecture.',
    skills: ['React.js', 'CSS', 'OMDb API', 'JavaScript'],
  },
  {
    title: 'Vrihi Skydeck — Restaurant Website',
    date: 'Mar 2026 – Apr 2026',
    org: 'Quad AI school of technology',
    desc: 'Developed a modern and responsive restaurant website using React.js, React Bootstrap, JavaScript, and CSS. Built reusable components for food menus, featured dishes, and smooth navigation — focused on frontend performance and responsive web design.',
    skills: ['React.js', 'JavaScript', 'CSS', 'React Bootstrap'],
  },
  {
    title: 'Cheerio — Interactive Campaign Management Dashboard',
    date: 'Nov 2025 – Feb 2026',
    org: 'Cheerio AI',
    desc: 'Developed a responsive and visually modern admin dashboard using HTML, CSS, and JavaScript. Implemented analytics components, navigation panels, dynamic frontend interactions, and reusable UI sections focused on accessibility and clean data presentation.',
    skills: ['HTML5', 'CSS', 'JavaScript', 'Dashboard UI'],
  },
];

export default function ProjectsGrid() {
  return (
    <section className="projects-section" id="projects">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        Projects
      </motion.h2>
      <div className="projects-grid">
        {projects.map((project, i) => (
          <motion.div
            className="project-card"
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
          >
            <div className="project-number">0{i + 1}</div>
            <h3 className="project-title">{project.title}</h3>
            <div className="project-meta">
              <span className="project-date">{project.date}</span>
              <span className="project-dot">·</span>
              <span className="project-org">{project.org}</span>
            </div>
            <p className="project-desc">{project.desc}</p>
            <div className="skill-tags">
              {project.skills.map((skill, idx) => (
                <span className="skill-tag" key={idx}>
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
