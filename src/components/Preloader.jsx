import { useState, useEffect } from 'react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Simulate loading with easing — fast start, slow near end
      const remaining = 100 - current;
      const step = Math.max(1.5, remaining * 0.12);
      current = Math.min(current + step, 100);
      setProgress(Math.round(current));

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setHiding(true);
          setTimeout(() => {
            onComplete();
          }, 300);
        }, 150);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`preloader${hiding ? ' hidden' : ''}`}>
      <div className="preloader-name">Ankit Kumar Jha</div>
      <div className="preloader-tagline">Portfolio</div>
      <div className="preloader-bar-track">
        <div
          className="preloader-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="preloader-percent">{progress}%</div>
    </div>
  );
}
