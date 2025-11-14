import React, { useEffect, useState, useCallback, useMemo } from 'react';
import ProfileCard from '../Profile/ProfileCard';
import './Home.css';
import BlurText from '../SplitText/BlurText';
import { scrollToSection } from '../Header/Header';

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

// Memoized animation delays to prevent recalculation
const getAnimationDelays = (prefersReducedMotion) => {
  if (prefersReducedMotion) {
    return {
      HERO: 100,
      DESCRIPTION: 150,
      BUTTONS: 200,
      PROFILE_CARD: 250
    };
  }
  return ANIMATION_DELAYS;
};

export default function Home() {
  const [stage, setStage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device and reduce motion preferences
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    // Debounced resize listener
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkMobile, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  useEffect(() => {
    // Use requestAnimationFrame for smoother initial setup
    const init = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.style.overflow = 'hidden';
      setIsLoaded(true);
    });

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = mediaQuery.matches;

    const delays = getAnimationDelays(prefersReducedMotion);

    // Use faster animations for mobile
    const adjustedDelays = isMobile ? {
      HERO: delays.HERO,
      DESCRIPTION: delays.DESCRIPTION - 200,
      BUTTONS: delays.BUTTONS - 300,
      PROFILE_CARD: delays.PROFILE_CARD - 400
    } : delays;

    const timeouts = [
      setTimeout(() => setStage(ANIMATION_STAGES.HERO), adjustedDelays.HERO),
      setTimeout(() => setStage(ANIMATION_STAGES.DESCRIPTION), adjustedDelays.DESCRIPTION),
      setTimeout(() => setStage(ANIMATION_STAGES.BUTTONS), adjustedDelays.BUTTONS),
      setTimeout(() => setStage(ANIMATION_STAGES.PROFILE_CARD), adjustedDelays.PROFILE_CARD),
    ];

    const enableScroll = setTimeout(() => {
      document.documentElement.style.overflow = 'auto';
    }, adjustedDelays.PROFILE_CARD + 500);

    return () => {
      cancelAnimationFrame(init);
      timeouts.forEach(clearTimeout);
      clearTimeout(enableScroll);
      document.documentElement.style.overflow = 'auto';
    };
  }, [isMobile]); // Re-run when mobile detection changes

  const handleContactClick = useCallback((platform) => {
    const url = socialLinks[platform];
    if (url) {
      // Use non-blocking approach for external links
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
      if (newWindow) newWindow.opener = null;
    }
  }, []);

  const handleExplore = useCallback((e) => {
    e.preventDefault();
    // Use smooth scroll with fallback
    scrollToSection('projects');
  }, []);

  const handleDownloadCV = useCallback(() => {
    // Preload the CV file for better performance
    const link = document.createElement('a');
    link.href = '/cv/sarishma.pdf';
    link.download = 'sarishma_cv.pdf';
    link.style.display = 'none';
    document.body.appendChild(link);
    
    // Use requestAnimationFrame for smoother interaction
    requestAnimationFrame(() => {
      link.click();
      // Remove after a short delay
      setTimeout(() => {
        document.body.removeChild(link);
      }, 100);
    });
  }, []);

  const isStageReached = useCallback((targetStage) => stage >= targetStage, [stage]);

  // Memoize the profile card props to prevent unnecessary re-renders
  const profileCardProps = useMemo(() => ({
    name: "Sarishma Zimba",
    title: "Web Developer",
    handle: "sarishhma",
    status: "Online",
    contactText: "Contact Me",
    avatarUrl: "/Picture/profile.jpg",
    showUserInfo: true,
    enableTilt: !isMobile, // Disable tilt on mobile for better performance
    enableMobileTilt: false,
    onContactClick: () => handleContactClick('instagram')
  }), [isMobile, handleContactClick]);

  return (
    <div className={`home-container ${isLoaded ? 'loaded' : ''} ${isMobile ? 'mobile' : ''}`}>
      <div className="main-content">
        <div className="text-content">
          <h1 className={`hero-title fade ${isStageReached(ANIMATION_STAGES.HERO) ? 'visible' : ''}`}>
            Hi I'm <span className="name-highlight">Sarishma Zimba</span>
          </h1>

          <div className={`fade ${isStageReached(ANIMATION_STAGES.DESCRIPTION) ? 'visible' : ''}`}>
            <BlurText
              text="A passionate application and web developer dedicated to crafting modern, high-performance digital experiences through innovative and user-friendly solutions."
              delay={isMobile ? 40 : 70} // Faster animation on mobile
              animateBy="words"
              direction="top"
              className="description-blur"
              // Add performance optimization props if BlurText supports them
              skipAnimation={false} // Assuming BlurText has this prop
            />
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