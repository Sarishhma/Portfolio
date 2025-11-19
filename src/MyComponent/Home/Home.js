import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import ProfileCard from '../Profile/ProfileCard';
import './Home.css';
import BlurText from '../SplitText/BlurText';
import { scrollToSection } from '../Header/Header';

// Constants
export const socialLinks = {
  instagram: 'https://www.instagram.com/sarishhma/'
};

const ANIMATION_STAGES = {
  HERO: 1,
  DESCRIPTION: 2,
  BUTTONS: 3,
  PROFILE_CARD: 4
};

const ANIMATION_DELAYS = {
  HERO: 400,
  DESCRIPTION: 800,
  BUTTONS: 1200,
  PROFILE_CARD: 1600
};

const REDUCED_MOTION_DELAYS = {
  HERO: 100,
  DESCRIPTION: 150,
  BUTTONS: 200,
  PROFILE_CARD: 250
};

// Memoized constants
const getAnimationDelays = (prefersReducedMotion, isMobile) => {
  const baseDelays = prefersReducedMotion ? REDUCED_MOTION_DELAYS : ANIMATION_DELAYS;
  
  if (!isMobile) return baseDelays;
  
  // Faster animations for mobile
  return {
    HERO: baseDelays.HERO,
    DESCRIPTION: baseDelays.DESCRIPTION - 200,
    BUTTONS: baseDelays.BUTTONS - 300,
    PROFILE_CARD: baseDelays.PROFILE_CARD - 400
  };
};

export default function Home() {
  const [stage, setStage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const timeoutRefs = useRef([]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(clearTimeout);
      document.documentElement.style.overflow = 'auto';
    };
  }, []);

  // Mobile detection with throttling
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();

    let resizeTimeout;
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkMobile, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Animation sequence
  useEffect(() => {
    const init = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.style.overflow = 'hidden';
      setIsLoaded(true);
    });

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = mediaQuery.matches;
    const delays = getAnimationDelays(prefersReducedMotion, isMobile);

    // Clear existing timeouts
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];

    // Set new timeouts
    timeoutRefs.current.push(
      setTimeout(() => setStage(ANIMATION_STAGES.HERO), delays.HERO),
      setTimeout(() => setStage(ANIMATION_STAGES.DESCRIPTION), delays.DESCRIPTION),
      setTimeout(() => setStage(ANIMATION_STAGES.BUTTONS), delays.BUTTONS),
      setTimeout(() => setStage(ANIMATION_STAGES.PROFILE_CARD), delays.PROFILE_CARD)
    );

    const enableScroll = setTimeout(() => {
      document.documentElement.style.overflow = 'auto';
    }, delays.PROFILE_CARD + 500);

    timeoutRefs.current.push(enableScroll);

    return () => {
      cancelAnimationFrame(init);
      timeoutRefs.current.forEach(clearTimeout);
    };
  }, [isMobile]);

  // Event handlers
  const handleContactClick = useCallback((platform) => {
    const url = socialLinks[platform];
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, []);

  const handleExplore = useCallback((e) => {
    e?.preventDefault();
    scrollToSection('projects');
  }, []);

  const handleDownloadCV = useCallback(() => {
    requestAnimationFrame(() => {
      const link = document.createElement('a');
      link.href = '/cv/sarishma.pdf';
      link.download = 'sarishma_cv.pdf';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        document.body.removeChild(link);
      }, 100);
    });
  }, []);

  // Memoized values
  const isStageReached = useCallback((targetStage) => stage >= targetStage, [stage]);

  const profileCardProps = useMemo(() => ({
    name: "Sarishma Zimba",
    title: "Web Developer",
    handle: "sarishhma",
    status: "Online",
    contactText: "Contact Me",
    avatarUrl: "/Picture/profile.jpg",
    showUserInfo: true,
    enableTilt: !isMobile,
    enableMobileTilt: false,
    enableColorChange: !isMobile,
    onContactClick: () => handleContactClick('instagram')
  }), [isMobile, handleContactClick]);

  const blurTextProps = useMemo(() => ({
    text: "A passionate Web developer turning innovative ideas into seamless digital experiences, driven to build modern, high-performance applications that make a difference.",
    delay: isMobile ? 40 : 70,
    animateBy: "words",
    direction: "top",
    className: "description-blur",
    skipAnimation: false
  }), [isMobile]);

  // Container classes
  const containerClasses = useMemo(() => 
    `home-container ${isLoaded ? 'loaded' : ''} ${isMobile ? 'mobile' : ''}`,
    [isLoaded, isMobile]
  );

  return (
    <div className={containerClasses}>
      <div className="main-content">
        <div className="text-content">
          <h1 className={`hero-title fade ${isStageReached(ANIMATION_STAGES.HERO) ? 'visible' : ''}`}>
            Hi I'm <span className="name-highlight">Sarishma Zimba</span>
          </h1>

          <div className={`fade ${isStageReached(ANIMATION_STAGES.DESCRIPTION) ? 'visible' : ''}`}>
            <BlurText {...blurTextProps} />
          </div>

          <div className={`hero-buttons fade ${isStageReached(ANIMATION_STAGES.BUTTONS) ? 'visible' : ''}`}>
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

        <div className={`profile-card-section fade ${isStageReached(ANIMATION_STAGES.PROFILE_CARD) ? 'visible' : ''}`}>
          <ProfileCard {...profileCardProps} />
        </div>
      </div>
    </div>
  );
}