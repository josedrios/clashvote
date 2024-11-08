function PlayerGeneral({playerGeneral}) {
    return (
        <div id='player-general-data'>
            <h3>TH Level: {playerGeneral.thLevel}</h3>
            <h3>BH Level: {playerGeneral.bhLevel}</h3>
            <h3>Clan Name: {playerGeneral.clanName}</h3> 
            <h3>Clan Role: {playerGeneral.clanRole}</h3>
            <h3>Troops Donated: {playerGeneral.troopsDonated}</h3>
            <h3>Troops Received: {playerGeneral.troopsReceived}</h3>
            <h3>Account Label: {playerGeneral.accountLabel[0]}</h3>
            <h3>Account Label: {playerGeneral.accountLabel[1]}</h3>
            <h3>Account Label: {playerGeneral.accountLabel[2]}</h3>
        </div>
    )
}
  
  export default PlayerGeneral