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

    const playerHome = {
       
    }

    const playerBuilder = {
       
    }

    return {playerMain, playerGeneral, playerHome, playerBuilder}
}

export default usePlayerData;