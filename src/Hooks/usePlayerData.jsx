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

    const playerHome = {
        heroes: playerData.heroes.filter(hero => hero.village === "home"),
        troops: playerData.troops.filter(troop => troop.village === "home"  && !pets.includes(troop.name)),
        pets: playerData.troops.filter(troop => troop.village === "home" && pets.includes(troop.name))
    }

    const playerBuilder = {
        heroes: playerData.heroes.filter(hero => hero.village === "builderBase"),
        troops: playerData.troops.filter(troop => troop.village === "builderBase"),
    }

    return {playerMain, playerGeneral, playerHome, playerBuilder}
}

export default usePlayerData;