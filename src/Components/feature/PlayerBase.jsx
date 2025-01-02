import images from "./Images";
import { GoTrophy } from "react-icons/go";

const getImage = (name) => images[name.replace(/[ .]/g, "_")] || null;

function PlayerHome({ base, trophies }) {
    return (
        <div
            className="player-base-container"
            id={
                base.base === "home"
                    ? "player-home-data"
                    : "player-builder-data"
            }
        >
            <div className="player-base-header-container">
                <div className="player-base-header-info">
                    <h3 className="player-base-header">
                        {base.base === "home" ? "Home Village" : "Builder Base"}
                    </h3>
                    <div className="player-base-header-trophies">
                        <p>
                            Current:{trophies.current}
                        </p>
                        <GoTrophy className="trophy-icon"/>
                        /
                        <p>
                            Best:{trophies.best}
                        </p>
                        <GoTrophy className="trophy-icon" />
                    </div>
                </div>
                <img className="testing-img" src={getImage("th14")} alt="" />
            </div>
            <div className="troop-section">
                <h3>HEROES</h3>
                <div className="troops-container">
                    {base.heroes.map((troop, index) => (
                        <div className="troop-container" key={index}>
                            <h4 className={`troop-level ${troop.level === troop.maxLevel ? 'max-level' : ''}`}>{troop.level}</h4>
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
                <div className="troops-container">
                    {base.troops.map((troop, index) => (
                        <div className="troop-container" key={index}>
                            <h4 className={`troop-level ${troop.level === troop.maxLevel ? 'max-level' : ''}`}>{troop.level}</h4>
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
                    <div className="troops-container">
                        {base.supers.map((troop, index) => (
                            <div className="troop-container" key={index}>
                                <h4 className={`troop-level ${troop.level === troop.maxLevel ? 'max-level' : ''}`}>{troop.level}</h4>
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
                    <div className="troops-container">
                        {base.sieges.map((troop, index) => (
                            <div className="troop-container" key={index}>
                                <h4 className={`troop-level ${troop.level === troop.maxLevel ? 'max-level' : ''}`}>{troop.level}</h4>
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
            {base.spells && (
                <div className="troop-section">
                    <h3>SPELLS</h3>
                    <div className="troops-container">
                        {base.spells.map((troop, index) => (
                            <div className="troop-container" key={index}>
                                <h4 className={`troop-level ${troop.level === troop.maxLevel ? 'max-level' : ''}`}>{troop.level}</h4>
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
                                <h4 className={`troop-level ${troop.level === troop.maxLevel ? 'max-level' : ''}`}>{troop.level}</h4>
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
            {base.heroEquipment && (
                <div className="troop-section">
                    <h3>HERO EQUIPMENT</h3>
                    <div className="troops-container" id="player-home-pets">
                        {base.heroEquipment.map((troop, index) => (
                            <div className="troop-container" key={index}>
                                <h4 className={`troop-level ${troop.level === troop.maxLevel ? 'max-level' : ''}`}>{troop.level}</h4>
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
