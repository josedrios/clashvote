import { useState } from 'react'
import './styles/main.scss'
import SearchInfo from './SearchInfo'
import SearchResult from './SearchResult'


function Search() {
  return (
    <div id='search-page-container'>
        <input id='searchbar' type="text" placeholder='Enter tag'/>
        {/* <SearchInfo/> */}
        <SearchResult/>
    </div>
  )
}

export default Search