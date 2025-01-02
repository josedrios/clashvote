function PlayerClan({playerClan}) {
    return (
        <div id="player-clan">
            <div id="player-clan-info">
                <h3 id="player-clan-title">{playerClan.clanName}</h3>
                <div>Role: {playerClan.clanRole}</div>
                <div>Donated: {playerClan.troopsDonated}</div>
                <div>Received: {playerClan.troopsReceived}</div>
                <div>War Stars: {playerClan.warStars}</div>
                <div>War Opt: {playerClan.warPreference}</div>
            </div>
            <img id="player-clan-badge" src={playerClan.clanBadge} alt="" />
        </div>
      )
  }
  
  export default PlayerClan