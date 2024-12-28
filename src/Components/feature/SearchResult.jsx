import usePlayerData from '../../Hooks/usePlayerData';
import PlayerMain from './PlayerMain';
import PlayerGeneral from './PlayerGeneral';
import PlayerHome from './PlayerHome';
import PlayerBuilder from './PlayerBuilder';
import SearchInfo from '../feature/SearchInfo'

function SearchResult({playerData}) {

  if(playerData === 'null') {
    return (
      <div id='search-result-container'>
        <SearchInfo/>
      </div>
    )
  }

  if(!playerData) {
    return (
      <div id='search-result-container'>
        Player Not Found
      </div>
    )
  }

  const {playerMain, playerGeneral, playerHome, playerBuilder} = usePlayerData(playerData);
  
  return (
    <div id='search-result-container'>
        <PlayerMain playerMain={playerMain}/>
        <PlayerGeneral playerGeneral={playerGeneral}/>
        <PlayerHome playerHome={playerHome}/>
        <PlayerBuilder playerBuilder={playerBuilder}/>
    </div>
  )
}

export default SearchResult