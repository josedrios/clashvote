function PlayerMain({playerMain}) {
  return (
        <div id='player-main-data'>
            <h2>PLAYER MAIN</h2>
            <h3>Username: {playerMain.name}</h3>
            <h3>Tag: {playerMain.tag}</h3>
            <h3>League: {playerMain.league}</h3>
            <h3>Level: {playerMain.level}</h3>
            <h3>Account Label: {playerMain.accountLabel[0]}</h3>
            <h3>Account Label: {playerMain.accountLabel[1]}</h3>
            <h3>Account Label: {playerMain.accountLabel[2]}</h3>
        </div>
    )
}

export default PlayerMain