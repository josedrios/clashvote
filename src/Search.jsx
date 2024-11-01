import { useState, useRef, useEffect } from 'react'
import './styles/main.scss'
import SearchInfo from './SearchInfo'
import SearchResult from './SearchResult'
import { IoIosSearch } from "react-icons/io";

function Search() {
  const [userEntry, setUserEntry] = useState('');
  const [playerData, setPlayerData] = useState(null);
  const inputRef = useRef(null);

  function handleFormSubmit(event) {
    event.preventDefault();

    if(inputRef.current.value == '') {
      console.log("EMPTY USER ENTRY");
      return;
    }

    setUserEntry(inputRef.current.value);
    fetchPlayerData(inputRef.current.value);
    inputRef.current.value = '';
  }

  useEffect(() => {
    console.log(playerData)
  }, [playerData])

  async function fetchPlayerData(playerTag) {
    try {
      const response = await fetch(`http://localhost:3001/api/players/${playerTag}`);
      if(!response.ok) {
        throw new Error('Failed to get player data')
      }
      const data = await response.json();
      setPlayerData(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div id='search-page-container'>
        <form  id='searchbar-container' onSubmit={handleFormSubmit}>
          <div id='searchbar-toggle'>
            TOGGLE
          </div>
          <input id='searchbar' type="text" placeholder='Enter tag' ref={inputRef}/>
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