function PlayerMain({playerMain}) {
  return (
        <div id='player-main-data'>
            <div id="player-main-header">
                <div id="header-title">
                    <h3 id="player-username">{playerMain.name}</h3>
                    <div id="player-tag">{playerMain.tag}</div>
                    <div>Level {playerMain.level}</div>
                    <div id="player-labels">
                        <img className="player-label" src={playerMain.accountLabel[0]} alt=""/>
                        <img className="player-label" src={playerMain.accountLabel[1]} alt=""/>
                        <img className="player-label" src={playerMain.accountLabel[2]} alt=""/>
                    </div>
                </div>
                <div id="header-clan">
                    <div id="header-clan-info">
                        <h3 id="header-clan-title">{playerMain.clanName}</h3>
                        <div>Role: {playerMain.clanRole}</div>
                        <div>Donated: {playerMain.troopsDonated}</div>
                        <div>Received: {playerMain.troopsReceived}</div>
                    </div>
                    <img id="header-clan-badge" src={playerMain.clanBadge} alt="" />
                </div>
            </div>
        </div>
    )
}

export default PlayerMain