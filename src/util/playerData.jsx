export default function processPlayerData(data) {
    const playerData = {
        username: data.name,
        tag: data.tag,
        level: data.level,
        home: {
            hallLevel: data.townHallLevel,
            weaponLevel: data.townHallWeaponLevel || "",
            current: data.trophies,
            best: data.bestTrophies,
            league: data.league?.name || "Unranked",
            leagueIcon: data.league?.iconUrls.small || "Unranked",
            units: {
                heroes: data.heroes.filter((hero) => hero.village === "home"),
                troops: data.troops.filter(
                    (troop) =>
                        troop.village === "home" &&
                        !pets.includes(troop.name) &&
                        !supers.includes(troop.name) &&
                        !sieges.includes(troop.name)
                ),
                supers: data.troops
                    .filter(
                        (troop) =>
                            troop.village === "home" &&
                            supers.includes(troop.name)
                    )
                    .map((troop) => {
                        superTroopDelegate(troop);
                        return troop;
                    }),
                sieges: data.troops.filter(
                    (siege) =>
                        troop.village === "home" && sieges.includes(siege.name)
                ),
                pets: data.troops.filter(
                    (troop) =>
                        troop.village === "home" && pets.includes(troop.name)
                ),
                spells: data.spells,
                heroEquipment: data.heroEquipment.filter(
                    (heroEq) => heroEq.village === "home"
                ),
            },
            home: data.achievements.filter((achievement) => achievement.village === "home")
        },
        builder: {
            hallLevel: data.builderHallLevel,
            current: data.builderBaseTrophies,
            best: data.bestBuilderBaseTrophies,
            league: data.builderBaseLeague?.name || "Unranked",
            base: "builder",
            unit: {
                heroes: data.heroes.filter(
                    (hero) => hero.village === "builderBase"
                ),
                troops: data.troops.filter(
                    (troop) => troop.village === "builderBase"
                )
            },
            builder: data.achievements.filter((achievement) => achievement.village === "builderBase")
        },
        labels: [
            data.labels[0]?.iconUrls.small || "",
            data.labels[1]?.iconUrls.small || "",
            data.labels[2]?.iconUrls.small || "",
        ],
        clan: {
            name: data.clan?.name || "No Clan",
            role: data.clan ? fixClanRole(data.role) : "None",
            donated: data.donations,
            received: data.donationsReceived,
            badge: data.clan?.badgeUrls.large || "",
        },
    };

    // FIXER FUNCTIONS:
    // Checks if base troop level has unlocked super troop unit
    playerData.home.units.troops.map((troop) => {
        for (let i = 0; i < superReqs.length; i++) {
            if (
                troop.name === superReqs[i][0] &&
                troop.level < superReqs[i][1]
            ) {
                playerHome.supers = playerHome.supers.filter(
                    (troop) => troop.name != superReqs[i][2]
                );
            }
        }
    });

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
                newRole = "None";
                break;
            default:
                newRole = "UNKNOWN";
                break;
        }
        return newRole;
    }

    function superTroopDelegate(troop) {
        if (troop.name.includes("Super ")) {
            troop.level = fixSuperTroop(troop.name, "Super ", "");
        } else if (troop.name.includes("Sneaky ")) {
            troop.level = fixSuperTroop(troop.name, "Sneaky ", "");
        } else if (troop.name.includes("Rocket ")) {
            troop.level = fixSuperTroop(troop.name, "Rocket ", "");
        } else if (troop.name.includes("Inferno ")) {
            troop.level = fixSuperTroop(troop.name, "Inferno ", "Baby ");
        } else if (troop.name.includes("Ice ")) {
            troop.level = fixSuperTroop(troop.name, "Ice ", "Lava ");
        }
    }

    function fixSuperTroop(troopName, original, replacer) {
        const newName = troopName.replace(original, replacer);
        const result = playerHome.troops.filter(
            (curr) => curr.name === newName
        );
        return result[0].level;
    }

    // LISTS:
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

    const sieges = [
        "Wall Wrecker",
        "Battle Blimp",
        "Stone Slammer",
        "Siege Barracks",
        "Log Launcher",
        "Flame Flinger",
        "Battle Drill",
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
    ];

    return playerData;
}
