import PlayerClan from "./PlayerClan";

function PlayerCards({ playerClan}) {
    return (
        <div id="cards-container">
            <PlayerClan playerClan={playerClan}/>
        </div>
    );
}

export default PlayerCards