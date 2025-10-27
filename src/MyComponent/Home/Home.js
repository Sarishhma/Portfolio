import React from 'react';
import ProfileCard from '../Profile/ProfileCard';
import './Home.css';
import BlurText from '../SplitText/BlurText';
import { scrollToSection } from '../Header/Header'

export const socialLinks = {
  instagram: 'https://www.instagram.com/sarishhma/'
}

export default function Home() {
  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  const handleContactClick = (platform) => {
    const url = socialLinks[platform];
    if (url) {
      window.open(url, '_blank');
    }
  }

  const handleExplore = (e) => {
    e.preventDefault();
    scrollToSection('projects');
  }

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/cv/sarishma.pdf';
    link.download = 'sarishmaCv.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div 
      className='home-container'
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-once="true"
    >
      <div className="main-content">
        <div className="text-content">
          <h1 
            className="hero-title"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="200"
            data-aos-once="true"
          >
            Hi I'm <span className="name-highlight">Sarishma Zimba</span>
          </h1>
          
          <div
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="400"
            data-aos-once="true"
          >
            <BlurText
              text="A passionate application and web developer dedicated to crafting modern, high-performance digital experiences through innovative and user-friendly solutions."
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="description-blur"
            />
          </div>
          
          <div 
            className="hero-buttons"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="600"
            data-aos-once="true"
          >
            <button onClick={handleDownloadCV} className="btn btn-primary">Download CV</button>
            <button onClick={handleExplore} className="btn btn-secondary">Explore My Projects</button>
          </div>
        </div>

        <div 
          className="profile-card-section"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="800"
          data-aos-once="true"
        >
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