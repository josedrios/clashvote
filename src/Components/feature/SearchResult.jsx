import usePlayerData from '../../Hooks/usePlayerData'

function SearchResult({playerData}) {

  if(!playerData) {
    return (
      <div id='search-result-container'>
        --NULL--
      </div>
    )
  }

  const {playerGeneral, playerClan} = usePlayerData(playerData);
  return (
    <div id='search-result-container'>
      <h3>Player Name:{playerGeneral.name}</h3>
      <h3>Player TH Level:{playerGeneral.thLevel}</h3>
      <h3>Player Trophies:{playerGeneral.trophies}</h3>
      <h3>Clan Name:{playerClan.name}</h3>
      <h3>Clan Tag:{playerClan.tag}</h3>
      <h3>Clan Level:{playerClan.level}</h3>
    </div>
  )
}

export default SearchResult