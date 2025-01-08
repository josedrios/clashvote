import usePlayerData from "../../Hooks/usePlayerData";
import PlayerMain from "./PlayerMain";
import SearchInfo from "../feature/SearchInfo";
import PlayerCards from "./PlayerCards";
import PlayerBase from "./PlayerBase";
import Achievements from "./PlayerAchievmenets";
import { useState } from "react";

import images from "./Images";
const getImage = (name) => images[name.replace(/[ .]/g, "_")] || null;

function SearchResult({ playerData }) {
    const [achCurrent, setAchCurrent] = useState("home");

    const changeAchCurrent = (base) => {
        setAchCurrent(base);
    };

    if (playerData === "null") {
        return (
            <div id="search-result-container">
                <SearchInfo />
            </div>
        );
    }

    if (!playerData) {
        return <div id="search-result-container">Player Not Found</div>;
    }

    const {
        playerMain,
        playerClan,
        playerHome,
        playerBuilder,
        homeTrophies,
        builderTrophies,
        achievements,
    } = usePlayerData(playerData);

    return (
        <div id="search-result-container">
            <div id="player-data">
                <div id="player-data-bar">
                    <h3 id="player-username">{playerMain.name}</h3>
                    <img
                        id="player-rank-icon"
                        alt=""
                        src={`${
                            playerMain.homeLeagueIcon === "Unranked"
                                ? getImage("unranked")
                                : playerMain.homeLeagueIcon
                        }`}
                    />
                </div>
                <div id="player-header">
                    <PlayerMain playerMain={playerMain} />
                    <PlayerCards playerClan={playerClan} />
                </div>
            </div>
            <div id="player-base-flex">
                <PlayerBase base={playerHome} trophies={homeTrophies} />
                <PlayerBase base={playerBuilder} trophies={builderTrophies} />
            </div>

            <div id="ach-toggle-header">
                <h3 id="general-ach-header">Achievements</h3>
                <div id="ach-toggle-buttons">
                    <button
                        className={`ach-button ${achCurrent === 'home' ? "ach-button-selected" : ''}`}
                        onClick={() => setAchCurrent("home")}
                    >
                        Home
                    </button>
                    <button
                        className={`ach-button ${achCurrent === 'builder' ? "ach-button-selected" : ''}`}
                        onClick={() => setAchCurrent("builder")}
                    >
                        Builder
                    </button>
                </div>
            </div>
            <Achievements
                achievements={achievements.home}
                base={"home"}
                achCurrent={achCurrent}
            />
            <Achievements
                achievements={achievements.builder}
                base={"builder"}
                achCurrent={achCurrent}
            />
        </div>
    );
}

export default SearchResult;
