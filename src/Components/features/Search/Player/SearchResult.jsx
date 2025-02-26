import PlayerData from "../../../../util/processPlayerData";

import PlayerMain from "./PlayerMain";
import PlayerBase from "./PlayerBase";
import Achievements from "./PlayerAchievements";
import images from "../../Images";
import { useState } from "react";

const getImage = (name) => images[name.replace(/[ .]/g, "_")] || null;
const getBuilderLeague = (league) => {
    return getImage(league.split(" ")[0]);
};

const getBuilderDivision = (league) => {
    return league.split(" ")[2];
};

function SearchResult({ playerData }) {
    const [achCurrent, setAchCurrent] = useState("home");

    if (playerData === "") {
        return <div id="search-result-container">Empty player data</div>;
    }

    if (playerData === "404") {
        return <div className="player-not-found" id="search-result-container">Player not found :(</div>;
    }

    if (playerData === "!200") {
        return <div id="search-result-container">Not ok</div>;
    }

    const data = PlayerData(playerData);
    console.log(data)

    return (
        <div id="search-result-container">
            <div id="player-data">
                <div id="player-data-bar">
                    <h3 id="player-username">{data.username}</h3>
                    <LeagueIcons data={data} />
                </div>
                <div id="player-header">
                    <PlayerMain data={data} />
                    <div id="cards-container">
                        <PlayerClan data={data} />
                    </div>
                </div>
            </div>
            <div id="player-base-flex">
                <PlayerBase data={data.home} />
                <PlayerBase data={data.builder} />
            </div>
            <AchievementSection
                data={data}
                achCurrent={achCurrent}
                setAchCurrent={setAchCurrent}
            />
        </div>
    );
}

function LeagueIcons({ data }) {
    return (
        <div id="player-rank-flex">
            <img
                className="player-rank-icon"
                alt=""
                src={`${
                    data.home.leagueIcon === "Unranked"
                        ? getImage("unranked")
                        : data.home.leagueIcon
                }`}
                title={data.home.league}
            />
            <div id="builder-rank-container" className={`${data.builder.league === "Unranked" ? "hide" : ""}`}>
                <img
                    className="player-rank-icon"
                    id="player-bh-icon"
                    src={getBuilderLeague(data.builder.league)}
                    title={data.builder.league}
                    alt=""
                />
                <div id="player-bh-division">
                    {getBuilderDivision(data.builder.league)}
                </div>
            </div>
        </div>
    );
}

function PlayerClan({ data }) {
    return (
        <div id="player-clan">
            <div id="player-clan-info">
                <h3 id="player-clan-title">{data.clan.name}</h3>
                <div>
                    Role:{" "}
                    <p>{data.clan.role === "None" ? "" : data.clan.role}</p>
                </div>
                <div>
                    Donated: <p>{data.clan.donated}</p>
                </div>
                <div>
                    Received: <p>{data.clan.received}</p>
                </div>
            </div>
            <div id="player-clan-image">
                <img id="player-clan-badge" src={data.clan.badge} alt="" />
            </div>
        </div>
    );
}

function AchievementSection({ data, achCurrent, setAchCurrent }) {
    return (
        <>
            <div id="ach-toggle-header">
                <h3 id="general-ach-header">Achievements</h3>
                <div id="ach-toggle-btns">
                    <button
                        className={`ach-btn ${
                            achCurrent === "home" ? "ach-btn-selected" : ""
                        }`}
                        onClick={() => setAchCurrent("home")}
                    >
                        Home
                    </button>
                    <button
                        className={`ach-btn ${
                            achCurrent === "builder" ? "ach-btn-selected" : ""
                        }`}
                        onClick={() => setAchCurrent("builder")}
                    >
                        Builder
                    </button>
                </div>
            </div>
            {data && (
                <>
                    <Achievements
                        achievements={data.home?.achievements || []}
                        base={"home"}
                        achCurrent={achCurrent}
                    />
                    <Achievements
                        achievements={data.builder?.achievements || []}
                        base={"builder"}
                        achCurrent={achCurrent}
                    />
                </>
            )}
        </>
    );
}

export default SearchResult;
