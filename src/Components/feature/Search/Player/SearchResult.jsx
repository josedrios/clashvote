import usePlayerData from "../../../../Hooks/usePlayerData";
import PlayerMain from "./PlayerMain";
import PlayerBase from "./PlayerBase";
import Achievements from "./PlayerAchievements";
import images from "../../Images";
import { useState } from "react";

// Icons
import { BsPersonFill } from "react-icons/bs";
import { FaShieldAlt } from "react-icons/fa";

const getImage = (name) => images[name.replace(/[ .]/g, "_")] || null;
const getBuilderLeague = (league) => {
    return getImage(league.split(" ")[0]);
};

function SearchResult({ playerData }) {
    const [achCurrent, setAchCurrent] = useState("home");

    if (playerData === "null") {
        return (
            <div id="search-result-container">
                <SearchInfo />
            </div>
        );
    }

    if (playerData === "Player not found") {
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
                    <LeagueIcons
                        playerMain={playerMain}
                        getImage={getImage}
                        getBuilderLeague={getBuilderLeague}
                    />
                </div>
                <div id="player-header">
                    <PlayerMain playerMain={playerMain} />
                    <div id="cards-container">
                        <PlayerClan playerClan={playerClan} />
                    </div>
                </div>
            </div>
            <div id="player-base-flex">
                <PlayerBase base={playerHome} trophies={homeTrophies} />
                <PlayerBase base={playerBuilder} trophies={builderTrophies} />
            </div>
            <AchievementSection
                achievements={achievements}
                achCurrent={achCurrent}
                setAchCurrent={setAchCurrent}
            />
        </div>
    );
}

function LeagueIcons({ playerMain, getImage, getBuilderLeague }) {
    return (
        <div id="player-rank-flex">
            <img
                className="player-rank-icon"
                alt=""
                src={`${
                    playerMain.homeLeagueIcon === "Unranked"
                        ? getImage("unranked")
                        : playerMain.homeLeagueIcon
                }`}
                title={playerMain.homeLeague}
            />
            <img
                className="player-rank-icon"
                id="player-bh-icon"
                src={getBuilderLeague(playerMain.builderLeague)}
                title={playerMain.builderLeague}
                alt=""
            />
        </div>
    );
}

function PlayerClan({ playerClan }) {
    return (
        <div id="player-clan">
            <div id="player-clan-info">
                <h3 id="player-clan-title">{playerClan.clanName}</h3>
                <div>Role: <p>{playerClan.clanRole === "None" ? "" : playerClan.clanRole}</p></div>
                <div>
                    Donated: <p>{playerClan.troopsDonated}</p>
                </div>
                <div>
                    Received: <p>{playerClan.troopsReceived}</p>
                </div>
            </div>
            <div id="player-clan-image">
                <img id="player-clan-badge" src={playerClan.clanBadge} alt="" />
            </div>
        </div>
    );
}

function SearchInfo() {
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

function AchievementSection({ achievements, achCurrent, setAchCurrent }) {
    return (
        <>
            <div id="ach-toggle-header">
                <h3 id="general-ach-header">Achievements</h3>
                <div id="ach-toggle-buttons">
                    <button
                        className={`ach-button ${
                            achCurrent === "home" ? "ach-button-selected" : ""
                        }`}
                        onClick={() => setAchCurrent("home")}
                    >
                        Home
                    </button>
                    <button
                        className={`ach-button ${
                            achCurrent === "builder"
                                ? "ach-button-selected"
                                : ""
                        }`}
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
        </>
    );
}

export default SearchResult;
