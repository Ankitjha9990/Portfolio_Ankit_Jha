import '../styles/TagScroll.css';

const tags = [
  'AI & ML Undergrad',
  'Front-End Developer',
  'React.js',
  'UI/UX Design',
  'Cheerio AI Intern',
  'iHack IITB Finalist',
  'Creative Problem Solver',
  'Anthropic Certified',
  'JavaScript',
  'API Integration',
  'Generative AI',
  'Quad AI school of technology',
];

function TagRow({ reverse }) {
  // Duplicate tags to create seamless loop
  const doubled = [...tags, ...tags];
  return (
    <div className={`marquee-track${reverse ? ' reverse' : ''}`}>
      {doubled.map((tag, i) => (
        <span className="tag" key={i}>
          {tag}
        </span>
      ))}
    </div>
  );
}

export default function TagScroll() {
  return (
    <div className="tag-scroll-wrapper">
      <TagRow />
      <TagRow reverse />
    </div>
  );
}
