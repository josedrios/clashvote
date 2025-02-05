import images from "../../Images";
import { GoTrophy } from "react-icons/go";

const getImage = (name) => images[name.replace(/[ .]/g, "_")] || null;

export default function PlayerBase({ data }) {
    return (
        <div
            className="player-base-container"
            id={
                data.type === "home"
                    ? "player-home-data"
                    : "player-builder-data"
            }
        >
            <PlayerHomeHeader data={data} getImage={getImage} />
            {data.units &&
                data.units.heroes &&
                data.units.heroes.length != 0 && (
                    <HeroUnitSection
                        type={data.units.heroes}
                        getImage={getImage}
                    />
                )}
            {data.units &&
                data.units.troops &&
                data.units.troops.length != 0 && (
                    <UnitSection type={data.units.troops} header="TROOPS" />
                )}
            {data.units &&
                data.units.sieges &&
                data.units.sieges.length != 0 && (
                    <UnitSection
                        type={data.units.sieges}
                        header="SIEGE MACHINES"
                    />
                )}
            {data.units && data.units.pets && data.units.pets.length != 0 && (
                <UnitSection type={data.units.pets} header="PETS" />
            )}
            {data.units &&
                data.units.spells &&
                data.units.spells.length != 0 && (
                    <UnitSection type={data.units.spells} header="SPELLS" />
                )}
            {data.units &&
                data.units.heroEquipment &&
                data.units.heroEquipment.length != 0 && (
                    <UnitSection
                        type={data.units.heroEquipment}
                        header="HERO EQUIPMENT"
                    />
                )}
            {data.units &&
                data.units.supers &&
                data.units.supers.length != 0 && (
                    <UnitSection
                        type={data.units.supers}
                        header="SUPER TROOPS"
                    />
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
                        {unit.equipment?.length > 0 && (
                            <div className="hero-equipment">
                                {unit.equipment[0] && (
                                    <img
                                        title={unit.equipment[0].name || ""}
                                        src={getImage(
                                            unit.equipment[0].name || ""
                                        )}
                                        className="hero-item"
                                        alt=""
                                    />
                                )}
                                {unit.equipment[1] && (
                                    <img
                                        title={unit.equipment[1].name || ""}
                                        src={getImage(
                                            unit.equipment[1].name || ""
                                        )}
                                        className="hero-item"
                                        alt=""
                                    />
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

function PlayerHomeHeader({ data, getImage }) {
    return (
        <div className="player-base-header-container">
            <div className="player-base-header-info">
                <h3 className="player-base-header">
                    {data.type === "home" ? "Home Village" : "Builder Base"}
                </h3>
                <div className="player-base-header-trophies">
                    <div className="header-trophy-div">
                        <p>Current:{data.current}</p>
                        <GoTrophy className="trophy-icon" />
                    </div>
                    &nbsp;
                    <div className="header-trophy-div">
                        <p>Best:{data.best}</p>
                        <GoTrophy className="trophy-icon" />
                    </div>
                </div>
            </div>
            <div className="hall-container">
                <h4
                    className={`hall-level ${
                        data.hallLevel === 17 && data.type === "home"
                            ? "max-level"
                            : data.hallLevel === 10 && data.type === "builder"
                            ? "max-level"
                            : ""
                    }`}
                >
                    {data.hallLevel}
                </h4>
                <div className="weapon-level">
                    {Array.from({ length: data.weaponLevel }, (_, index) => (
                        <img
                            className="weapon-level-star"
                            key={index}
                            src={getImage("star")}
                            alt=""
                        />
                    ))}
                </div>
                <img
                    className="hall-img"
                    src={getImage(
                        (data.type === "home" ? "th" : "bh") + data.hallLevel
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
