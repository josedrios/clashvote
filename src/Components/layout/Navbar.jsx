import { IoIosSearch } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { GoPerson } from "react-icons/go";
import { HiBars2 } from "react-icons/hi2";

function Navbar({isSideBarOpen, toggleSideBar, changeMainView, closeSideBar}) {
  return (
    <nav id = 'main-navbar'>
        <button onClick={toggleSideBar} id='bars-icon-button' aria-expanded={isSideBarOpen} aria-controls='#main-sidebar'>
          <svg id='bars-icon' viewBox='0 0 100 100' width={40} height={40}>
            <rect id='top-bar' className='bars' width={70} height={10} x={10} y={27} rx={5}></rect>
            <rect id='bottom-bar' className='bars' width={40} height={10} x={10} y={54} rx={5}></rect>
          </svg>
        </button>
        
        <button id='website-name-container' onClick={() => {changeMainView('season'); closeSideBar();}}>
          <h1 id='website-name'><span>clashvote</span>.</h1>
        </button>

        <div id='nav-buttons-container'>
          <button id='nav-bars-icon-xs' className='nav-button' onClick={toggleSideBar} aria-expanded={isSideBarOpen} aria-controls='#main-sidebar' >
            <HiBars2 strokeWidth={0.3}/>
          </button>

          <button className='nav-button' onClick={() => {changeMainView('search'); closeSideBar()}}>
            <IoIosSearch />
          </button>

          <button className='nav-button' onClick={() => {changeMainView('season'); closeSideBar()}}>
            <GoHome strokeWidth={0.01}/>
          </button>

          <button className='nav-button' onClick={() => {closeSideBar()}}>
            <GoPerson strokeWidth={0.15}/>
          </button>
        </div>
    </nav>
  )
}

export default Navbar