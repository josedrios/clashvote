import images from "./Images";

const getImage = (name) => images[name.replace(/[ .]/g, "_")] || null;

function PlayerHome({ playerHome }) {
    return (
        <div className="player-base-container" id="player-home-data">
            <h3 className="player-base-container-header">Home Village</h3>
            <div className="troop-section">
                <h3>HEROES</h3>
                <div className="troops-container" id="player-home-heroes">
                    {playerHome.heroes.map((troop, index) => (
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
                <h3>TROOPS</h3>
                <div className="troops-container" id="player-home-troops">
                    {playerHome.troops.map((troop, index) => (
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
                <h3>SUPER TROOPS</h3>
                <div className="troops-container" id="player-home-troops">
                    {playerHome.supers.map((troop, index) => (
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
                <h3>SIEGE MACHINES</h3>
                <div className="troops-container" id="player-home-troops">
                    {playerHome.sieges.map((troop, index) => (
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
                <h3>PETS</h3>
                <div className="troops-container" id="player-home-pets">
                    {playerHome.pets.map((troop, index) => (
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

export default PlayerHome;
