import { useState } from 'react'

function SideBar({isSideBarOpen}) {
  return (
    // className='sidebar-section'
    <aside className={`main-sidebar ${isSideBarOpen ? 'open' : ''}`} aria-hidden={!isSideBarOpen} id = 'main-sidebar'>
        <div className='sidebar-section' id='top-sidebar'>
              <a className='sidebar-link'><span>Current Season</span></a>
              <a className='sidebar-link'>Search</a>
        </div>

        <div className='sidebar-section' id='mid-sidebar'>
            <a className='sidebar-link'>Season 82</a>
        </div>
        
        <div className='sidebar-section' id='bottom-sidebar'>
            <a className='sidebar-link'>About</a>
            <a className='sidebar-link'>Contact</a>
        </div>
    </aside>
  )
}

export default SideBar