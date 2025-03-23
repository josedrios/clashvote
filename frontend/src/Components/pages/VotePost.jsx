import { useState, useEffect } from 'react';
import { troopNames } from '../../util/images/imageCategories';
import useImage from '../../util/images/useImage';
import { CandidateRow } from './VoteHome';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';
import { VscEllipsis } from 'react-icons/vsc';
import { useParams } from 'react-router-dom';
import { getPostData } from '../../util/postUtils';
import { useAlert } from '../../util/AlertContext';

export default function VotePost() {
  const { postId } = useParams();
  const { showAlert } = useAlert();
  const [postData, setPostData] = useState('');

  useEffect(() => {
    getPostData(postId, setPostData, showAlert);
  }, []);

  if (postData === '') {
    return <div>loading...</div>;
  }

  return (
    <div className="vote-post-container">
      <div className="vote-result-container">
        <button className="vote-time-dropdown">All Time ▼</button>
        <div className="vote-result-units">
          {postData.candidates?.map((unit, key) => (
            <CandidateRow name={unit.name} key={key} voteCount="Vote Count" />
          ))}
        </div>
      </div>
      <div className="vote-content-container">
        <div className="vote-post-header">
          <h5>{postData.title}</h5>
          <div className="vote-voting-section">
            <button className="vote-choice-dropdown">Choose Unit ▼</button>
            <button className="vote-confirm-button">Vote</button>
          </div>
        </div>
        <button className="view-comments standard-btn">View Comments</button>
        <CommentSection />
      </div>
    </div>
  );
}

function CommentSection() {
  return (
    <div className="vote-post-comment-section">
      <div className="create-comment">
        <input
          type="text"
          className="create-comment-input"
          placeholder="Add comment..."
        />
        <button className="post-comment standard-btn">Comment</button>
      </div>
      <div className="comment-section">
        <div className="comment-section-header">
          <h5>Comments</h5>
          <div className="comment-count">(0)</div>
          <button className="comment-sort-dropdown">Most Recent</button>
        </div>
        <div className="comments-container">
          <CommentCard />
          <CommentCard />
          <CommentCard />
        </div>
      </div>
    </div>
  );
}

function CommentCard() {
  return (
    <div className="comment-card">
      <RetrieveImage name="Archer" classname="comment-pfp" />
      <div className="comment-body">
        <div className="comment-header">
          <h5>Username</h5>
          <p>53 min</p>
        </div>
        <div className="comment-content">
          This is the content of a comment and it is for testing purposes.
        </div>
        <div className="comment-footer">
          <div>
            <FaArrowUp />
            <p>25</p>{' '}
          </div>
          <div>
            <FaArrowDown />
            <p>3</p>
          </div>
          <button className="comment-reply-button">Reply</button>
          <button className="comment-misc-button">
            <VscEllipsis />
          </button>
        </div>
      </div>
    </div>
  );
}

function RetrieveImage({ name, classname }) {
  const imageSrc = useImage(name);

  return (
    <img
      src={imageSrc}
      className={classname}
      title={name.toUpperCase()}
      alt=""
    />
  );
}
