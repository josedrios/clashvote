import images from './Images'

const getImage = (name) => images[name.replace(/[ .]/g, '_')] || null;

function PlayerBuilder({playerBuilder}) {
    return (
    <div id='player-builder-data'>
        <h3>BUILDER VILLAGE HEROES:</h3>
            <div className='troops-container' id='player-home-heroes'>
                {playerBuilder.heroes.map((troop, index) => (
                    <div className='troop-container' key={index}>
                        <h4 className='troop-level'>{troop.level}</h4>
                        <img id='test-img' src={getImage(troop.name)} alt="" />

                    </div>
                ))}
        </div>
        <h3>BUILDER VILLAGE TROOPS:</h3>
            <div className='troops-container' id='player-home-troops'>
            {playerBuilder.troops.map((troop, index) => (
                <div className='troop-container' key={index}>
                    <h4 className='troop-level'>{troop.level}</h4>
                    <img id='test-img' src={getImage(troop.name)} alt="" />                   
                </div>
            ))}
        </div>
    </div>
    )
}   

export default PlayerBuilder