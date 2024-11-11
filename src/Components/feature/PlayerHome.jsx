import images from './Images'

const getImage = (name) => images[name.replace(/[ .]/g, '_')] || null;

function PlayerHome({playerHome}) {
        return (
        <div id='player-home-data'>
            <h3>HOME VILLAGE TROOPS:</h3>
            <div>
            {playerHome.troops.map((troop, index) => (
                troop.village === 'home' ? (
                    <div className='troop-container' key={index}>
                        <h4>{troop.name}: {troop.level},{troop.village}</h4>
                        <h4>TEST: {troop.name.replace(/[ .]/g, '_')}.png</h4>

                        <img id='test-img' src={getImage(troop.name)} alt="" />                   
                    </div>
                ) : null
            ))}
            </div>
            <h3>BUILDER VILLAGE TROOPS:</h3>
            <div>
            {playerHome.troops.map((troop, index) => (
                troop.village === 'builderBase' ? (
                    <div className='troop-container' key={index}>
                        <h4>{troop.name}: {troop.level},{troop.village}</h4>
                        <h4>TEST: {troop.name.replace(/[ .]/g, '_')}.png</h4>

                        <img id='test-img' src={getImage(troop.name)} alt="" />                   
                    </div>
                ) : null
            ))}
            </div>
        </div>
    )
}   

export default PlayerHome