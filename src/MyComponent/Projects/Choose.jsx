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
        <h1>No project selected</h1>
      </div>
    );
  }

  return (
    <div className="choose-section">
      <div className="project-card">
        <div className="project-image-wrapper">
          <img src={item.image} alt={item.title} className="project-image" />
        </div>
        <div className="project-content">
          <button onClick={handleClose} className="X">
            X
          </button>
          <h2>{item.title}</h2>
          <p className="project-subtitle">{item.subtitle}</p>
          <p className="project-description">
            {item.description}
          </p>
          

          
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="project-button"
            >
              Live View
            </a>
          )}
        </div>
      </div>
    </div>
  );
}