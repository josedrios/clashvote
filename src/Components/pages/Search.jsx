import { useState, useRef, useEffect } from 'react'
import { IoIosSearch } from "react-icons/io";
import SearchResult from '../feature/SearchResult'
import TestJSON from '../../clasher.json'


function Search() {
  const [userEntry, setUserEntry] = useState('');
  const [playerData, setPlayerData] = useState('null');
  const inputRef = useRef(null);

  useEffect(() => {
    console.log(playerData)
  }, [playerData])

  function handleFormSubmit(event) {
    event.preventDefault();
    if(inputRef.current.value == '') {
      console.log("Empty User Entry");
      return;
    }
    setUserEntry(inputRef.current.value.toUpperCase());
    fetchPlayerData(inputRef.current.value);
    inputRef.current.value = '';
  }

  async function fetchPlayerData(playerTag) {
    try {
      const response = await fetch(`http://localhost:3001/api/players/${playerTag}`);
      if(!response.ok) {
        throw new Error('Failed to get player data')
      }
      const data = await response.json();
      setPlayerData(data);
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  }

  function handleTestJson() {
    setPlayerData(TestJSON)
  }

  return (
    <div id='search-page-container'>
        <form  id='searchbar-container' onSubmit={handleFormSubmit}>
          <div id='searchbar-toggle'>
            TOGGLE
          </div>
          <input id='searchbar' type="text" placeholder='Enter tag' ref={inputRef}/>
          <button id="test-json" onClick={handleTestJson}>
            Test
          </button>
          <button type='submit' id='searchbar-submit-button'>
            <IoIosSearch />
          </button>
        </form>
        {/* <SearchInfo/> */}
        <SearchResult playerData={playerData}/>
    </div>
  )
}

export default Search