import { useState, useEffect } from 'react'
import '../../styles/main.scss'

import NavBar from '../layout/Navbar'
import MainBody from '../layout/MainBody'
import SideBar from '../layout/SideBar'

function App() {
  const[isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  }

  const closeSideBar = () => {
    setIsSideBarOpen(false);
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

  const[mainView, setMainView] = useState('search');

  const changeMainView = (view) => {
    setMainView(view);
  }

  return (
    <>
      <NavBar isSideBarOpen={isSideBarOpen} toggleSideBar={toggleSideBar} changeMainView={changeMainView} />
      <div id='main-container'>
        <SideBar isSideBarOpen={isSideBarOpen} closeSideBar={closeSideBar} changeMainView={changeMainView}/>
        {isSideBarOpen && <div id='non-interactable-overlay' onClick={() => setIsSideBarOpen(false)}/>}
        <MainBody  mainView={mainView} changeView={changeMainView}/>
      </div>
    </>
  )
}

export default App
