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
    useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      offset: 100
    });
  }, []);
  const [stage, setStage] = useState('loading'); 
  // stages: 'loading' → 'veil' → 'home' → 'sections'

  useEffect(() => {
    // Stage 1: show loading screen
    const t1 = setTimeout(() => setStage('veil'), 2500);

    // Stage 2: show DarkVeil + Home
    const t2 = setTimeout(() => setStage('home'), 2700);

    // Stage 3: show rest of sections
    const t3 = setTimeout(() => setStage('sections'), 3500);

    return () => [t1, t2, t3].forEach(clearTimeout);
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
          {/* Render DarkVeil instantly after loading */}
          <DarkVeil />

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header />

                  {/* Home fades in first */}
                  {stage !== 'loading' && (
                    <section id="home" className={`smooth-home ${stage === 'home' ? 'visible' : ''}`}>
                      <Home />
                    </section>
                  )}

                  {/* Then, after a short delay, rest of sections */}
                  {stage === 'sections' && (
                    <>
                      <section id="about" className="smooth-section"><AboutMe /></section>
                      <section id="tools" className="smooth-section"><ToolsMap /></section>
                      <section id="projects" className="smooth-section"><Projects /></section>
                      <section id="chat" className="smooth-section"><Chat /></section>
                      <section id="footer" className="smooth-section"><Footer /></section>
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
