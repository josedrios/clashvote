export default function processPlayerData(playerData) {
    const playerMain = {
        name: playerData.name,
        homeLeagueIcon: playerData.league?.iconUrls.small || "Unranked",
        homeLeague: playerData.league?.name || "Unranked",
        builderLeague: playerData.builderBaseLeague?.name || "Unranked",
        tag: playerData.tag,
        level: playerData.expLevel,
        accountLabel: [
            playerData.labels[0]?.iconUrls.small || "",
            playerData.labels[1]?.iconUrls.small || "",
            playerData.labels[2]?.iconUrls.small || "",
        ],
    };

    const playerClan = {
        troopsDonated: playerData.donations,
        troopsReceived: playerData.donationsReceived,
        clanName: playerData.clan?.name || "No Clan",
        clanRole: playerData.clan ? fixClanRole(playerData.role) : "None",
        clanBadge: playerData.clan?.badgeUrls.large || "",
    };

    // Change Clan Role to appropriate name
    function fixClanRole(role) {
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
                newRole = "None"
                break;
            default:
                newRole = "UNKNOWN";
                break;
        }
        return newRole
    }

    const homeTrophies = {
        hallLevel: playerData.townHallLevel,
        weaponLevel: playerData.townHallWeaponLevel || "",
        current: playerData.trophies,
        best: playerData.bestTrophies,
    };

    const builderTrophies = {
        hallLevel: playerData.builderHallLevel,
        current: playerData.builderBaseTrophies,
        best: playerData.bestBuilderBaseTrophies,
    };

    const pets = [
        "L.A.S.S.I",
        "Electro Owl",
        "Mighty Yak",
        "Unicorn",
        "Frosty",
        "Diggy",
        "Poison Lizard",
        "Phoenix",
        "Spirit Fox",
        "Angry Jelly",
    ];

    const supers = [
        "Super Barbarian",
        "Super Archer",
        "Super Giant",
        "Sneaky Goblin",
        "Super Wall Breaker",
        "Rocket Balloon",
        "Super Wizard",
        "Inferno Dragon",
        "Super Minion",
        "Super Valkyrie",
        "Super Witch",
        "Ice Hound",
        "Super Bowler",
        "Super Dragon",
        "Super Miner",
        "Super Hog Rider",
    ];

    const sieges = [
        "Wall Wrecker",
        "Battle Blimp",
        "Stone Slammer",
        "Siege Barracks",
        "Log Launcher",
        "Flame Flinger",
        "Battle Drill",
    ];

    const playerHome = {
        base: "home",
        heroes: playerData.heroes.filter((hero) => hero.village === "home"),
        troops: playerData.troops.filter(
            (troop) =>
                troop.village === "home" &&
                !pets.includes(troop.name) &&
                !supers.includes(troop.name) &&
                !sieges.includes(troop.name)
        ),
        supers: playerData.troops.filter((superTroop) =>
            supers.includes(superTroop.name)
        ),
        sieges: playerData.troops.filter((siege) =>
            sieges.includes(siege.name)
        ),
        pets: playerData.troops.filter((troop) => pets.includes(troop.name)),
        spells: playerData.spells,
        heroEquipment: playerData.heroEquipment.filter((heroEq) => heroEq.village === "home"),
    };

    // Super Troop Level Fix Function
    function replaceLevel(troopName, original, replacer) {
        const newName = troopName.replace(original, replacer);
        const result = playerHome.troops.filter(
            (curr) => curr.name === newName
        );
        return result[0].level;
    }

    playerHome.supers.map((troop) => {
        if (troop.name.includes("Super ")) {
            troop.level = replaceLevel(troop.name, "Super ", "");
        } else if (troop.name.includes("Sneaky ")) {
            troop.level = replaceLevel(troop.name, "Sneaky ", "");
        } else if (troop.name.includes("Rocket ")) {
            troop.level = replaceLevel(troop.name, "Rocket ", "");
        } else if (troop.name.includes("Inferno ")) {
            troop.level = replaceLevel(troop.name, "Inferno ", "Baby ");
        } else if (troop.name.includes("Ice ")) {
            troop.level = replaceLevel(troop.name, "Ice ", "Lava ");
        }
    });

    const superReqs = [
        ["Super Archer", 8, "Archer"],
        ["Super Barbarian", 8, "Barbarian"],
        ["Super Giant", 9, "Giant"],
        ["Sneaky Goblin", 7, "Goblin"],
        ["Super Wall Breaker", 7, "Wall Breaker"],
        ["Rocket Balloon", 8, "Balloon"],
        ["Super Wizard", 9, "Wizard"],
        ["Super Dragon", 7, "Dragon"],
        ["Inferno Dragon", 6, "Baby Dragon"],
        ["Super Miner", 7, "Miner"],
        ["Super Minion", 8, "Minion"],
        ["Super Hog Rider", 10, "Hog Rider"],
        ["Super Valkyrie", 7, "Valkyrie"],
        ["Super Witch", 5, "Witch"],
        ["Ice Hound", 5, "Lava Hound"],
        ["Super Bowler", 4, "Bowler"],
    ]

    playerHome.troops.map((troop) => {
        for(let i = 0; i < superReqs.length; i++){
            if(troop.name === superReqs[i][0] && troop.level < superReqs[i][1]){
                playerHome.supers = playerHome.supers.filter((troop) => troop.name != superReqs[i][2])
            }
        }
    });

    const playerBuilder = {
        base: "builder",
        heroes: playerData.heroes.filter(
            (hero) => hero.village === "builderBase"
        ),
        troops: playerData.troops.filter(
            (troop) => troop.village === "builderBase"
        ),
    };

    const achievements = {
        home: playerData.achievements.filter((achievement) => achievement.village === "home"),
        builder: playerData.achievements.filter((achievement) => achievement.village === "builderBase")
    }

    return {
        playerMain,
        playerClan,
        playerHome,
        playerBuilder,
        homeTrophies,
        builderTrophies,
        achievements
    };
}
