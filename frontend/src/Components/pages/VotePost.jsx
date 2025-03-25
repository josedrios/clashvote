import { useState, useEffect } from 'react';
import useImage from '../../util/images/useImage';
import { CandidateRow } from './VoteHome';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';
import { VscEllipsis } from 'react-icons/vsc';
import { useParams } from 'react-router-dom';
import { getPostData } from '../../util/postUtils';
import { useAlert } from '../../util/AlertContext';
import { fetchComments, handleCreateComment, handleVoteComment } from '../../util/commentUtils';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

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
            <CandidateRow key={key} name={unit.name} voteCount="Vote Count" />
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
        <CommentSection showAlert={showAlert} postId={postId} />
      </div>
    </div>
  );
}

function CommentSection({ showAlert, postId }) {
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState(null);

  useEffect(() => {
    fetchComments(postId, setCommentList, showAlert);
  }, []);

  if (commentList === null) {
    return <div>loading...</div>;
  }

  const createComment = async (content, postId) => {
    if (comment === '') {
      showAlert('Comment content cannot be left empty', 'error');
      return;
    }

    if (comment.length > 500) {
      showAlert('Comment can not be longer than 500 characters', 'error');
      return;
    }

    const success = await handleCreateComment(content, postId, showAlert);
    if (success) {
      setComment('');
      fetchComments(postId, setCommentList, showAlert); // refetch updated comments
    }
    console.log(comment);
  };

  return (
    <div className="vote-post-comment-section">
      <div className="create-comment">
        <input
          type="text"
          className="create-comment-input"
          placeholder="Add comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          onClick={() => createComment(comment, postId)}
          className="post-comment standard-btn"
        >
          Comment
        </button>
      </div>
      <div className="comment-section">
        <div className="comment-section-header">
          <h5>Comments</h5>
          <div className="comment-count">(0)</div>
          <button className="comment-sort-dropdown">Most Recent</button>
        </div>
        <div className="comments-container">
          {commentList.map((comment, key) => (
            <CommentCard key={key} comment={comment} showAlert={showAlert}/>
          ))}
        </div>
      </div>
    </div>
  );
}

function CommentCard({ comment, showAlert }) {
  dayjs.extend(relativeTime);

  function timeAgo(date) {
    const diffInSeconds = dayjs().diff(dayjs(date), 'second');

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  }

  const [expanded, setExpanded] = useState(false);

  const isLong = comment.content.length > 120;
  const displayText =
    expanded || !isLong ? comment.content : comment.content.slice(0, 120) + '...';

  const commentId = comment._id;

  const [commentVotes, setCommentVotes] = useState({
    likes: comment.likes,
    dislikes: comment.dislikes
  })

  const changeVoteState = async (commentId, vote, showAlert) => {
    const voteType = await handleVoteComment(commentId, vote, showAlert);
  
    setCommentVotes(prev => {
      const updated = { ...prev };
  
      if (voteType === 'initial') {
        updated[`${vote}s`] += 1;
      } else if (voteType === 'change') {
        const opposite = vote === 'like' ? 'dislike' : 'like';
        updated[`${vote}s`] += 1;
        updated[`${opposite}s`] -= 1;
      } else if (voteType === 'remove') {
        updated[`${vote}s`] -= 1;
      }
  
      return updated;
    });
  };

  return (
    <div className="comment-card">
      <PFP
        name={comment.user.pfpCharacter}
        bg={comment.user.pfpColor}
        classname="comment-pfp"
      />
      <div className="comment-body">
        <div className="comment-header">
          <h5>{comment.user.username}</h5>
          <p>{timeAgo(comment.createdAt)}</p>
        </div>
        <div className="comment-content">
          {displayText}
          {isLong && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="read-more-btn"
            >
              {expanded ? 'Show Less' : 'Read More'}
            </button>
          )}
        </div>
        <div className="comment-footer">
          <button className='comment-vote-btn' onClick={()=> changeVoteState(commentId, 'like', showAlert)}> 
            <FaArrowUp />
            <p>{commentVotes.likes}</p>{' '}
          </button>
          <button className='comment-vote-btn' onClick={()=> changeVoteState(commentId, 'dislike', showAlert)}>
            <FaArrowDown />
            <p>{commentVotes.dislikes}</p>
          </button>
          <button className="comment-reply-button">Reply</button>
          <button className="comment-misc-button">
            <VscEllipsis />
          </button>
        </div>
      </div>
    </div>
  );
}

function PFP({ name, bg, classname }) {
  const imageSrc = useImage(name);

  return (
    <div className="comment-pfp-container" style={{ backgroundColor: bg }}>
      <img
        src={imageSrc}
        className={classname}
        title={name.toUpperCase()}
        alt=""
      />
    </div>
  );
}
