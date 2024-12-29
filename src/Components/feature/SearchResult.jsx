import usePlayerData from "../../Hooks/usePlayerData";
import PlayerMain from "./PlayerMain";
import PlayerHome from "./PlayerHome";
import PlayerBuilder from "./PlayerBuilder";
import PlayerClan from './PlayerClan';
import SearchInfo from "../feature/SearchInfo";

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

    const { playerMain, playerClan, playerHome, playerBuilder } =
        usePlayerData(playerData);

    return (
        <div id="search-result-container">
            <div id="player-data">
                <div id="player-header">
                    <PlayerMain playerMain={playerMain} />
                    <PlayerClan playerClan={playerClan} />
                </div>
            </div>
            <PlayerHome playerHome={playerHome} />
            <PlayerBuilder playerBuilder={playerBuilder} />
        </div>
    );
}

export default SearchResult;