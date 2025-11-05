import React, { useEffect, useState } from 'react';
import ProfileCard from '../Profile/ProfileCard';
import './Home.css';
import BlurText from '../SplitText/BlurText';
import { scrollToSection } from '../Header/Header';

export const socialLinks = {
  instagram: 'https://www.instagram.com/sarishhma/'
};

export default function Home() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Sequential appearance: 0 → 1 → 2 → 3
    const timeouts = [
      setTimeout(() => setStage(1), 400),  // Hero
      setTimeout(() => setStage(2), 900),  // Description
      setTimeout(() => setStage(3), 1400), // Buttons
      setTimeout(() => setStage(4), 1900), // Profile Card
    ];

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const handleContactClick = (platform) => {
    const url = socialLinks[platform];
    if (url) window.open(url, '_blank');
  };

  const handleExplore = (e) => {
    e.preventDefault();
    scrollToSection('projects');
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/cv/sarishma.pdf';
    link.download = 'sarishmaCv.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="home-container">
      <div className="main-content">
        <div className="Home-text-content">
          {/* Hero Title */}
          <h1 className={`hero-title fade ${stage >= 1 ? 'visible' : ''}`}>
            Hi I'm <span className="name-highlight">Sarishma Zimba</span>
          </h1>

          {/* Description */}
          <div className={`fade ${stage >= 2 ? 'visible' : ''}`}>
            <BlurText
              text="A passionate application and web developer dedicated to crafting modern, high-performance digital experiences through innovative and user-friendly solutions."
              delay={80}
              animateBy="words"
              direction="top"
              className="description-blur"
            />
          </div>

          {/* Buttons */}
          <div className={`hero-buttons fade ${stage >= 3 ? 'visible' : ''}`}>
            <button onClick={handleDownloadCV} className="btn btn-primary">
              Download CV
            </button>
            <button onClick={handleExplore} className="btn btn-secondary">
              Explore My Projects
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className={`profile-card-section fade ${stage >= 4 ? 'visible' : ''}`}>
          <div className="profile-card-wrapper">
            <ProfileCard
              name="Sarishma Zimba"
              title="Web Developer"
              handle="sarishhma"
              status="Online"
              contactText="Contact Me"
              avatarUrl="/Picture/profile.jpg"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => handleContactClick('instagram')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
