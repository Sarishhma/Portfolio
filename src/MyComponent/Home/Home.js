import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
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
  HERO: 200,
  DESCRIPTION: 400,
  BUTTONS: 600,
  PROFILE_CARD: 800,
};

const REDUCED_MOTION_DELAYS = {
  HERO: 50,
  DESCRIPTION: 100,
  BUTTONS: 150,
  PROFILE_CARD: 200,
};

export default function Home() {
  const [stage, setStage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const timeoutRefs = useRef([]);
  const isIOS = useRef(false);

  // Detect mobile + iOS
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    isIOS.current = /iPad|iPhone|iPod/.test(navigator.userAgent);
    checkMobile();

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkMobile, 200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Cleanup any leftover timeouts
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(clearTimeout);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  // Animation sequence (FIXED)
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
      setIsLoaded(true);
    }, 50);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = mediaQuery.matches;

    const base = prefersReducedMotion ? REDUCED_MOTION_DELAYS : ANIMATION_DELAYS;

    const delays = isMobile ? base : base;

    // Clear old timers
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];

    timeoutRefs.current.push(
      setTimeout(() => setStage(ANIMATION_STAGES.HERO), delays.HERO),
      setTimeout(() => setStage(ANIMATION_STAGES.DESCRIPTION), delays.DESCRIPTION),
      setTimeout(() => setStage(ANIMATION_STAGES.BUTTONS), delays.BUTTONS),
      setTimeout(() => setStage(ANIMATION_STAGES.PROFILE_CARD), delays.PROFILE_CARD)
    );

    return () => {
      timeoutRefs.current.forEach(clearTimeout);
    };
  }, [isMobile]);

  // Handlers
  const handleContactClick = useCallback(() => {
    window.location.href = socialLinks.instagram;
  }, []);

  const handleExplore = useCallback((e) => {
    e.preventDefault();
    setTimeout(() => {
      scrollToSection('projects');
    }, 100);
  }, []);

  const handleDownloadCV = useCallback(() => {
    requestAnimationFrame(() => {
      const link = document.createElement('a');
      link.href = '/cv/sarishma.pdf';
      link.download = 'sarishma_cv.pdf';

      if (isIOS.current) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }

      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        if (document.body.contains(link)) document.body.removeChild(link);
      }, 800);
    });
  }, []);

  const isStageReached = useCallback((target) => stage >= target, [stage]);

  const profileCardProps = useMemo(() => ({
    name: "Sarishma Zimba",
    title: "Web Developer",
    handle: "sarishhma",
    status: "Online",
    contactText: "Contact Me",
    avatarUrl: "/Picture/profile.jpg",
    showUserInfo: true,
    enableTilt: !isMobile && !isIOS.current,
    enableMobileTilt: false,
    enableColorChange: !isMobile,
    onContactClick: handleContactClick
  }), [isMobile, handleContactClick]);

  const blurTextProps = useMemo(() => ({
    text: "A passionate Web developer turning innovative ideas into seamless digital experiences, driven to build modern, high-performance applications that make a difference.",
    delay: isMobile ? 20 : 50,
    animateBy: "words",
    direction: "top",
    className: "description-blur",
    skipAnimation: isMobile
  }), [isMobile]);

  const containerClasses = `home-container ${isLoaded ? 'loaded' : ''} ${isMobile ? 'mobile' : ''} ${isIOS.current ? 'ios' : ''}`;

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
            <button onClick={handleDownloadCV} className="btn btn-primary">Download CV</button>
            <button onClick={handleExplore} className="btn btn-secondary">Explore My Projects</button>
          </div>
        </div>

        <div className={`profile-card-section fade ${isStageReached(ANIMATION_STAGES.PROFILE_CARD) ? 'visible' : ''}`}>
          <ProfileCard {...profileCardProps} />
        </div>
      </div>
    </div>
  );
}
