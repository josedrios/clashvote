import { useState, useEffect } from 'react'
import './styles/main.scss'

import NavBar from './Navbar'
import MainBody from './MainBody'
import SideBar from './SideBar'

function App() {
  const[isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsSideBarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <NavBar isSideBarOpen={isSideBarOpen} toggleSideBar={toggleSideBar}/>
      <div id='main-container'>
        <SideBar isSideBarOpen={isSideBarOpen}/>
        {isSideBarOpen && <div id='non-interactable-overlay' onClick={() => setIsSideBarOpen(false)}/>}
        <MainBody/>
      </div>
    </>
  )
}

export default App
