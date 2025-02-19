import { useState } from "react";

export default function SearchResults({ clanData }) {
    // DYNAMIC IMAGE IMPORT:
    const [currImage, setCurrImage] = useState("");
    import(`../../../../assets/images/heroes/Archer_Queen.png`).then((image) => {
        setCurrImage(image.default);
    });

    return (
        <div id="" >
            <img src={currImage} alt="" />
            {clanData?.items?.map((clan, key) => (
                <div className="clan-result-card" key={key}>
                    <h3>{clan.name}</h3>
                    <p>{clan.members}</p>
                    <p>{clan.location?.name || "Unknown"}</p>
                    <img src={clan.badgeUrls.medium} alt="" />
                </div>
            ))}
        </div>
    );
}
