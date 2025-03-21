import { troopNames } from '../../util/images/imageCategories';
import { CandidateRow } from './VoteHome';

export default function VotePost() {
  return (
    <div className="vote-post-container">
      <div className="vote-result-container">
        <button className="vote-time-dropdown">All Time ▼</button>
        <div className='vote-result-units'>
          {troopNames.map((unit, key) => (
            <CandidateRow name={unit} key={key} voteCount="Vote Count" />
          ))}
        </div>
      </div>
      <div className="vote-content-container">
        <div className="vote-post-header">Best Troop</div>
        <div className="vote-post-voting-section"></div>
        <div className="vote-post-comment-section"></div>
      </div>
    </div>
  );
}
