import xpIcon from "../../assets/images/XP.jpg";

function PlayerMain({ playerMain }) {
    return (
        <div id="player-general-info-section">
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
            <div id="player-tag">{playerMain.tag}</div>
            <div id="player-xp-container">
                <img id="xp-icon" src={xpIcon} alt="" />
                <div id="player-level">{playerMain.level}</div>
            </div>
        </div>
    );
}

export default PlayerMain;
