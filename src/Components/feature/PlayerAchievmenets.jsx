import images from "./Images";
import { FaCheck } from "react-icons/fa";

const getImage = (name) => images[name.replace(/[ .]/g, "_")] || null;

function PlayerAchievements({ achievements, base }) {
    return (
        <div id="achievements-container">
            <div className="ach-section">
                <h3 className="base-ach-header">{base === "home" ? "Home Achievements" : "Builder Achievements"}</h3>
                <div className="base-ach-container">
                    {achievements.map((ach, index) => (
                        <div className="ach-container" key={index}>
                            <div className="ach-stars">
                                {Array.from(
                                    { length: ach.stars },
                                    (_, index) => (
                                        <img
                                            className="ach-star"
                                            key={index}
                                            src={getImage("star")}
                                            alt=""
                                        />
                                    )
                                )}
                                {Array.from(
                                    { length: 3 - ach.stars },
                                    (_, index) => (
                                        <img
                                            className="ach-star-empty"
                                            key={index}
                                            src={getImage("star")}
                                            alt=""
                                        />
                                    )
                                )}
                            </div>
                            <div className="ach-body">
                                <div className="ach-name">{ach.name}</div>
                                <div className="ach-info">{ach.info}</div>
                            </div>
                            {ach.stars === 3 ? (
                                <div className="ach-progress ach-completion">
                                    <p className="ach-completion-note">
                                        {ach.completionInfo}
                                    </p>
                                    <FaCheck className="ach-check" />
                                </div>
                            ) : (
                                <div className="ach-progress">
                                    <div className="ach-progress-text">
                                        {ach.value}/{ach.target}
                                    </div>
                                    <div className="ach-progress-bar">
                                        <div
                                            className="ach-fill-bar"
                                            style={{
                                                width: `${
                                                    (ach.value / ach.target) *
                                                    100
                                                }%`,
                                            }}
                                        />
                                    </div>
                                    <div className="ach-percentage">
                                        {((ach.value / ach.target) * 100).toFixed(2)}%
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PlayerAchievements;
