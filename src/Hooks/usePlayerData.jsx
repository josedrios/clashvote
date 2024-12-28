import { TbArrowLoopLeft2 } from "react-icons/tb";

function usePlayerData(playerData){
    const playerMain = {
        name: playerData.name,
        level: playerData.expLevel,
        tagID: playerData.tag
    }

    const playerGeneral = {
       thLevel: playerData.townHallLevel,
       bhLevel: playerData.builderHallLevel,
       clanName: playerData.clan?.name || 'No Clan',
       clanRole: playerData.clan? playerData.role : 'No Role',
       troopsDonated: playerData.donations,
       troopsReceived: playerData.donationsReceived,
       accountLabel: [
        playerData.labels[0]?.name || 'No Label',
        playerData.labels[1]?.name || 'No Label',
        playerData.labels[2]?.name || 'No Label',
       ]
    }

    // Pet names to isolate from playerData.troops
    
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
        "Angry Jelly"
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
        "Super Hog Rider"
    ];

    const sieges = [
        "Wall Wrecker",
        "Battle Blimp",
        "Stone Slammer",
        "Siege Barracks",
        "Log Launcher",
        "Flame Flinger",
        "Battle Drill"
    ];
    

    const playerHome = {
        heroes: playerData.heroes.filter(hero => hero.village === "home"),
        troops: playerData.troops.filter(troop => troop.village === "home"  && !pets.includes(troop.name) && !supers.includes(troop.name) && !sieges.includes(troop.name)),
        supers: playerData.troops.filter(superTroop => supers.includes(superTroop.name)),
        sieges: playerData.troops.filter(siege => sieges.includes(siege.name)),
        pets: playerData.troops.filter(troop => pets.includes(troop.name))
    }

    // Super Troop Level Fix Function
    function replaceLevel(troopName, original, replacer){
        const newName = troopName.replace(original, replacer)
        const result = playerHome.troops.filter(curr => curr.name === newName)
        return result[0].level
    }

    playerHome.supers.map((troop) => {
        if (troop.name.includes("Super ")){
            troop.level = replaceLevel(troop.name, "Super ", "")
        } else if (troop.name.includes("Sneaky ")){
            troop.level = replaceLevel(troop.name, "Sneaky ", "")
        } else if (troop.name.includes("Rocket ")){
            troop.level = replaceLevel(troop.name, "Rocket ", "")
        } else if (troop.name.includes("Inferno ")){
            troop.level = replaceLevel(troop.name, "Inferno ", "Baby ")
        } else if (troop.name.includes("Ice ")){
            troop.level = replaceLevel(troop.name, "Ice ", "Lava ")
        }
    })

    const playerBuilder = {
        heroes: playerData.heroes.filter(hero => hero.village === "builderBase"),
        troops: playerData.troops.filter(troop => troop.village === "builderBase"),
    }

    return {playerMain, playerGeneral, playerHome, playerBuilder}
}

export default usePlayerData;