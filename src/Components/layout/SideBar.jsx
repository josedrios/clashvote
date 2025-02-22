export default function SideBar({isSideBarOpen, setIsSideBarOpen, setMainView}) {
  const clickedLink = (page) => {
      setIsSideBarOpen(false);
      setMainView(page)
  }

  return (
    <aside className={`main-sidebar ${isSideBarOpen ? 'open' : 'close'}`} aria-hidden={!isSideBarOpen} id = 'main-sidebar'>
        <div className='sidebar-section'>
              <a className='sidebar-link' onClick={() => clickedLink('season')}>
                <span>Current Season</span>
              </a>
              <a className='sidebar-link' onClick={() => clickedLink('search')}>
                Search
              </a>
        </div>

        <div className='sidebar-section'>
            <a className='sidebar-link' onClick={() => clickedLink('season')}>
              Season ??
            </a>
        </div>
        
        <div className='sidebar-section'>
            <a className='sidebar-link' onClick={() => clickedLink('about')}>About Us</a>
            <a className='sidebar-link' onClick={() => clickedLink('contact')}>Contact</a>
        </div>
    </aside>
  )
}