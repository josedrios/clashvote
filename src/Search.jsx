import { useState } from 'react'
import './styles/main.scss'
import SearchInfo from './SearchInfo'

function Search() {
  return (
    <div id='search-page-container'>
        <input id='searchbar' type="text" placeholder='Enter tag'/>
        <SearchInfo/>
    </div>
  )
}

export default Search