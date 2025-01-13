import images from "../feature/Images";
import Data from "../../general_data.json";
const getImage = (name) => images[name.replace(/[ .]/g, "_")] || null;
import { FaEllipsisVertical } from "react-icons/fa6";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { MdOutlineChat } from "react-icons/md";

function Season() {
    return (
        <div id="season-container">
            <h3 id="season-header">Season #??:</h3>
            <VoteComponent object={Data.heroes} title={"Heroes"} />
        </div>
    );
}

export default Season;

function VoteComponent() {
    return (
        <div>
            <Graph object={Data.heroes} title={"Heroes"} />
            <CommentSection />
        </div>
    );
}

function Graph({ object, title }) {
    return (
        <div className="vote-concept-container">
            <div className="vote-concept-header">
                <h3>{title}</h3>
                <button>Vote</button>
            </div>
            <div className="multiple-candidate-container">
                {object.map((candidate, key) => (
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
                                <h5>??%</h5>
                                <h5>??k votes</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function CommentSection() {
    return (
        <div className="comment-section">
            <div className="comments-container">
                <h3>
                    Comments<p>(39)</p>
                </h3>
                <Comment />
            </div>
        </div>
    );
}

function Comment() {
    return (
        <div className="comment">
            <div className="comment-pfp-container">
                <img className="comment-pfp" src={getImage("Minion")} alt="" />
            </div>
            <div className="comment-info">
                <div className="comment-top-bar">
                    <h4 className="comment-writer">UsernameGoesHere</h4>
                    <button className="comment-misc-button">
                        <FaEllipsisVertical className="ellipsis-icon" />
                    </button>
                </div>
                <div className="comment-content">
                    This comment is a fake comment to test the UI of my comment
                    section!?
                </div>
                <div className="comment-actions">
                    <div className="react-button-count">
                        <button className="comment-reaction-button like-button">
                            <FaArrowUp />
                            <p>617</p>
                        </button>
                  
                    </div>
                    <div className="react-button-count">
                        <button className="comment-reaction-button dislike-button">
                            <FaArrowDown />
                            <p>13</p>
                        </button>
                        
                    </div>
                    <button className="comment-reply-button">
                        <MdOutlineChat className="reply-icon"/>
                        <p>Reply</p>
                    </button>
                </div>
            </div>
        </div>
    );
}
