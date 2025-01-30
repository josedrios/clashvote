import images from "../features/Images";
import Data from "../../general_data.json";
const getImage = (name) => images[name.replace(/[ .]/g, "_")] || null;
import { FaEllipsisVertical } from "react-icons/fa6";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { MdOutlineChat } from "react-icons/md";

// TEMPORARY (FOR COMMENT VOTE VALUES)
function randomValue(bot, top) {
    return Math.floor(Math.random() * (top - bot + 1)) + bot;
}

function Season() {
    return (
        <div id="season-container">
            <h3 id="season-header">Season {randomValue(1,20)}</h3>
            <div id="voting-dashboard">
                <VoteComponent object={Data.heroes} title={"Hero"} />
                <VoteComponent object={Data.troops} title={"Troop"} />
                <VoteComponent object={Data.spells} title={"Spell"} />
                <VoteComponent object={Data.heroEquipment} title={"Hero Eq."} />
            </div>
        </div>
    );
}

export default Season;

function VoteComponent({ object, title }) {
    const comments = [
        ["Jose", "This is a testing comment"],
        ["Eric", "I am testing the UI of my comment section"],
        ["Anna", "Loving this new feature!"],
    ];
    return (
        <div className="vote-component-container">
            <div className="vote-component-header">
                <h3>Best {title}</h3>
                <button className="vote-btn standard-btn">Vote</button>
            </div>
            <div className="multiple-candidate-container">
                {object.slice(0, 3).map((candidate, key) => (
                    <div className="candidate-container" key={key}>
                        <img
                            className="candidate-image"
                            src={getImage(candidate.name)}
                            alt=""
                        />
                        <div className="candidate-info">
                            <h4>{candidate.name}</h4>
                            <div className="candidate-vote-bar">
                                <div className="fill-bar" />
                            </div>
                            <div className="candidate-stats">
                                <h5>{randomValue(1,100)}%</h5>
                                <h5>{randomValue(1,11)}k votes</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <CommentSection comments={comments} />
        </div>
    );
}

function CommentSection({ comments }) {
    return (
        <div className="comment-section">
            <div className="comments-container">
                <h3>
                    Comments<p>({randomValue(1,800)})</p>
                </h3>
                <div className="create-comment">
                    <input
                        className="comment-input-field"
                        type="text"
                        placeholder="Type your comment here..."
                    />
                    <div className="create-comment-actions">
                        <button className="cancel-comment-btn standard-btn">
                            Cancel
                        </button>
                        <button className="create-comment-btn standard-btn">
                            Comment
                        </button>
                    </div>
                </div>
                {comments.map(([username, comment], index) => (
                    <Comment
                        username={username}
                        comment={comment}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
}

function Comment({ username, comment }) {
    return (
        <div className="comment">
            <div className="comment-pfp-container">
                <img
                    className="comment-pfp"
                    src={getImage("Sneaky Goblin")}
                    alt=""
                />
            </div>
            <div className="comment-info">
                <div className="comment-top-bar">
                    <h4 className="comment-writer">{username}</h4>
                    <button className="comment-misc-btn">
                        <FaEllipsisVertical className="ellipsis-icon" />
                    </button>
                </div>
                <div className="comment-content">{comment}</div>
                <div className="comment-actions">
                    <div className="react-btn-count">
                        <button className="comment-reaction-btn like-btn">
                            <FaArrowUp />
                            <p>{randomValue(1,1000)}</p>
                        </button>
                    </div>
                    <div className="react-btn-count">
                        <button className="comment-reaction-btn dislike-btn">
                            <FaArrowDown />
                            <p>{randomValue(1,300)}</p>
                        </button>
                    </div>
                    <button className="comment-reply-btn">
                        <MdOutlineChat className="reply-icon" />
                        <p>Reply</p>
                    </button>
                </div>
            </div>
        </div>
    );
}
