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
  HERO: 200,    // Reduced for mobile
  DESCRIPTION: 400,
  BUTTONS: 600,
  PROFILE_CARD: 800
};

const REDUCED_MOTION_DELAYS = {
  HERO: 50,
  DESCRIPTION: 100,
  BUTTONS: 150,
  PROFILE_CARD: 200
};

export default function Home() {
  const [stage, setStage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const timeoutRefs = useRef([]);
  const isIOS = useRef(false);

  // Detect iOS and mobile
  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
    };

    // Check if iOS
    isIOS.current = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    checkMobile();

    let resizeTimeout;
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkMobile, 200); // Increased debounce for mobile
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(clearTimeout);
      // Always ensure scroll is enabled
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  // Animation sequence - Mobile optimized
// Animation sequence - FIXED for mobile
useEffect(() => {
  const init = requestAnimationFrame(() => {
    window.scrollTo(0, 0);
    setIsLoaded(true);
  });

  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const prefersReducedMotion = mediaQuery.matches;

  const baseDelays = prefersReducedMotion ? REDUCED_MOTION_DELAYS : ANIMATION_DELAYS;
  const delays = isMobile ? {
    HERO: baseDelays.HERO,
    DESCRIPTION: baseDelays.DESCRIPTION,
    BUTTONS: baseDelays.BUTTONS,
    PROFILE_CARD: baseDelays.PROFILE_CARD
  } : baseDelays;

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

  return () => {
    cancelAnimationFrame(init);
    timeoutRefs.current.forEach(clearTimeout);
  };
}, [isMobile]);
  // Mobile-optimized event handlers
  const handleContactClick = useCallback((platform) => {
    const url = socialLinks[platform];
    if (url) {
      // Better mobile handling for external links
      window.location.href = url;
    }
  }, []);

  const handleExplore = useCallback((e) => {
    e?.preventDefault();
    // Add small delay for mobile to ensure smooth scroll
    setTimeout(() => {
      scrollToSection('projects');
    }, 100);
  }, []);

  const handleDownloadCV = useCallback(() => {
    // Mobile-optimized download
    requestAnimationFrame(() => {
      const link = document.createElement('a');
      link.href = '/cv/sarishma.pdf';
      link.download = 'sarishma_cv.pdf';
      link.style.display = 'none';
      
      // iOS specific handling
      if (isIOS.current) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
      
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
      }, 1000); // Longer timeout for mobile
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
    enableTilt: !isMobile && !isIOS.current, // Disable tilt on mobile and iOS
    enableMobileTilt: false,
    enableColorChange: !isMobile, // Disable color change on mobile
    onContactClick: () => handleContactClick('instagram')
  }), [isMobile, handleContactClick]);

  const blurTextProps = useMemo(() => ({
    text: "A passionate Web developer turning innovative ideas into seamless digital experiences, driven to build modern, high-performance applications that make a difference.",
    delay: isMobile ? 20 : 50, // Much faster on mobile
    animateBy: "words",
    direction: "top",
    className: "description-blur",
    skipAnimation: isMobile // Consider skipping animation on very slow devices
  }), [isMobile]);

  const containerClasses = useMemo(() => 
    `home-container ${isLoaded ? 'loaded' : ''} ${isMobile ? 'mobile' : ''} ${isIOS.current ? 'ios' : ''}`,
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
}/* ====== GLOBAL RESET & BASE STYLES ====== */
