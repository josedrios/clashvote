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
            {thCounts.map((count, thLevel) => {
                if (count === 0) return null;
                return <div>
                    TH {thLevel} = {count}
                </div>;
            })}
        </div>
    );
}
