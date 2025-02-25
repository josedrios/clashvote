import { useState } from "react";

export default function SearchResults({ clanData }) {
    const [selectedClan, setSelectedClan] = useState(null);
    // curl -H 'Authorization: Bearer API_KEY' https://api.clashofclans.com/v1/clans/%232Y0Q9QGQ2
    // curl -H 'Authorization: Bearer API_KEY' https://api.clashofclans.com/v1/clans?name=theholycrusade


    const handleViewClick = (clan) => {
        var data = fetchData(clan.slice(1))
        setSelectedClan(data);
    };

    async function fetchData(prompt) {
        try {
            var response = await fetch(
                `http://localhost:3001/api/clan-info/${prompt}`
            );
            
            if (response.status === 404) {
                throw new Error(`Failed to get clan info for '${prompt}'`);
            } else if (!response.ok) {
                throw new Error("Clash of Clans API failed");
            }
            const data = await response.json();
            console.log(data)
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    const handleBackClick = () => {
        setSelectedClan(null);
    };

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
            <h2>{clan.name}</h2>
            <p>Tag: {clan.tag}</p>
            <p>Members: {clan.members}/50</p>
            <button className="standard-btn" onClick={handleBackClick}>
                Back to Results
            </button>
        </div>
    );
}
