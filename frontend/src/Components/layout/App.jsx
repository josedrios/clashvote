import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './Navbar';
import MainBody from './MainBody';
import SideBar from './SideBar';
import { useState, useEffect } from 'react';
import '../../styles/main.scss';

export default function App() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1200) {
        setIsSideBarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  });

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    console.log(userData)
  },[userData]);

  return (
    <Router>
      <NavBar
        isSideBarOpen={isSideBarOpen}
        toggleSideBar={toggleSideBar}
        setIsSideBarOpen={setIsSideBarOpen}
        userData={userData}
      />
      <div id="main-container">
        <SideBar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
        <MainBody userData={userData} setUserData={setUserData}/>
        {isSideBarOpen && (
          <div
            id="non-interactable-overlay"
            onClick={() => setIsSideBarOpen(false)}
          />
        )}
      </div>
    </Router>
  );
}
