import { IoIosSearch } from 'react-icons/io';
import { GoHome } from 'react-icons/go';
import { GoPerson } from 'react-icons/go';
import { HiBars2 } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

export default function Navbar({
  isSideBarOpen,
  toggleSideBar,
  setIsSideBarOpen,
}) {
  const navigate = useNavigate();

  return (
    <nav id="main-navbar">
      <button
        onClick={toggleSideBar}
        id="bars-icon-btn"
        aria-expanded={isSideBarOpen}
        aria-controls="#main-sidebar"
      >
        <svg id="bars-icon" viewBox="0 0 100 100" width={40} height={40}>
          <rect
            id="top-bar"
            className="bars"
            width={70}
            height={10}
            x={10}
            y={27}
            rx={5}
          ></rect>
          <rect
            id="bottom-bar"
            className="bars"
            width={40}
            height={10}
            x={10}
            y={54}
            rx={5}
          ></rect>
        </svg>
      </button>

      {/* ✅ Clicking the website name now navigates properly */}
      <button
        id="website-name-container"
        onClick={() => {
          navigate('/');
          setIsSideBarOpen(false);
        }}
      >
        <h1 id="website-name">
          <span>Clashvote</span>.
        </h1>
      </button>

      <div id="nav-btns-container">
        <button
          id="nav-bars-icon-xs"
          className="nav-btn"
          onClick={toggleSideBar}
          aria-expanded={isSideBarOpen}
        >
          <HiBars2 strokeWidth={0.3} />
        </button>

        <button
          className="nav-btn"
          onClick={() => {
            navigate('/search');
            setIsSideBarOpen(false);
          }}
        >
          <IoIosSearch />
        </button>

        <button
          className="nav-btn"
          onClick={() => {
            navigate('/');
            setIsSideBarOpen(false);
          }}
        >
          <GoHome strokeWidth={0.01} />
        </button>

        <button
          className="nav-btn"
          onClick={() => {
            navigate('/auth');
            setIsSideBarOpen(false);
          }}
        >
          <GoPerson strokeWidth={0.15} />
        </button>
      </div>
    </nav>
  );
}
