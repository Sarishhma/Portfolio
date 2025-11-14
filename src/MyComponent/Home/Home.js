import React, { useEffect, useState, useCallback } from 'react';
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

export default function Home() {
  const [stage, setStage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Reset scroll and prevent flash
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = 'hidden';
    
    setIsLoaded(true);

    // Respect reduced motion preferences
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = mediaQuery.matches;

    const delays = prefersReducedMotion ? {
      HERO: 100,
      DESCRIPTION: 150,
      BUTTONS: 200,
      PROFILE_CARD: 250
    } : ANIMATION_DELAYS;

    const timeouts = [
      setTimeout(() => setStage(ANIMATION_STAGES.HERO), delays.HERO),
      setTimeout(() => setStage(ANIMATION_STAGES.DESCRIPTION), delays.DESCRIPTION),
      setTimeout(() => setStage(ANIMATION_STAGES.BUTTONS), delays.BUTTONS),
      setTimeout(() => setStage(ANIMATION_STAGES.PROFILE_CARD), delays.PROFILE_CARD),
    ];

    const enableScroll = setTimeout(() => {
      document.documentElement.style.overflow = 'auto';
    }, delays.PROFILE_CARD + 500);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(enableScroll);
      document.documentElement.style.overflow = 'auto';
    };
  }, []);

  const handleContactClick = useCallback((platform) => {
    const url = socialLinks[platform];
    url && window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  const handleExplore = useCallback((e) => {
    e.preventDefault();
    scrollToSection('projects');
  }, []);

  const handleDownloadCV = useCallback(() => {
    const link = document.createElement('a');
    link.href = '/cv/sarishma.pdf';
    link.download = 'sarishma_cv.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const isStageReached = (targetStage) => stage >= targetStage;

  return (
    <div className={`home-container ${isLoaded ? 'loaded' : ''}`}>
      <div className="main-content">
        <div className="text-content">
          <h1 className={`hero-title fade ${isStageReached(ANIMATION_STAGES.HERO) ? 'visible' : ''}`}>
            Hi I'm <span className="name-highlight">Sarishma Zimba</span>
          </h1>

          <div className={`fade ${isStageReached(ANIMATION_STAGES.DESCRIPTION) ? 'visible' : ''}`}>
            <BlurText
              text="A passionate application and web developer dedicated to crafting modern, high-performance digital experiences through innovative and user-friendly solutions."
              delay={70}
              animateBy="words"
              direction="top"
              className="description-blur"
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
          <ProfileCard
            name="Sarishma Zimba"
            title="Web Developer"
            handle="sarishhma"
            status="Online"
            contactText="Contact Me"
            avatarUrl="/Picture/profile.jpg"
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={true}
            onContactClick={() => handleContactClick('instagram')}
          />
        </div>
      </div>
    </div>
  );
}