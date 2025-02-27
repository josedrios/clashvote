import images from "../../Images";
const getImage = (name) => images[name.replace(/[ .]/g, "_")] || null;

export default function THOverview({ clan }) {
    const countTH = (clan) => {
        const thLevels = [];
        const thCount = new Array(20).fill(0);

        clan.memberList.forEach((member) => {
            if (member.townHallLevel) {
                thLevels.push(member.townHallLevel);
            }
        });

        thLevels.forEach((thLevel) => {
            thCount[thLevel] += 1;
        });

        return thCount;
    };
    const thCounts = countTH(clan);

    return (
        <div>
            <h5 className="th-count-header">TH Overview</h5>
            <div className="th-count-container">
                {thCounts.map((count, thLevel) => {
                    if (count === 0) return null;
                    return (
                        <div className="th-counter">
                            <img title={"TH" + thLevel} src={getImage("th" + thLevel)} alt="" />
                            <p>{count}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
