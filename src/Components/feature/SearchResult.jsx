import usePlayerData from '../../Hooks/usePlayerData';
import PlayerMain from './PlayerMain';
import PlayerGeneral from './PlayerGeneral';
import PlayerHome from './PlayerHome';
import PlayerBuilder from './PlayerBuilder';

function SearchResult({playerData}) {

  if(!playerData) {
    return (
      <div id='search-result-container'>
        NOTHING
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