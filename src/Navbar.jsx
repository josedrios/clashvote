import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceMeh } from '@fortawesome/free-regular-svg-icons';
import { faHouse, faSearch } from '@fortawesome/free-solid-svg-icons';

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
        <div id='nav-icons'>
          <button className='nav-buttons'>
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <button className='nav-buttons'>
            <FontAwesomeIcon icon={faFaceMeh} />
          </button>
          <button className='nav-buttons'>
            <FontAwesomeIcon icon={faHouse} />
          </button>
        </div>
    </nav>
  )
}

export default Navbar