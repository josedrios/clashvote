function usePlayerData(playerData){
    const playerMain = {
        name: playerData.name,
        level: playerData.expLevel,
        tagID: playerData.tag
    }

    const playerGeneral = {
       thLevel: playerData.townHallLevel,
       bhLevel: playerData.builderHallLevel,
       clanName: playerData.clan.name,
       clanRole: playerData.role,
       troopsDonated: playerData.donations,
       troopsReceived: playerData.donationsReceived,
       accountLabel: {
        1: playerData.labels[0].name,
        3: playerData.labels[1].name,
        2: playerData.labels[2].name,
       }
    }

    const playerHome = {
       
    }

    const playerBuilder = {
       
    }

    return {playerMain, playerGeneral, playerHome, playerBuilder}
}

export default usePlayerData;