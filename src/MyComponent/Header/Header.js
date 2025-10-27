import React from 'react'
import './Header.css'


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
  return (
    <div className='main'>Portfolio
      <div className="nav-links-container">
        <a href="#home" onClick={(e) => {
          e.preventDefault();
          scrollToSection('home');
        }}>Home</a>
        
        <a href="#about" onClick={(e) => {
          e.preventDefault();
          scrollToSection('about');
        }}>About</a>
        
        <a href="#tools" onClick={(e) => {
          e.preventDefault();
          scrollToSection('tools');
        }}>Tools</a>
        
        <a href="#projects" onClick={(e) => {
          e.preventDefault();
          scrollToSection('projects');
        }}>Projects</a>
      </div>
    </div>
  )
}