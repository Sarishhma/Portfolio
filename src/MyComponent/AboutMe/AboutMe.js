import React, { useEffect, useRef } from 'react';
import './AboutMe.css';

const stats = [
  { number: '20+', label: 'Projects Finished', delay: 700 },
  { number: '1+', label: 'Years of Experience', delay: 800 },
  { number: '3.75/4.00', label: 'GPA', delay: 900 },
];

export default function AboutMe() {
  const blurRef = useRef(null);
  
  // Optimize animations for performance
  useEffect(() => {
    const handleScroll = () => {
      if (blurRef.current) {
        const element = blurRef.current;
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible) {
          element.style.animationPlayState = 'running';
        } else {
          element.style.animationPlayState = 'paused';
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="About-all">
      <div 
        className="Blur" 
        ref={blurRef}
      >
        {/* Text Section */}
        <div className="about-text-content">
          <h1 className="about-title">
            About Me
          </h1>
          <p className="paragraph">
           I’m Sarishma Zimba, a passionate Web developer dedicated to crafting modern,high-performance web applications. I love transforming creative ideas into seamless digital experiences that are both functional and user-friendly. With hands-on experience in React, Django, and API integrations, I focus on building projects that not only look great but also deliver real value. My goal is to continuously learn, innovate, and contribute to meaningful projects that push the boundaries of technology.
          </p>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <div className="stats-grid">
            {stats.map(stat => (
              <div 
                key={stat.label} 
                className="stat-item"
              >
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="stats-quote">
           Turning ideas into code, and code into experiences.
          </div>
        </div>
      </div>
    </div>
  );
}