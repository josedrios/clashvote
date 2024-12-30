function PlayerMain({ playerMain }) {
    return (
        <div>
            <div id="player-labels">
                <img
                    className="player-label"
                    src={playerMain.accountLabel[0]}
                    alt=""
                />
                <img
                    className="player-label"
                    src={playerMain.accountLabel[1]}
                    alt=""
                />
                <img
                    className="player-label"
                    src={playerMain.accountLabel[2]}
                    alt=""
                />
            </div>
            <div>LVL. {playerMain.level}</div>
            <div id="player-tag">{playerMain.tag}</div>
        </div>
    );
}

export default PlayerMain;
