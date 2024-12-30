import images from "./Images";

const getImage = (name) => images[name.replace(/[ .]/g, "_")] || null;

function PlayerBuilder({ playerBuilder }) {
    return (
        <div className="player-base-container" id="player-builder-data">
            <h3 className="player-base-container-header">Builder Base</h3>
            <div className="troop-section">
                <h3>HEROES:</h3>
                <div className="troops-container" id="player-home-heroes">
                    {playerBuilder.heroes.map((troop, index) => (
                        <div className="troop-container" key={index}>
                            <h4 className="troop-level">{troop.level}</h4>
                            <img
                                className="unit-img"
                                src={getImage(troop.name)}
                                alt=""
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="troop-section">
                <h3>TROOPS:</h3>
                <div className="troops-container" id="player-home-troops">
                    {playerBuilder.troops.map((troop, index) => (
                        <div className="troop-container" key={index}>
                            <h4 className="troop-level">{troop.level}</h4>
                            <img
                                className="unit-img"
                                src={getImage(troop.name)}
                                alt=""
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PlayerBuilder;
