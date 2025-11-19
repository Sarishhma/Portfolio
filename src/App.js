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
    // Stage 1: show loading screen
    const t1 = setTimeout(() => {
      console.log('Stage: veil');
      setStage('veil');
    }, 2500);

    // Stage 2: show DarkVeil + Home
    const t2 = setTimeout(() => {
      console.log('Stage: home');
      setStage('home');
    }, 2700);

    // Stage 3: show rest of sections
    const t3 = setTimeout(() => {
      console.log('Stage: sections');
      setStage('sections');
    }, 3500);

    // Safety fallback - ensure we always show content
    const safetyTimer = setTimeout(() => {
      console.log('Safety timer triggered, forcing sections');
      setStage('sections');
    }, 5000);

    return () => [t1, t2, t3, safetyTimer].forEach(clearTimeout);
  }, []);

  // Debug current stage
  useEffect(() => {
    console.log('Current stage:', stage);
  }, [stage]);

  return (
    <div className="app-container">
      {stage === 'loading' && (
        <div className="loading-wrapper">
          <Loading />
        </div>
      )}

      {/* Always render main content after loading, just control visibility */}
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
                  <section id="home" className={`smooth-home ${stage === 'home' || stage === 'sections' ? 'visible' : ''}`}>
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