import useImage from "../../util/useImage";

function TeamMemberCard({ name, role }) {
    const imageSrc = useImage(name); 

    return (
        <div className="team-member-card">
            <img className="team-member-pfp" src={imageSrc} alt={name} />
            <div className="team-member-info">
                <div className="team-member-name">Jose D. Rios</div>
                <div className="team-member-role">{role}</div>
            </div>
        </div>
    );
}

export default function About() {
    const pfp = [
        "Archer",
        "Golem",
        "Wizard",
        "Goblin",
        "Dragon",
        "Valkyrie",
    ];
    const aboutP1 =
        "I started playing Clash of Clans (COC) as a kid, over a decade ago, and watched it evolve while building my base. I played with my brothers and friends and my favorite aspect of the game was the sense of community. The removal of global chat was a major devastation to us all, and though I kept playing, the sense of connection was never the same.";
    const aboutP2 =
        "Now, as a young adult with programming skills, I want to give back to the same community that shaped me into the man I am today by making a helpful website. This platform will allow players to vote on various topics, share guidance, and discuss gameplay concepts, fostering collaboration and helping everyone navigate the game better.";
    const roles = [
        "Frontend Engineer",
        "Backend Engineer",
        "UI/UX Designer",
        "DevOps Engineer",
        "Database Administrator",
        "QA Engineer",
    ];

    return (
        <div id="about-container">
            <h3 id="about-us-title">
                Meet the <span>Team</span>
            </h3>
            <div id="about-us-body">
                <div id="about-us-description">
                    <div className="desc-paragraph">&emsp;{aboutP1}</div>
                    <div className="desc-paragraph">&emsp;{aboutP2}</div>
                </div>
                <div id="team-member-container">
                    {roles.map((role, index) => (
                        <TeamMemberCard key={index} name={pfp[index]} role={role} />
                    ))}
                </div>
            </div>
        </div>
    );
}
