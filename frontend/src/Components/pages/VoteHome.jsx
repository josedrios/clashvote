import { FaArrowRightLong } from 'react-icons/fa6';
import useImage from '../../util/images/useImage';
import { useNavigate } from 'react-router-dom';
import { retrievePostList } from '../../util/postUtils';
import { useState, useEffect } from 'react';
import { useAlert } from '../../util/AlertContext';

export default function VoteHome() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const [postList, setPostList] = useState('');

  useEffect(() => {
    retrievePostList(setPostList, showAlert);
  }, []);

  return (
    <div className="vote-home-container">
      <div className="vote-home-header">
        <h3>Votes</h3>
        <button className="vote-dropdown-button">All Time ▼</button>
      </div>
      <div className="vote-cards-container">
        {postList.length > 0 ? (
          postList.map((post, key) => {
            const topCandidates = post.candidates.slice(0, 3);
            return (
              <VoteCard
                key={key}
                candidates={topCandidates}
                title={post.title}
                navigate={navigate}
                postId={post._id}
              />
            );
          })
        ) : (
          <div>loading...</div>
        )}
      </div>
    </div>
  );
}

function VoteCard({ candidates, title, navigate, postId }) {
  return (
    <button
      className="vote-card"
      onClick={() => navigate(`/post/${postId}`)}
    >
      <div className="vote-card-header">
        <h5>{title}</h5>
        <FaArrowRightLong />
      </div>
      <div className="vote-card-body">
        {candidates.map((unit, key) => {
          return <CandidateRow key={key} name={unit.name}/>;
        })}
        <div className="vote-card-footer">
          <p>Votes:219</p>
          <p>Comments:46</p>
        </div>
      </div>
    </button>
  );
}

export function CandidateRow({ name, voteCount }) {
  const labelName = name.replace('_', ' ');

  return (
    <div className="candidate-row">
      <RetrieveImage name={name} />
      <div className="candidate-row-body">
        <div className="candidate-progress-bar-label">
          <p className="candidate-percentage">33%</p>
          <p className="candidate-name">{voteCount ? voteCount : labelName}</p>
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
  const labelName = name.replace('_', ' ');

  return <img src={imageSrc} className={classname} title={labelName} alt="" />;
}
