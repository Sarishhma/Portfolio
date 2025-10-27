// import React from 'react'
// import './Header.css'


//   // Smooth scroll function
//  export const scrollToSection = (sectionId) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       const offsetTop = element.offsetTop - 80; // Adjust for header height
//       window.scrollTo({
//         top: offsetTop,
//         behavior: 'smooth'
//       });
//     }
//   };
// export default function Header() {
//   return (
//     <div className='main'>Portfolio
//       <div className="nav-links-container">
//         <a href="#home" onClick={(e) => {
//           e.preventDefault();
//           scrollToSection('home');
//         }}>Home</a>
        
//         <a href="#about" onClick={(e) => {
//           e.preventDefault();
//           scrollToSection('about');
//         }}>About</a>
        
//         <a href="#tools" onClick={(e) => {
//           e.preventDefault();
//           scrollToSection('tools');
//         }}>Tools</a>
        
//         <a href="#projects" onClick={(e) => {
//           e.preventDefault();
//           scrollToSection('projects');
//         }}>Projects</a>
//       </div>
//     </div>
//   )
// }
import React, { useState } from 'react';
import './Header.css';

// Smooth scroll function
export const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const offsetTop = element.offsetTop - 80; // Adjust for header height
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false); // Close menu after click
  };

  return (
    <header className="main">
      <div className="logo">Portfolio</div>

      {/* Hamburger for mobile */}
      <div className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav className={`nav-links-container ${isMenuOpen ? 'show' : ''}`}>
        <a href="#home" onClick={() => handleNavClick('home')}>Home</a>
        <a href="#about" onClick={() => handleNavClick('about')}>About</a>
        <a href="#tools" onClick={() => handleNavClick('tools')}>Tools</a>
        <a href="#projects" onClick={() => handleNavClick('projects')}>Projects</a>
      </nav>
    </header>
  );
}
