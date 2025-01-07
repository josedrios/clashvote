function PlayerAchievements({ achievements }) {
    return (
        <div id="achievements-container">
            <div id="home-achievements">
                <h3>Home Achievements</h3>
                {achievements.home.map((ach, index) => (
                    <div className="ach-container" key={index}>
                        <div className="ach-name" title={ach.name}>
                            {ach.name}
                        </div>
                        <div className="ach-stars">Stars:{ach.stars}</div>
                        <div className="ach-progress">
                            Progress: {ach.value}/{ach.target}
                        </div>
                        <div className="ach-info">{ach.info}</div>
                    </div>
                ))}
            </div>
            <div id="builder-achievements">
                <h3>Builder Achievements</h3>
                {achievements.home.map((ach, index) => (
                    <div className="ach-container" key={index}>
                        <div className="ach-name" title={ach.name}>
                            {ach.name}
                        </div>
                        <div className="ach-stars">Stars:{ach.stars}</div>
                        <div className="ach-progress">
                            Progress: {ach.value}/{ach.target}
                        </div>
                        <div className="ach-info">{ach.info}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PlayerAchievements;
