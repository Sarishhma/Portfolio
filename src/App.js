import './App.css';
import Loading from "./MyComponent/Loading/Loading";
import DarkVeil from './MyComponent/DarkVeil/DarkVeil';
import Header from './MyComponent/Header/Header';
import { useEffect, useState } from 'react';
import AboutMe from './MyComponent/AboutMe/AboutMe';
import ToolsMap from './MyComponent/Tools/ToolsMap';
import Projects from './MyComponent/Projects/Projects';
import Home from './MyComponent/Home/Home';
import { Route, Routes } from 'react-router-dom';
import Choose from "./MyComponent/Projects/Choose";
import Footer from './MyComponent/Footer/Footer';
import Chat from './MyComponent/ChatRoom/Chat';

function App() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Hide loading after 3s
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ width: '100vw', position: 'relative' }}>
      {/* Loading Screen */}
      {isLoading && (
        <div className="loading-wrapper">
          <Loading />
        </div>
      )}

      {/* Main Content */}
      {!isLoading && (
        <>
          <DarkVeil />
          <Routes>
            <Route path='/' element={
              <>
                <Header />
                <section id="home"><Home /></section>
                <section id="about"><AboutMe /></section>
                <section id="tools"><ToolsMap /></section>
                <section id="projects"><Projects /></section>
                <section id="chat"><Chat /></section>
                <section id="footer"><Footer /></section>
              </>
            }/>
            <Route path='/choose' element={<Choose/>}/>
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
