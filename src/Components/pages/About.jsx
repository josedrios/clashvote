import images from "../feature/Images";
import AboutInfo from "../../about.json";

const getImage = (name) => images[name.replace(/[ .]/g, "_")] || null;

function About({}) {
    const pfp = ["Archer", "Golem", "Wizard", "Thrower", "Inferno Dragon"];

    return (
        <div id="about-container">
            <h3 id="about-us-title">
                Meet the <p>Team</p>
            </h3>
            <div id="about-us-body">
                <div id="about-us-description">{AboutInfo.about}</div>
                <div id="team-member-container">
                    {AboutInfo.team.map((dev, index) => (
                        <div className="team-member-card" key={index}>
                            <img
                                className="team-member-pfp"
                                src={getImage(pfp[index])}
                                alt=""
                            />
                            <div className="team-member-info">
                                <div className="team-member-name">
                                    Jose D. Rios
                                </div>
                                <div className="team-member-role">
                                    {dev.role}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default About;
