import "remixicon/fonts/remixicon.css";
import Dock from "../Dock/Dock";
import { VscHome, VscArchive, VscAccount } from "react-icons/vsc";
import "./Footer.css";

const Footer = () => {
  const items = [
    { 
      icon: <VscHome size={18} />, 
      label: "Home", 
      onClick: () => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }) 
    },
    { 
      icon: <VscAccount size={18} />, 
      label: "About Me", 
      onClick: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }) 
    },
    { 
      icon: <VscArchive size={18} />, 
      label: "Project", 
      onClick: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }) 
    },
  ];

  return (
    <div className="footer-container">
      <div className="footer-content">

        
        <div className="footer-social">
          <div className="social-icons">
            <a href="https://github.com/sarishhma" className="social-link">
              <i className="ri-github-fill ri-2x"></i>
            </a>
            <a href="https://www.instagram.com/sarishhma/" className="social-link">
              <i className="ri-instagram-fill ri-2x"></i>
            </a>
            <a href="https://www.linkedin.com/in/sarishma-zimba-62508936a/" className="social-link">
            <i className="ri-linkedin-fill ri-2x"></i>
            </a>
          </div>
        </div>

        {/* Dock - Right on desktop, bottom on mobile */}
        <div className="footer-dock">
          <Dock 
            items={items}
            panelHeight={30}
            baseItemSize={60}
            magnification={100}
          />
        </div>

      </div>
    </div>
  );
};

export default Footer;