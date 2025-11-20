import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import ProfileCard from '../Profile/ProfileCard';
import './Home.css';
import BlurText from '../SplitText/BlurText';
import { scrollToSection } from '../Header/Header';

// Constants
export const socialLinks = {
  instagram: 'https://www.instagram.com/sarishhma/'
};

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Simple mobile detection - FIXED
  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
    };

    // Initial check
    checkMobile();

    // Simple resize handler
    const handleResize = () => {
      checkMobile();
    };

    window.addEventListener('resize', handleResize);
    
    // Set loaded state immediately
    setIsLoaded(true);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Simple event handlers
  const handleContactClick = useCallback(() => {
    window.open(socialLinks.instagram, '_blank', 'noopener,noreferrer');
  }, []);

  const handleExplore = useCallback((e) => {
    e?.preventDefault();
    scrollToSection('projects');
  }, []);

  const handleDownloadCV = useCallback(() => {
    const link = document.createElement('a');
    link.href = '/cv/sarishma.pdf';
    link.download = 'sarishma_zimba_cv.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  // Simple props without complex animations
  const profileCardProps = useMemo(() => ({
    name: "Sarishma Zimba",
    title: "Web Developer",
    handle: "sarishhma",
    status: "Online",
    contactText: "Contact Me",
    avatarUrl: "/Picture/profile.jpg",
    showUserInfo: true,
    enableTilt: !isMobile,
    onContactClick: handleContactClick
  }), [isMobile, handleContactClick]);

  const blurTextProps = useMemo(() => ({
    text: "A passionate Web developer turning innovative ideas into high-performance applications.",
    delay: 30,
    animateBy: "words",
    direction: "top",
    className: "description-blur"
  }), []);

  return (
    <div className={`home-container ${isLoaded ? 'loaded' : ''}`}>
      <div className="main-content">
        <div className="text-content">
          <h1 className="hero-title visible">
            Hi I'm <span className="name-highlight">Sarishma Zimba</span>
          </h1>

          <div className="visible">
            <BlurText {...blurTextProps} />
          </div>

          <div className="hero-buttons visible">
            <button 
              onClick={handleDownloadCV} 
              className="btn btn-primary"
              aria-label="Download CV"
            >
              Download CV
            </button>
            <button 
              onClick={handleExplore} 
              className="btn btn-secondary"
              aria-label="Explore my projects"
            >
              Explore My Projects
            </button>
          </div>
        </div>

        <div className="profile-card-section visible">
          <ProfileCard {...profileCardProps} />
        </div>
      </div>
    </div>
  );
}