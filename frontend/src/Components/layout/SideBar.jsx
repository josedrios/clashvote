import { Link } from "react-router-dom";

export default function SideBar({ isSideBarOpen, setIsSideBarOpen }) {
  return (
    <aside className={`main-sidebar ${isSideBarOpen ? "open" : "close"}`} id="main-sidebar">
      <div className="sidebar-section">
        <Link to="/" className="sidebar-link" onClick={() => setIsSideBarOpen(false)}>
          Vote
        </Link>
        <Link to="/search" className="sidebar-link" onClick={() => setIsSideBarOpen(false)}>
          Search
        </Link>
        {/* Fix when logged out */}
        <Link to="/account" className="sidebar-link" onClick={() => setIsSideBarOpen(false)}>
          Account
        </Link>
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
