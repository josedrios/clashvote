import Season from '../pages/Season'
import Search from '../pages/Search'
import About from '../pages/About'

function MainBody({ mainView, changeView}) {
  return (
    <main id = 'main-body'>
        {mainView === 'season' && <Season/>}
        {mainView === 'search' && <Search/>}
        {mainView === 'about' && <About/>}
    </main>
  )
}

export default MainBody