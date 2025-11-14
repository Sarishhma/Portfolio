import React, { useMemo, useCallback, lazy, Suspense } from 'react';
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

  // Memoize the click handler to prevent unnecessary re-renders
  const handleItemClick = useCallback((item) => {
    navigate('/choose', { state: item });
  }, [navigate]);

  // Memoize items to prevent unnecessary re-renders
  const memoizedItems = useMemo(() => items, []);

  return (
    <section 
      id="projects" 
      className="project-section"
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
            radius={300}
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
            columns={3}
          />
        </Suspense>
      </div>
    </section>
  );
}