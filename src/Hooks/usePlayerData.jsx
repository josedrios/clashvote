function usePlayerData(playerData){
    const playerGeneral = {
        name: playerData.name,
        thLevel: playerData.townHallLevel,
        trophies: playerData.trophies
    }

    const playerClan = {
        tag: playerData.clan.tag,
        name: playerData.clan.name,
        level: playerData.clan.clanLevel
    }

    return {playerGeneral, playerClan}
}

export default usePlayerData;

// about the unwrapping of playerData in the above param
// const { playerGeneral, playerClan } = usePlayerData(playerData);
    // why curly brackets can i do parenthesis
