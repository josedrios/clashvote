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

    // TROOP CLASSIFICATION LOOP
    const amountOfTroops = playerData.troops.length;
    // HERO CLASSIFICATION LOOP

    const playerHome = {
       troopCount: amountOfTroops,
       troops: playerData.troops,
    }

    const playerBuilder = {
       
    }

    return {playerMain, playerGeneral, playerHome, playerBuilder}
}

export default usePlayerData;