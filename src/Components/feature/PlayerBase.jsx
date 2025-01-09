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
                        <p>Current:{trophies.current}</p>
                        <GoTrophy className="trophy-icon" />/
                        <p>Best:{trophies.best}</p>
                        <GoTrophy className="trophy-icon" />
                    </div>
                </div>
                <div className="hall-container">
                    <h4
                        className={`hall-level ${
                            trophies.hallLevel === 17 && base.base === "home"
                                ? "max-level"
                                : trophies.hallLevel === 10 &&
                                  base.base === "builder"
                                ? "max-level"
                                : ""
                        }`}
                    >
                        {trophies.hallLevel}
                    </h4>
                    <div className="weapon-level">
                        {Array.from(
                            { length: trophies.weaponLevel },
                            (_, index) => (
                                <img
                                    className="weapon-level-star"
                                    key={index}
                                    src={getImage("star")}
                                    alt=""
                                />
                            )
                        )}
                    </div>
                    <img
                        className="hall-img"
                        src={getImage(
                            (base.base === "home" ? "th" : "bh") +
                                trophies.hallLevel
                        )}
                        alt=""
                    />
                </div>
            </div>
            {base.heroes && (
                <div className="troop-section">
                    <h3>HEROES</h3>
                    <ProgressBar type={base.heroes}/>
                    <div className="troops-container">
                        {base.heroes.map((troop, index) => (
                            <div>
                                <div
                                    className="troop-container hero-troop-container"
                                    key={index}
                                    title={troop.name}
                                >
                                    <h4
                                        className={`troop-level ${
                                            troop.level === troop.maxLevel
                                                ? "max-level"
                                                : ""
                                        }`}
                                    >
                                        {troop.level}
                                    </h4>
                                    <img
                                        className="unit-img"
                                        src={getImage(troop.name)}
                                        alt=""
                                    />
                                </div>
                                {troop.equipment?.[0] && (
                                    <div className="hero-equipment">
                                        <img
                                            title={
                                                troop.equipment?.[0].name || ""
                                            }
                                            src={getImage(
                                                troop.equipment?.[0].name || ""
                                            )}
                                            className="hero-item"
                                            alt=""
                                        />
                                        <img
                                            title={
                                                troop.equipment?.[1].name || ""
                                            }
                                            src={getImage(
                                                troop.equipment?.[1].name || ""
                                            )}
                                            className="hero-item"
                                            alt=""
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className="troop-section">
                <h3>TROOPS</h3>
                <ProgressBar type={base.troops}/>
                <div className="troops-container">
                    {base.troops.map((troop, index) => (
                        <div
                            className="troop-container"
                            key={index}
                            title={troop.name}
                        >
                            <h4
                                className={`troop-level ${
                                    troop.level === troop.maxLevel
                                        ? "max-level"
                                        : ""
                                }`}
                            >
                                {troop.level}
                            </h4>
                            <img
                                className="unit-img"
                                src={getImage(troop.name)}
                                alt=""
                            />
                        </div>
                    ))}
                </div>
            </div>
            {base.sieges && (
                <div className="troop-section">
                    <h3>SIEGE MACHINES</h3>
                    <ProgressBar type={base.sieges}/>
                    <div className="troops-container">
                        {base.sieges.map((troop, index) => (
                            <div
                                className="troop-container"
                                key={index}
                                title={troop.name}
                            >
                                <h4
                                    className={`troop-level ${
                                        troop.level === troop.maxLevel
                                            ? "max-level"
                                            : ""
                                    }`}
                                >
                                    {troop.level}
                                </h4>
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
                    <ProgressBar type={base.pets}/>
                    <div className="troops-container" id="player-home-pets">
                        {base.pets.map((troop, index) => (
                            <div
                                className="troop-container"
                                key={index}
                                title={troop.name}
                            >
                                <h4
                                    className={`troop-level ${
                                        troop.level === troop.maxLevel
                                            ? "max-level"
                                            : ""
                                    }`}
                                >
                                    {troop.level}
                                </h4>
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
                    <ProgressBar type={base.spells}/>
                    <div className="troops-container">
                        {base.spells.map((troop, index) => (
                            <div
                                className="troop-container"
                                key={index}
                                title={troop.name}
                            >
                                <h4
                                    className={`troop-level ${
                                        troop.level === troop.maxLevel
                                            ? "max-level"
                                            : ""
                                    }`}
                                >
                                    {troop.level}
                                </h4>
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
                    <ProgressBar type={base.heroEquipment}/>
                    <div className="troops-container" id="player-home-pets">
                        {base.heroEquipment.map((troop, index) => (
                            <div
                                className="troop-container"
                                key={index}
                                title={troop.name}
                            >
                                <h4
                                    className={`troop-level ${
                                        troop.level === troop.maxLevel
                                            ? "max-level"
                                            : ""
                                    }`}
                                >
                                    {troop.level}
                                </h4>
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
            {base.supers && (
                <div className="troop-section">
                    <h3 id="super-troop-header">SUPER TROOPS</h3>
                    <div className="troops-container">
                        {base.supers.map((troop, index) => (
                            <div
                                className="troop-container"
                                key={index}
                                title={troop.name}
                            >
                                <h4
                                    className={`troop-level ${
                                        troop.level === troop.maxLevel
                                            ? "max-level"
                                            : ""
                                    }`}
                                >
                                    {troop.level}
                                </h4>
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

function UnitSection({type}) {
    return (
        <div>
            UNIT SECTION REFACTORING
        </div>
    )
}

function ProgressBar({type}) {
    return (
        <div className="unit-progress-flex">
            <div className="unit-progress-percentage">
                {(
                    (type.reduce((sum, unit) => sum + unit.level, 0) /
                        type.reduce(
                            (sum, unit) => sum + unit.maxLevel,
                            0
                        )) *
                    100
                ).toFixed(1)}
                %
            </div>
            <div className="unit-progress-bar">
                <div className="unit-bar" />
                <div
                    className="unit-fill-bar"
                    style={{
                        width: `${
                            (type.reduce(
                                (sum, unit) => sum + unit.level,
                                0
                            ) /
                                type.reduce(
                                    (sum, unit) => sum + unit.maxLevel,
                                    0
                                )) *
                            100
                        }%`,
                    }}
                />
            </div>
            <div className="unit-progress-fraction">
                <p className="fraction-numerator">
                    {type.reduce((sum, unit) => sum + unit.level, 0)}
                </p>
                <p className="fraction-denominator">
                    /
                    {type.reduce(
                        (sum, unit) => sum + unit.maxLevel,
                        0
                    )}
                </p>
            </div>
        </div>
    );
}

export default PlayerHome;
