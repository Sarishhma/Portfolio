import React, { useState, useEffect } from 'react';
import './Loading.css';
import Darkveil from "../DarkVeil/DarkVeil";
import "../DarkVeil/DarkVeil.css";

const Loading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3000; // 3 seconds total
    const interval = 30; // Update every 30ms
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="spinner"></div>
        <h1 className="loading-title">Portfolio</h1>
        
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="progress-text">{Math.round(progress)}%</span>
        </div>
      </div>
       <div style={{width:'100vw', height:'100vh',position:'absolute', top:'0', left:'0',zIndex:-1}}><Darkveil/></div> 
    </div>
  );
};

export default Loading;