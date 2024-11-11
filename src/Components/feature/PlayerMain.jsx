function PlayerMain({playerMain}) {
  return (
        <div id='player-main-data'>
            <h3>Player Name: {playerMain.name}</h3>
            <h3>Level: {playerMain.level}</h3>
            <h3>Tag ID: {playerMain.tagID}</h3>
        </div>
    )
}

export default PlayerMain