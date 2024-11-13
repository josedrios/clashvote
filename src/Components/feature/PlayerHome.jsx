import images from './Images'

const getImage = (name) => images[name.replace(/[ .]/g, '_')] || null;

function PlayerHome({playerHome}) {
        console.log(playerHome)
        return (
        <div id='player-home-data'>
            <h3>HOME VILLAGE HEROES:</h3>
            <div className='troops-container' id='player-home-heroes'>
                {playerHome.heroes.map((troop, index) => (
                    <div className='troop-container' key={index}>
                        <h4 className='troop-level'>{troop.level}</h4>
                        <img id='test-img' src={getImage(troop.name)} alt="" />
                    </div>
                ))}
            </div>
            <h3>HOME VILLAGE TROOPS:</h3>
            <div className='troops-container' id='player-home-troops'>
                {playerHome.troops.map((troop, index) => (
                    <div className='troop-container' key={index}>
                        <h4 className='troop-level'>{troop.level}</h4>
                        <img id='test-img' src={getImage(troop.name)} alt="" />
                    </div>
                ))}
            </div>
            <h3>HOME VILLAGE PETS:</h3>
            <div className='troops-container' id='player-home-pets'> 
                {playerHome.pets.map((troop, index) => (
                    <div className='troop-container' key={index}>
                        <h4 className='troop-level'>{troop.level}</h4>
                        <img id='test-img' src={getImage(troop.name)} alt="" />
                    </div>
                ))}
            </div>
        </div>
    )
}   

export default PlayerHome