import Season from '../pages/Season'
import Search from '../pages/Search'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Auth from '../pages/Auth'
import Account from '../pages/Account'

function MainBody({ mainView }) {
  return (
    <main id = 'main-body'>
        {mainView === 'season' && <Season/>}
        {mainView === 'search' && <Search/>}
        {mainView === 'about' && <About/>}
        {mainView === 'contact' && <Contact/>}
        {mainView === 'auth' && <Auth/>}
        {mainView === 'account' && <Account/>}
    </main>
  )
}

export default MainBody