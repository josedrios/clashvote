import { useState } from "react";

export default function SearchResults({ clanData }) {
    // DYNAMIC IMAGE IMPORT:
    // const [currImage, setCurrImage] = useState("");
    // import(`../../../../assets/images/heroes/Archer_Queen.png`).then((image) => {
    //     setCurrImage(image.default);
    // });

    return (
        <div id="clan-results-container">
            {/* Used for dynamic importing
            <img src={currImage} alt="" /> */}
            {clanData?.items?.map((clan, key) => (
                <div className="clan-result-card" key={key}>
                    <img src={clan.badgeUrls.medium} alt="" />
                    <h5>{clan.name}</h5>
                    <p className="clan-card-tag">{clan.tag}</p>
                    <div className="clan-card-progress-label">
                        <p>Members</p>
                        <p className="clan-card-member-fraction">{clan.members}<span>/50</span></p>
                    </div>
                    <div className="clan-card-progress-bar">
                        <div className="clan-card-fill-bar" style={{ width: `${clan.members * 2}%`}}/>
                    </div>
                    <div className="clan-card-footer">
                        <p>{clan.warLeague.name}</p>
                        <button className="standard-btn">View</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
