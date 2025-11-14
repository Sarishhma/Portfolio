import React from "react";
import "./Projects.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function Choose() {
  const location = useLocation();
  const item = location.state;
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/", { replace: true });
    setTimeout(() => {
      const section = document.getElementById("projects");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  if (!item) {
    return (
      <div className="choose-section">
        <div className="error-state">
          <h1>No project selected</h1>
          <button onClick={() => navigate("/")} className="project-button">
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="choose-section">
      <div className="project-card">
        <div className="project-image-wrapper">
          <img 
            src={item.image} 
            alt={item.title} 
            className="project-image"
            loading="lazy"
          />
        </div>
        <div className="project-content">
          <button onClick={handleClose} className="X" aria-label="Close project">
            ×
          </button>
          <h2>{item.title}</h2>
          <p className="project-subtitle">{item.subtitle}</p>
          <p className="project-description">
            {item.description}
          </p>
          
          {item.tech && (
            <div className="project-tech">
              {item.tech.map((tech, index) => (
                <span key={index} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          )}
          
          <div className="project-buttons">
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-button"
              >
                <span>🌐</span> Live View
              </a>
            )}
            {item.github && (
              <a
                href={item.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-button secondary"
              >
                <span>💻</span> Source Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}