import usePlayerData from '../../Hooks/usePlayerData'

function SearchResult({playerData}) {

  if(!playerData) {
    return (
      <div id='search-result-container'>
        --NULL--
      </div>
    )
  }

  const {playerMain, playerGeneral, playerHome, playerBuilder} = usePlayerData(playerData);
  return (
    <div id='search-result-container'>
      <div id='player-main-data'>
        <h3>Player Name: {playerMain.name}</h3>
        <h3>Level: {playerMain.name}</h3>
        <h3>Tag ID: {playerMain.tagID}</h3>
      </div>
    </div>
  )
}

export default SearchResult