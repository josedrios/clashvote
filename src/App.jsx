import { useState } from 'react'
import './styles/main.scss'

import NavBar from './Navbar'
import MainBody from './MainBody'
import SideBar from './SideBar'

function App() {
  return (
    <>
      <NavBar/>
      <div id='main-container'>
        <SideBar/>
        <MainBody/>
      </div>
    </>
  )
}

export default App
