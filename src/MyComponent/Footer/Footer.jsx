import "remixicon/fonts/remixicon.css";
import Dock from "../Dock/Dock";
import { VscHome, VscArchive, VscAccount } from "react-icons/vsc";
import "./Footer.css";

// Memoize the items array to prevent unnecessary re-renders
const FooterItems = [
  { 
    icon: <VscHome size={16} />, 
    label: "Home", 
    onClick: () => {
      const homeElement = document.getElementById("home");
      homeElement?.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    } 
  },
  { 
    icon: <VscAccount size={16} />, 
    label: "About", 
    onClick: () => {
      const aboutElement = document.getElementById("about");
      aboutElement?.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    } 
  },
  { 
    icon: <VscArchive size={16} />, 
    label: "Projects", 
    onClick: () => {
      const projectsElement = document.getElementById("projects");
      projectsElement?.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    } 
  },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="footer-container" role="contentinfo">
      <div className="footer-content">
        
        {/* Portfolio Heading - Left */}
        <div className="footer-brand">
          <a 
            href="#home" 
            className="portfolio-heading"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            aria-label="Scroll to top"
          >
            Portfolio
          </a>
        </div>

        {/* Dock Navigation - Center */}
        <div className="footer-dock">
          <Dock 
            items={FooterItems}
            panelHeight={28}
            baseItemSize={55}
            magnification={90}
          />
        </div>

        {/* Social Links - Right */}
        <div className="footer-social">
          <div className="social-icons">
            <a 
              href="https://github.com/sarishhma" 
              className="social-link"
              aria-label="Visit GitHub profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="ri-github-fill"></i>
            </a>
            <a 
              href="https://www.instagram.com/sarishhma/" 
              className="social-link"
              aria-label="Visit Instagram profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="ri-instagram-fill"></i>
            </a>
            <a 
              href="https://www.linkedin.com/in/sarishma-zimba-62508936a/" 
              className="social-link"
              aria-label="Visit LinkedIn profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="ri-linkedin-fill"></i>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;