import PlayerResult from '../features/Search/Player/SearchResult';
import ClanResults from '../features/Search/Clan/SearchResults';
import SearchTip from '../features/Search/SearchTip';
import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAlert } from '../../util/AlertContext';
import { BsPersonFill } from 'react-icons/bs';
import { FaShieldAlt } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';
import { fetchData } from '../../util/clashSearchUtils';

export default function Search() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const [searchToggle, setSearchToggle] = useState('player');
  const [searchResult, setSearchResult] = useState({
    data: '',
    tab: '',
  });
  const { type, tag } = useParams();

  useEffect(() => {
    if (type && tag) {
      fetchData(tag, type, setSearchResult, showAlert, scrollRef);
    } else if (type && !tag) {
      navigate('/search', { replace: true });
    }
  }, [type, tag]);

  function handleFormSubmit(event) {
    event.preventDefault();
    const query = inputRef.current.value.trim();
    if (!query) {
      showAlert('You entered an empty string!', 'error');
      return;
    }
    navigate(`/search/${searchToggle}/${query}`);
    inputRef.current.value = '';
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
        <button type="submit" id="searchbar-submit-btn">
          <IoIosSearch />
        </button>
      </form>
      <RenderContent searchResult={searchResult} />
    </div>
  );
}

function RenderContent({ searchResult }) {
  return (
    <>
      {searchResult.tab === 'player' ? (
        <PlayerResult playerData={searchResult.data}/>
      ) : searchResult.tab === 'clan' ? (
        <ClanResults clanData={searchResult.data} />
      ) : (
        <SearchTip />
      )}
    </>
  );
}
