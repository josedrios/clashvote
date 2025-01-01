import usePlayerData from "../../Hooks/usePlayerData";
import PlayerMain from "./PlayerMain";
import SearchInfo from "../feature/SearchInfo";
import PlayerCards from "./PlayerCards";
import PlayerBase from "./PlayerBase";

function SearchResult({ playerData }) {
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

    const { playerMain, playerClan, playerHome, playerBuilder, homeTrophies, builderTrophies } =
        usePlayerData(playerData);

    return (
        <div id="search-result-container">
            <div id="player-data">
                <div id="player-data-bar">
                    <h3 id="player-username">{playerMain.name}</h3>
                    <img id="player-rank-icon" src={playerMain.homeLeagueIcon} alt="" />
                </div>
                <div id="player-header">
                    <PlayerMain playerMain={playerMain}/>
                    <PlayerCards playerClan={playerClan}/>
                </div>
            </div>
            <div id='player-base-flex'>
                <PlayerBase base={playerHome} trophies={homeTrophies}/>
                <PlayerBase base={playerBuilder} trophies={builderTrophies}/>
            </div>
        </div>
    );
}

export default SearchResult;