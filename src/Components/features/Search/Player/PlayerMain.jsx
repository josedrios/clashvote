import { IoMdShare } from "react-icons/io";
import { FaUserCheck } from "react-icons/fa";
import { IoBookmark } from "react-icons/io5";

import images from "../../Images";
const getImage = (name) => images[name.replace(/[ .]/g, "_")] || null;

function PlayerMain({ playerMain }) {
    return (
        <div id="player-general-info-section">
            {playerMain.accountLabel[0] !== "" && (
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
            )}
            <div id="player-tag">{playerMain.tag}</div>
            <div id="player-xp-container">
                <img id="xp-icon" src={getImage("xp")} alt="" />
                <div id="player-level">{playerMain.level}</div>
            </div>
            <div id="player-action-btns">
                <button>
                    <IoMdShare />
                </button>
                <button>
                    <IoBookmark />
                </button>
                <button>
                    <FaUserCheck />
                </button>
            </div>
        </div>
    );
}

export default PlayerMain;
