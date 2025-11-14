import React, { useMemo, useCallback, lazy, Suspense, useEffect, useState } from 'react';
import './Projects.css';
import { items } from "../ChromaGrid/Chromuse";
import { useNavigate } from 'react-router-dom';

// Lazy load ChromaGrid for better performance
const ChromaGrid = lazy(() => import('../ChromaGrid/ChromaGrid'));

// Loading fallback component
const GridLoader = () => (
  <div className="grid-loader">
    <div className="loader-spinner"></div>
    <p>Loading projects...</p>
  </div>
);

export default function Projects() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile and optimize accordingly
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkMobile, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Optimized click handler for mobile
  const handleItemClick = useCallback((item) => {
    // Use requestAnimationFrame for smoother transitions on mobile
    requestAnimationFrame(() => {
      navigate('/choose', { state: item });
    });
  }, [navigate]);

  // Memoize items to prevent unnecessary re-renders
  const memoizedItems = useMemo(() => items, []);

  return (
    <section 
      id="projects" 
      className={`project-section ${isMobile ? 'mobile' : ''}`}
    >
      <div className="project-header">
        <h1 className="project-title">
          My Projects
        </h1>
        <p className="project-subtitle">
          Curated projects showcasing my skills, creativity, and dedication.
        </p>
      </div>

      <div className="chroma-grid-container">
        <Suspense fallback={<GridLoader />}>
          <ChromaGrid
            items={memoizedItems}
            onItemClick={handleItemClick}
            radius={isMobile ? 200 : 300} // Reduced radius on mobile
            damping={isMobile ? 0.6 : 0.45} // More damping on mobile
            fadeOut={0.6}
            ease="power2.out" // Smoother easing
            columns={isMobile ? 2 : 3} // Fewer columns on mobile
            reduceMotion={isMobile} // Pass mobile flag to reduce animations
          />
        </Suspense>
      </div>
    </section>
  );
}