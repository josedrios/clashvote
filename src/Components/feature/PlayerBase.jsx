import images from "./Images";

const getImage = (name) => images[name.replace(/[ .]/g, "_")] || null;

function PlayerHome({ base, trophies }) {
    return (
        <div className="player-base-container">
            <h3>{trophies.current}</h3>
            <h3>{trophies.best}</h3>
            <h3 className="player-base-container-header">Village</h3>
            <div className="troop-section">
                <h3>HEROES</h3>
                <div className="troops-container" id="player-home-heroes">
                    {base.heroes.map((troop, index) => (
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
                    {base.troops.map((troop, index) => (
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
            {base.supers && (
                <div className="troop-section">
                    <h3>SUPER TROOPS</h3>
                    <div className="troops-container" id="player-home-troops">
                        {base.supers.map((troop, index) => (
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
            )}
            {base.sieges && (
                <div className="troop-section">
                    <h3>SIEGE MACHINES</h3>
                    <div className="troops-container" id="player-home-troops">
                        {base.sieges.map((troop, index) => (
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
            )}
            {base.pets && (
                <div className="troop-section">
                    <h3>PETS</h3>
                    <div className="troops-container" id="player-home-pets">
                        {base.pets.map((troop, index) => (
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
            )}
        </div>
    );
}

export default PlayerHome;
