import { useState } from 'react'
import './styles/main.scss'
import SearchInfo from './SearchInfo'
import SearchResult from './SearchResult'
import { IoIosSearch } from "react-icons/io";

function Search() {
  const [userEntry, setUserEntry] = useState('');

  function handleFormSubmit(event) {
    event.preventDefault();
    const userInput = document.getElementById('searchbar').value;
    setUserEntry(userInput);
  }

  return (
    <div id='search-page-container'>
        <form  id='searchbar-container' onSubmit={handleFormSubmit}>
          <div id='searchbar-toggle'>
            TOGGLE
          </div>
          <input id='searchbar' type="text" placeholder='Enter tag'/>
          <button type='submit' id='searchbar-submit-button'>
            <IoIosSearch />
          </button>
        </form>
        <h1 
          style={{
            color: "white"
          }}>
          USER ENTRY STATE: {userEntry}
        </h1>
        {/* <SearchInfo/> */}
        <SearchResult/>
    </div>
  )
}

export default Search