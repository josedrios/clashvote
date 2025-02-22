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
                    <div className="clan-card-progress">
                        <div>
                            <p>Members</p>
                            <p>{(((clan.members / 50)) * 100).toFixed(0)}%</p>
                        </div>
                    </div>
                    <div>
                    <p>{clan.warLeague.name}</p>
                    <p>{clan.members}/50</p>
                    </div>
                </div>
            ))}
        </div>
    );
}