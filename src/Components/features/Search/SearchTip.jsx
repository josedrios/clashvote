// Icons
import { BsPersonFill } from "react-icons/bs";
import { FaShieldAlt } from "react-icons/fa";

export default function SearchInfo() {
    return (
        <div id="search-info-container">
            <h3 id="search-info-header">Toggle to search for:</h3>
            <div id="search-info-tip-body">
                <div id="player-tip-info" className="tip-info">
                    <div className="info-icon-container">
                        <div className="info-icon-background" />
                        <BsPersonFill
                            id="player-info-icon"
                            className="info-icon"
                        />
                    </div>

                    <h2 className="info-tip-header">Players</h2>
                </div>
                <div id="clan-tip-info" className="tip-info">
                    <div className="info-icon-container">
                        <div className="info-icon-background" />
                        <FaShieldAlt
                            id="player-info-icon"
                            className="info-icon"
                        />
                    </div>
                    <h2 className="info-tip-header">Clans</h2>
                </div>
            </div>
        </div>
    );
}