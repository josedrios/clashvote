import { useState } from "react";
import images from "../../Images";
import { width } from "@fortawesome/free-regular-svg-icons/faAddressBook";

const getImage = (name) => images[name.replace(/[ .]/g, "_")] || null;

export default function SearchResults({ clanData }) {
    const [selectedClan, setSelectedClan] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleViewClick = async (clanTag) => {
        setIsLoading(true); // Mark page as loading
        setError(null); // Clear any previous errors

        try {
            const data = await fetchData(clanTag.slice(1)); // Remove '#' and fetch data
            if (data) {
                setSelectedClan(data);
            } else {
                setError("Failed to fetch clan data.");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchData = async (clanTag) => {
        try {
            const response = await fetch(
                `http://localhost:3001/api/clan-info/${clanTag}`
            );

            if (response.status === 404) {
                throw new Error(`Clan with tag '${clanTag}' not found.`);
            } else if (!response.ok) {
                throw new Error("Failed to fetch clan data.");
            }

            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error(error);
            throw error; // Re-throw the error to handle it in handleViewClick
        }
    };

    const handleBackClick = () => {
        setSelectedClan(null);
    };

    if (isLoading) {
        return <p>Loading clan details...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (selectedClan) {
        return (
            <ClanResult clan={selectedClan} handleBackClick={handleBackClick} />
        );
    }

    return (
        <div id="clan-results-container">
            {clanData?.items?.map((clan, key) => (
                <div className="clan-result-card" key={key}>
                    <img src={clan.badgeUrls.medium} alt="" />
                    <h5>{clan.name}</h5>
                    <p className="clan-card-tag">{clan.tag}</p>
                    <div className="clan-card-progress-label">
                        <p>Members</p>
                        <p className="clan-card-member-fraction">
                            {clan.members}
                            <span>/50</span>
                        </p>
                    </div>
                    <div className="clan-card-progress-bar">
                        <div
                            className="clan-card-fill-bar"
                            style={{ width: `${clan.members * 2}%` }}
                        />
                    </div>
                    <div className="clan-card-footer">
                        <p>{clan.warLeague.name}</p>
                        <button
                            className="standard-btn"
                            onClick={() => handleViewClick(clan.tag)}
                        >
                            View
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

function ClanResult({ clan, handleBackClick }) {
    return (
        <div className="clan-details-view">
            <div className="clan-header-details">
                <div className="clan-header-label">
                    <h3>{clan.name}</h3>
                    <img src={clan.badgeUrls.medium} alt="" />
                </div>
                <button className="standard-btn" onClick={handleBackClick}>
                    BACK
                </button>
            </div>
            <div className="clan-info-section">
                <div className="clan-detail-cards">
                    <div className="clan-basic-card clan card">
                        <p>{clan.warLeague.name}</p>
                        <p>{clan.tag}</p>
                        {clan.labels?.[0] && (
                            <div className="clan-labels">
                                <img
                                    className="clan-label-image"
                                    src={clan.labels[0].iconUrls.medium}
                                    alt=""
                                />
                                {clan.labels[1] && (
                                    <img
                                        className="clan-label-image"
                                        src={clan.labels[1].iconUrls.medium}
                                        alt=""
                                    />
                                )}
                                {clan.labels[2] && (
                                    <img
                                        className="clan-label-image"
                                        src={clan.labels[2].iconUrls.medium}
                                        alt=""
                                    />
                                )}
                            </div>
                        )}
                    </div>
                    <div className="clan-trophy-card clan-card">
                        <h5>Trophies</h5>
                        <p>
                            <span>
                                <img src={getImage("th_trophy")} alt="" />
                                {clan.clanPoints}
                            </span>
                            |
                            <span>
                                <img src={getImage("bb_trophy")} alt="" />
                                {clan.clanBuilderBasePoints}
                            </span>
                        </p>
                        <h6>Requirements:</h6>
                        <p>
                            <span>
                                <img src={getImage("th_trophy")} alt="" />
                                {clan.requiredTrophies}
                            </span>
                            |
                            <span>
                                <img src={getImage("bb_trophy")} alt="" />
                                {clan.requiredBuilderBaseTrophies}
                            </span>
                        </p>
                    </div>
                    <div className="clan-war-card clan-card">
                        <h5>War</h5>
                        <p>
                            <span>Freq:</span>
                            {clan.warFrequency}
                        </p>
                        <h6>Wins|Ties|Losses</h6>
                        <p>
                            {clan.warWins}/{clan.warTies}/{clan.warLosses}
                        </p>
                    </div>
                </div>
                {clan.description !== "" && (
                    <div className="clan-description">
                        <h5>Description:</h5>
                        <p>{clan.description}</p>
                    </div>
                )}
            </div>
            <Members clan={clan} />
        </div>
    );
}

function Members({ clan }) {
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
    }

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
                {clan?.memberList?.map((member, key) => (
                    <div className="clan-member-row" key={key}>
                        <div className="member-row-count">{key + 1}.</div>
                        <div className="member-row-section member-name-info">
                            <p>{member.name}</p>
                            <p className="member-row-role">{fixClanRole(member.role)}</p>
                        </div>
                        <div className="member-row-section">
                            <span>
                                <img className="member-row-trophy-icon" src={getImage("th_trophy")} alt="" />
                                {member.builderBaseTrophies}
                            </span>
                            <span>
                                <img className="member-row-trophy-icon" src={getImage("bb_trophy")} alt="" />
                                {member.trophies}
                            </span>
                        </div>
                        <div className="member-row-section member-donation-section">
                            <p>{member.donations}</p>
                            <p>{member.donationsReceived}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
