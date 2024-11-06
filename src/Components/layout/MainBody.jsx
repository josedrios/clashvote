import { useState } from 'react'

import Season from '../pages/Season'
import Search from '../pages/Search'

function MainBody({ mainView, changeView}) {
  return (
    <main id = 'main-body'>
        {mainView === 'season' && <Season/>}
        {mainView === 'search' && <Search/>}
    </main>
  )
}

export default MainBody