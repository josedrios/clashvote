import PlayerResult from '../features/Search/Player/SearchResult';
import ClanResults from '../features/Search/Clan/SearchResults';
import SearchTip from '../features/Search/SearchTip';
import TestJSON from '../../clasher.json';
import TestsJSON from '../../claner.json';
import { useState, useRef } from 'react';
import { useAlert } from '../../util/AlertContext';
import { BsPersonFill } from 'react-icons/bs';
import { FaShieldAlt } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';
import {
  fetchData,
  handleTestJson,
} from '../../util/clashSearchUtils';

export default function Search() {
  const { showAlert } = useAlert();
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const [searchToggle, setSearchToggle] = useState('player');
  const [searchResult, setSearchResult] = useState({
    data: '',
    tab: '',
  });

  function handleFormSubmit(event) {
    event.preventDefault();
    if (inputRef.current.value.trim() === '') {
      showAlert('You entered an empty string!', 'error');
      return;
    }
    fetchData(
      inputRef.current.value.trim(),
      searchToggle,
      setSearchResult,
      showAlert,
      scrollRef
    );
    inputRef.current.value = '';
  }

  function handleTestJsonClick() {
    handleTestJson(searchToggle, setSearchResult, TestJSON, TestsJSON);
  }

  return (
    <div id="search-page-container" ref={scrollRef}>
      <form id="player-clan-search" onSubmit={handleFormSubmit}>
        <div id="searchbar-toggle">
          <button
            id="player-search-toggle"
            className="toggle-btn"
            type="button"
            onClick={(event) => {
              event.preventDefault();
              setSearchToggle('player');
            }}
          >
            <BsPersonFill id="player-toggle-icon" className="toggle-icon" />
          </button>
          <button
            type="button"
            id="clan-search-toggle"
            className="toggle-btn"
            onClick={(event) => {
              event.preventDefault();
              setSearchToggle('clan');
            }}
          >
            <FaShieldAlt id="clan-toggle-icon" className="toggle-icon" />
          </button>
          <div
            id="toggle-bg-slider"
            className={searchToggle === 'player' ? '' : 'shift-right'}
          />
        </div>
        <input
          id="searchbar"
          type="search"
          placeholder={`Enter ${
            searchToggle === 'player' ? 'Tag' : 'Name or Tag'
          }`}
          ref={inputRef}
        />
        <button id="test-json" onClick={handleTestJsonClick} type="button">
          Test
        </button>
        <button type="submit" id="searchbar-submit-btn">
          <IoIosSearch />
        </button>
      </form>
      <RenderContent searchResult={searchResult} fetchData={fetchData} />
    </div>
  );
}

function RenderContent({ searchResult, fetchData }) {
  return (
    <>
      {searchResult.tab === 'player' ? (
        <PlayerResult playerData={searchResult.data} fetchData={fetchData} />
      ) : searchResult.tab === 'clan' ? (
        <ClanResults clanData={searchResult.data} fetchPlayer={fetchData} />
      ) : (
        <SearchTip />
      )}
    </>
  );
}
