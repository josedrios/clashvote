import { useNavigate } from "react-router-dom";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
import useImage from '../../../../util/images/useImage';

function GetImage({name, className}) {
    const imageSrc = useImage(name);
    
    return (
        <img src={imageSrc} className={className} alt="" />
    )
}

export default function Members({ clan, fetchPlayer }) {
    const navigate = useNavigate();

    const fixClanRole = (role) => {
        var newRole = "";
        switch (role) {
            case "member":
                newRole = "Member";
                break;
            case "admin":
                newRole = "Elder";
                break;
            case "coLeader":
                newRole = "Co-Leader";
                break;
            case "leader":
                newRole = "Leader";
                break;
            case "None":
                newRole = "None";
                break;
            default:
                newRole = "UNKNOWN";
                break;
        }
        return newRole;
    };

    const handlePlayerInfo = (player) => {
        navigate(`/search/player/${player.split("#").join("")}`)
    };

    return (
        <div className="clan-members-section">
            <div className="clan-members-header">
                <h5>
                    Member<p>({clan.members})</p>
                </h5>
                <div className="clan-members-status">
                    <div className="clan-members-status-bar">
                        <div
                            className="clan-members-status-fill"
                            style={{ width: `${clan.members * 2}%` }}
                        />
                    </div>
                    <p>{clan.members * 2}%</p>
                </div>
            </div>
            <div className="clan-member-list">
                <div
                    className="clan-member-row"
                    id="clan-member-row-example"
                >
                    <div className="member-row-section member-name-info">
                        <p className="member-name" id="member-row-name-header">Name</p>
                    </div>
                    <div className="member-row-section member-trophy-section">
                        <p>Trophies</p>
                    </div>
                    <div className="member-row-section member-donation-section">
                        <p>
                            Donations
                        </p>
                    </div>
                    <p id="member-row-th-header">TH</p>
                </div>
                {clan?.memberList?.map((member, key) => (
                    <div
                        className="clan-member-row"
                        key={key}
                        onClick={() => handlePlayerInfo(member.tag)}
                    >
                        <div className="member-row-section member-name-info">
                            <p className="member-name">{member.name}</p>
                            <p className="member-row-role">
                                {fixClanRole(member.role)}
                            </p>
                        </div>
                        <div className="member-row-section member-trophy-section">
                            <span>
                                <GetImage name={"th_trophy"} className={"member-row-trophy-icon"}/>
                                {member.builderBaseTrophies}
                            </span>
                            <span>
                                <GetImage name={"bb_trophy"} className={"member-row-trophy-icon"}/>
                                {member.trophies}
                            </span>
                        </div>
                        <div className="member-row-section member-donation-section">
                            <p>
                                <FaLongArrowAltUp className="out-dono-icon" />
                                {member.donations}
                            </p>
                            <p>
                                <FaLongArrowAltDown className="in-dono-icon" />
                                {member.donationsReceived}
                            </p>
                        </div>
                        <GetImage name={"th" + member.townHallLevel} className={"member-row-th-icon"}/>
                    </div>
                ))}
            </div>
        </div>
    );
}