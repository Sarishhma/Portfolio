import React from 'react';
import './Projects.css';
import { items } from "../ChromaGrid/Chromuse";
import ChromaGrid from '../ChromaGrid/ChromaGrid';
import { useNavigate } from 'react-router-dom';

export default function Projects() {
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    console.log("Card clicked:", item);
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
      <div className="project-content">
        <h1
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="200"
          data-aos-once="true"
        >
          My Projects
        </h1>
        <p
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="300"
          data-aos-once="true"
        >
          Here's a curated set of projects that showcase my skills, creativity, 
          and dedication to creating meaningful digital solutions.
        </p>
        
        <div 
          className="chroma-grid-container"
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="400"
          data-aos-once="true"
        >
          <ChromaGrid
            items={items}
            onItemClick={handleItemClick}
            radius={300}
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
          />
        </div>
      </div>
    </section>
  );
}