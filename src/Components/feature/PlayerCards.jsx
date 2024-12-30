import PlayerClan from "./PlayerClan";

function PlayerCards({homeTrophies, builderTrophies, playerClan}) {
    return (
        <div id="cards-container">
            <div className="trophy-card">
                <h3 className="trophy-card-header">Home:</h3>
                <div className="trophy-card-section"><p className="trophy-card-label">TH:</p> {homeTrophies.thLevel}</div>
                <div className="trophy-card-section"><p className="trophy-card-label">Current:</p> {homeTrophies.current}</div>
                <div className="trophy-card-section"><p className="trophy-card-label">Best:</p> {homeTrophies.best}</div>
            </div>
            <div className="trophy-card">
                <h3 className="trophy-card-header">Builder:</h3>
                <div className="trophy-card-section"><p className="trophy-card-label">BH:</p> {builderTrophies.bhLevel}</div>
                <div className="trophy-card-section"><p className="trophy-card-label">Current:</p> {builderTrophies.current}</div>
                <div className="trophy-card-section"><p className="trophy-card-label">Best:</p> {builderTrophies.best}</div>
            </div>
            <PlayerClan playerClan={playerClan} />
        </div>
    );
}   

export default PlayerCards