function PlayerClan({playerClan}) {
    return (
        <div id="player-clan">
            <div id="player-clan-info">
                <h3 id="player-clan-title">{playerClan.clanName}</h3>
                <div>Role: <p>{playerClan.clanRole}</p></div>
                <div>Donated: <p>{playerClan.troopsDonated}</p></div>
                <div>Received: <p>{playerClan.troopsReceived}</p></div>
                <div>War Stars: <p>{playerClan.warStars}</p></div>
            </div>
            <img id="player-clan-badge" src={playerClan.clanBadge} alt="" />
        </div>
      )
  }
  
  export default PlayerClan