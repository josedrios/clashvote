export default function SearchResults({ clanData }) {
    return (
        <div>
            {clanData?.items?.map((clan, key) => (
                <div key={key}>
                    <h3>{clan.name}</h3>
                    <p>{clan.members}</p>
                    <p>{clan.location?.name || "Unknown"}</p>
                    <img src={clan.badgeUrls.medium} alt="" />
                </div>
            ))}
        </div>
    );
}
