import images from "../../Images";
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
            <PlayerHomeHeader
                base={base}
                trophies={trophies}
                getImage={getImage}
            />
            {base.heroes && (
                <HeroUnitSection type={base.heroes} getImage={getImage} />
            )}
            <UnitSection type={base.troops} header="TROOPS" />
            {base.sieges && (
                <UnitSection type={base.sieges} header="SIEGE MACHINES" />
            )}
            {base.pets && <UnitSection type={base.pets} header="PETS" />}
            {base.spells && <UnitSection type={base.spells} header="SPELLS" />}
            {base.heroEquipment && (
                <UnitSection
                    type={base.heroEquipment}
                    header="HERO EQUIPMENT"
                />
            )}
            {base.supers && (
                <UnitSection type={base.supers} header="SUPER TROOPS" />
            )}
        </div>
    );
}

function UnitSection({ type, header }) {
    return (
        <div className="unit-section">
            <h3 id={header === "SUPER TROOPS" ? "super-troop-header" : ""}>
                {header}
            </h3>
            {header !== "SUPER TROOPS" ? <ProgressBar type={type} /> : ""}
            <div className="units-container">
                {type.map((unit, index) => (
                    <div
                        className="unit-container"
                        key={index}
                        title={unit.name}
                    >
                        <h4
                            className={`unit-level ${
                                unit.level === unit.maxLevel ? "max-level" : ""
                            }`}
                        >
                            {unit.level}
                        </h4>
                        <img
                            className="unit-img"
                            src={getImage(unit.name)}
                            alt=""
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

function HeroUnitSection({ type, getImage }) {
    return (
        <div className="unit-section">
            <h3>HEROES</h3>
            <ProgressBar type={type} />
            <div className="units-container">
                {type.map((unit, index) => (
                    <div key={index}>
                        <div
                            className="unit-container hero-troop-container"
                            title={unit.name}
                        >
                            <h4
                                className={`unit-level ${
                                    unit.level === unit.maxLevel
                                        ? "max-level"
                                        : ""
                                }`}
                            >
                                {unit.level}
                            </h4>
                            <img
                                className="unit-img"
                                src={getImage(unit.name)}
                                alt=""
                            />
                        </div>
                        {unit.equipment?.[0] && (
                            <div className="hero-equipment">
                                <img
                                    title={unit.equipment?.[0].name || ""}
                                    src={getImage(
                                        unit.equipment?.[0].name || ""
                                    )}
                                    className="hero-item"
                                    alt=""
                                />
                                <img
                                    title={unit.equipment?.[1].name || ""}
                                    src={getImage(
                                        unit.equipment?.[1].name || ""
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
    );
}

function PlayerHomeHeader({ base, trophies, getImage }) {
    return (
        <div className="player-base-header-container">
            <div className="player-base-header-info">
                <h3 className="player-base-header">
                    {base.base === "home" ? "Home Village" : "Builder Base"}
                </h3>
                <div className="player-base-header-trophies">
                    <div className="header-trophy-div">
                        <p>Current:{trophies.current}</p>
                        <GoTrophy className="trophy-icon" />
                    </div>
                    <div className="header-trophy-div" id="trophy-slash">/</div>
                    <div className="header-trophy-div">
                        <p>Best:{trophies.best}</p>
                        <GoTrophy className="trophy-icon" />
                    </div>
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
    );
}

function ProgressBar({ type }) {
    return (
        <div className="unit-progress-flex">
            <div className="unit-progress-percentage">
                {(
                    (type.reduce((sum, unit) => sum + unit.level, 0) /
                        type.reduce((sum, unit) => sum + unit.maxLevel, 0)) *
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
                            (type.reduce((sum, unit) => sum + unit.level, 0) /
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
                    /{type.reduce((sum, unit) => sum + unit.maxLevel, 0)}
                </p>
            </div>
        </div>
    );
}

export default PlayerHome;
