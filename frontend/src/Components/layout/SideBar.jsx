import { Link } from "react-router-dom";

export default function SideBar({ isSideBarOpen, setIsSideBarOpen }) {
  return (
    <aside className={`main-sidebar ${isSideBarOpen ? "open" : "close"}`} aria-hidden={!isSideBarOpen} id="main-sidebar">
      <div className="sidebar-section">
        <Link to="/" className="sidebar-link" onClick={() => setIsSideBarOpen(false)}>
          <span>Current Season</span>
        </Link>
        <Link to="/search" className="sidebar-link" onClick={() => setIsSideBarOpen(false)}>
          Search
        </Link>
      </div>

      <div className="sidebar-section">
        <Link to="/" className="sidebar-link" onClick={() => setIsSideBarOpen(false)}>
          Season ??
        </Link>
      </div>

      <div className="sidebar-section">
        <Link to="/about" className="sidebar-link" onClick={() => setIsSideBarOpen(false)}>
          About Us
        </Link>
        <Link to="/contact" className="sidebar-link" onClick={() => setIsSideBarOpen(false)}>
          Contact
        </Link>
      </div>
    </aside>
  );
}
