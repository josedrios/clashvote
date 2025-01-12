import images from '../Images'
import Data from '../../../general_data.json'
const getImage = (name) => images[name.replace(/[ .]/g, "_")] || null;

function SeasonGraph({}) {
    return (
        <div className="voting-component">
            <div className='voting-header'>
                <h3>
                    Heroes
                </h3>
                <button>
                    Vote
                </button>
            </div>
            <div className='multiple-candidate-container'> 
            {Data.heroes.map((candidate, key) => (
                <div className='candidate-container' key={key}>
                    <img className='candidate-image' src={getImage(candidate.name)} alt="" />
                    <div className='candidate-info'>
                        <h4>{candidate.name}</h4>
                        <div className='candidate-vote-bar'>
                            <div className='fill-bar'/>
                        </div>
                        <div className='candidate-stats'>
                            <h5>??%</h5>
                            <h5>??k votes</h5>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}

export default SeasonGraph