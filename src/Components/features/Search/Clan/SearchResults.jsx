import { useState } from "react";

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
            <h2>{clan.name}</h2>
            <p>Tag: {clan.tag}</p>
            <p>Members: {clan.members}/50</p>
            <button className="standard-btn" onClick={handleBackClick}>
                Back to Results
            </button>
        </div>
    );
}