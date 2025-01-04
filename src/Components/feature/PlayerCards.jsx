import PlayerClan from "./PlayerClan";
import PlayerBaseProgress from "./PlayerBaseProgress";


function PlayerCards({ playerClan}) {
    return (
        <div id="cards-container">
            <PlayerBaseProgress/>
            <PlayerClan playerClan={playerClan}/>
        </div>
    );
}

export default PlayerCards