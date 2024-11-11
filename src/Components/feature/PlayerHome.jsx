import images from './Images'

const getImage = (name) => images[name.replace(/[ .]/g, '_')] || null;

function PlayerHome({playerHome}) {
        return (
        <div id='player-home-data'>
            <h3>HOME VILLAGE TROOPS:</h3>
            <div className='troops-container' id='player-home-troops'>
            {playerHome.troops.map((troop, index) => (
                troop.village === 'home' ? (
                    <div className='troop-container' key={index}>
                        <h4 className='troop-level'>{troop.level}</h4>
                        <img id='test-img' src={getImage(troop.name)} alt="" />                   
                    </div>
                ) : null
            ))}
            </div>
            <h3>BUILDER VILLAGE TROOPS:</h3>
            <div className='troops-container' id='player-home-troops'>
            {playerHome.troops.map((troop, index) => (
                troop.village === 'builderBase' ? (
                    <div className='troop-container' key={index}>
                        <h4 className='troop-level'>{troop.level}</h4>
                        <img id='test-img' src={getImage(troop.name)} alt="" />                   
                    </div>
                ) : null
            ))}
            </div>
        </div>
    )
}   

export default PlayerHome