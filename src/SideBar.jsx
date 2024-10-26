import { useState } from 'react'

function SideBar() {
  return (
    <aside id = 'main-sidebar'>
        <div className='sidebar-section' id='top-sidebar'>
              <a className='sidebar-link'>Current Season</a>
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