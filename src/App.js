import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loading from "./MyComponent/Loading/Loading";
import DarkVeil from './MyComponent/DarkVeil/DarkVeil';
import Header from './MyComponent/Header/Header';
import Home from './MyComponent/Home/Home';
import AboutMe from './MyComponent/AboutMe/AboutMe';
import ToolsMap from './MyComponent/Tools/ToolsMap';
import Projects from './MyComponent/Projects/Projects';
import Choose from "./MyComponent/Projects/Choose";
import Footer from './MyComponent/Footer/Footer';
import Chat from './MyComponent/ChatRoom/Chat';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  const [stage, setStage] = useState('loading'); 
  
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      offset: 100
    });
  }, []);

  useEffect(() => {
    // Add iPhone/Safari detection
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    console.log('Running on iOS:', isIOS);
    
    // Adjust timings for better performance
    const stage1 = setTimeout(() => {
      console.log('Stage: veil');
      setStage('veil');
    }, 2000);

    const stage2 = setTimeout(() => {
      console.log('Stage: home');
      setStage('home');
    }, 2500);

    const stage3 = setTimeout(() => {
      console.log('Stage: sections');
      setStage('sections');
    }, 3200);

    // Safety fallback
    const safetyTimer = setTimeout(() => {
      console.log('Safety fallback triggered');
      setStage('sections');
    }, 5000);

    return () => {
      clearTimeout(stage1);
      clearTimeout(stage2);
      clearTimeout(stage3);
      clearTimeout(safetyTimer);
    };
  }, []);

  return (
    <div className="app-container">
      {stage === 'loading' && (
        <div className="loading-wrapper">
          <Loading />
        </div>
      )}

      {stage !== 'loading' && (
        <>
          <DarkVeil />
          
          <Header />

          <Routes>
            <Route
              path="/"
              element={
                <>
                  {/* Always render Home but control visibility */}
                  <section 
                    id="home" 
                    className={`smooth-home ${stage === 'home' || stage === 'sections' ? 'visible' : ''}`}
                  >
                    <Home />
                  </section>

                  {/* Render other sections when ready */}
                  {stage === 'sections' && (
                    <>
                      <section id="about" className="smooth-section">
                        <AboutMe />
                      </section>
                      <section id="tools" className="smooth-section">
                        <ToolsMap />
                      </section>
                      <section id="projects" className="smooth-section">
                        <Projects />
                      </section>
                      <section id="chat" className="smooth-section">
                        <Chat />
                      </section>
                      <section id="footer" className="smooth-section">
                        <Footer />
                      </section>
                    </>
                  )}
                </>
              }
            />
            <Route path="/choose" element={<Choose />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;