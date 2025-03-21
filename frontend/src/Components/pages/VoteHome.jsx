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
import { useNavigate } from 'react-router-dom';

export default function VoteHome() {
  const navigate = useNavigate();

  return (
    <div className="vote-home-container">
      <div className="vote-home-header">
        <h3>Votes</h3>
        <button className="vote-dropdown-button">Last Year ▼</button>
      </div>
      <div className="vote-cards-container">
        <VoteCard data={troopNames} title="Best Troop" navigate={navigate} />
        <VoteCard data={heroNames} title="Best Hero" navigate={navigate} />
        <VoteCard data={petNames} title="Best Pet" navigate={navigate} />
        <VoteCard
          data={heroequipmentNames}
          title="Best Hero Equipment"
          navigate={navigate}
        />
        <VoteCard data={spellNames} title="Best Spell" navigate={navigate} />
        <VoteCard
          data={superTroopNames}
          title="Best Super Troop"
          navigate={navigate}
        />
        <VoteCard
          data={siegeNames}
          title="Best Siege Machine"
          navigate={navigate}
        />
      </div>
    </div>
  );
}

function VoteCard({ data, title, navigate }) {
  return (
    <button className="vote-card" onClick={() => navigate(`/post`)}>
      <div className="vote-card-header">
        <h5>{title}</h5>
        <FaArrowRightLong />
      </div>
      <div className="vote-card-body">
        {data.slice(0, 3).map((unit, key) => {
          return <CandidateRow name={unit} key={key} />;
        })}
        <div className="vote-card-footer">
          <p>Votes:219</p>
          <p>Comments:46</p>
        </div>
      </div>
    </button>
  );
}

function CandidateRow({ name, key }) {
  const labelName = name.replace('_', ' ');

  return (
    <div className="candidate-row" key={key}>
      <RetrieveImage name={name} />
      <div className="candidate-row-body">
        <div className="candidate-progress-bar-label">
          <p className="candidate-percentage">33%</p>
          <p className="candidate-name">{labelName}</p>
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
