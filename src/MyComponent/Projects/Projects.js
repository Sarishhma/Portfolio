import React from 'react';
import './Projects.css';
import { items } from "../ChromaGrid/Chromuse";
import ChromaGrid from '../ChromaGrid/ChromaGrid';
import { useNavigate } from 'react-router-dom';

export default function Projects() {
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    navigate('/choose', { state: item });
  };

  return (
    <section 
      id="projects" 
      className="project-section"
      data-aos="fade-up"
      data-aos-duration="800"
      data-aos-once="true"
    >
      <div className="project-header">
        <h1 
          data-aos="fade-up" 
          data-aos-duration="600"
          data-aos-delay="100"
        >
          My Projects
        </h1>
        <p 
          data-aos="fade-up" 
          data-aos-duration="600"
          data-aos-delay="200"
        >
          Curated projects showcasing my skills, creativity, and dedication.
        </p>
      </div>

      <div 
        className="chroma-grid-container"
        data-aos="fade-up" 
        data-aos-duration="800"
        data-aos-delay="300"
      >
        <ChromaGrid
          items={items}
          onItemClick={handleItemClick}
          radius={300}
          damping={0.45}
          fadeOut={0.6}
          ease="power3.out"
          columns={3}
        />
      </div>
    </section>
  );
}