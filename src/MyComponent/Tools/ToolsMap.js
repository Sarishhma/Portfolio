import React from 'react';
import './Tools.css';
import ShinyText from '../ShinyText/ShinyText'; 
import { ToolsImages } from '../assets/Tools';
import { Tools} from '../assets/Tools';

export default function ToolsSection() {
  const rows = [];
  const itemsPerRow = 3;
  
  for (let i = 0; i < Tools.length; i += itemsPerRow) {
    rows.push(Tools.slice(i, i + itemsPerRow));
  }

  return (
    <div className="tools-section">
      <h1
        className="tools-title"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-once="true"
      >
        Tools & Technologies
      </h1>

      <p
        className="tools-subtitle"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="200"
        data-aos-once="true"
      >
        My Professional Skills
      </p>

      <div className="tools-container">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="tools-row"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay={rowIndex * 150}
            data-aos-once="true"
          >
            {row.map((tool) => (
              <div key={tool.id} className="tool-card">
                
                {/* FIXED IMAGE LINE */}
                <img
                  src={ToolsImages[tool.id]}   // 👈 Correct way after mapping imports
                  alt={tool.name}
                  className="tool-image"
                />

                <div className="tool-text">
                  <div className="tool-name">
                    <ShinyText
                      text={tool.name}
                      disabled={false}
                      speed={3}
                      className="tool-title"
                    />
                  </div>
                  <p className="tool-description">{tool.info}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
