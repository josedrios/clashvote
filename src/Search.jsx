import { useState } from 'react'
import './styles/main.scss'

function Search() {
  return (
    <div id='search-page-container'>
        <input id='searchbar' type="text" placeholder='Enter tag'/>
        <div id='results-container'>

        </div>
    </div>
  )
}

export default Search