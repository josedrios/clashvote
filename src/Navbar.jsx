import { useState } from 'react'

function Navbar() {
  return (
    <nav id = 'main-navbar'>
        <button id='bars-icon-button' aria-expanded="false" aria-controls='#main-sidebar'>
          <svg id='bars-icon' viewBox='0 0 100 100' width={45}>
            <rect id='top-bar' className='bars' width={70} height={10} x={10} y={27} rx={5}></rect>
            <rect id='bottom-bar' className='bars' width={40} height={10} x={10} y={54} rx={5}></rect>
          </svg>
        </button>
        <div id='website-name-container'>
          <h1 id='website-name'><span>cocvote</span>.</h1>
        </div>
    </nav>
  )
}

export default Navbar