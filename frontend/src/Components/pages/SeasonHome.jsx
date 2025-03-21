import {
  troopNames,
  heroNames,
  petNames,
  heroequipmentNames,
  superTroopNames,
  siegeNames,
  spellNames,
} from '../../util/images/imageCategories';
import { FaArrowRightLong } from 'react-icons/fa6';
import useImage from '../../util/images/useImage';

// TEMPORARY (FOR COMMENT VOTE VALUES)
function randomValue(bot, top) {
  return Math.floor(Math.random() * (top - bot + 1)) + bot;
}

export default function SeasonHome({}) {
  return (
    <div className="season-home-container">
      <div className="season-cards-container">
        <SeasonCard data={troopNames} title="Best Troop" />
        <SeasonCard data={heroNames} title="Best Hero" />
        <SeasonCard data={petNames} title="Best Pet" />
        <SeasonCard data={heroequipmentNames} title="Best Hero Equipment" />
        <SeasonCard data={spellNames} title="Best Spell" />
        <SeasonCard data={superTroopNames} title="Best Super Troop" />
        <SeasonCard data={siegeNames} title="Best Siege Machine" />
      </div>
    </div>
  );
}

function SeasonCard({ data, title }) {
  return (
    <button className="season-card">
      <div className="season-card-header">
        <h5>{title}</h5>
        <FaArrowRightLong />
      </div>
      <div className="season-card-body">
        {data.slice(0, 3).map((unit, key) => {
          return <CandidateRow name={unit} key={key} />;
        })}
        <div className="season-card-footer">
          <p>Votes:219</p>
          <p>Comments:46</p>
        </div>
      </div>
    </button>
  );
}

function CandidateRow({ name, key }) {
  const labelName = name.replace("_", " ");


  return (
    <div className="candidate-row" key={key}>
      <RetrieveImage name={name} />
      <div className="candidate-row-body">
        <div className='candidate-progress-bar-label'>
        <p className="candidate-percentage">33%</p>
        <p className='candidate-name'>{labelName}</p>
        </div>
        <div className="candidate-progress-bar">
          <div className="candidate-fill-bar" />
        </div>
      </div>
    </div>
  );
}

function RetrieveImage({ name, classname = '' }) {
  const imageSrc = useImage(name);

  return <img src={imageSrc} className={classname} alt="" />;
}
