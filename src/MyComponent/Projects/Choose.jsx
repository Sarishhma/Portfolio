
import React from "react";
import "./Projects.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function Choose() {
  const location = useLocation();
  const item = location.state;
  const navigate = useNavigate();

  const handleClose = () => {
    // Navigate back to home route
    navigate("/", { replace: true });

    // Wait a short moment for the page to render, then scroll
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
          <p>{item.subtitle}</p>
          <p className="project-description">
            {item.description
              ? item.description
              : "No additional description provided."}
          </p>
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="project-button"
            >
              Source Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
