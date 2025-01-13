import images from "../feature/Images";
import Data from "../../general_data.json";
const getImage = (name) => images[name.replace(/[ .]/g, "_")] || null;

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
            <div className="create-comment"></div>
            <div className="comments-container">
                <h3>
                    Comments <p>(39)</p>
                </h3>
            </div>
        </div>
    );
}

function Comment() {
    return (
        <div>
            <div></div>
            <div className="comment-info">
                <div>
                    <h4 className="comment-writer"></h4>
                    <button className="comment-misc-button"></button>
                </div>
                <div className="comment"></div>
                <div className="comment-actions">
                    <button className="comment-reaction-button like-button"></button>
                    <button className="comment-reaction-button dislike-button"></button>
                    <button className="comment-reply-button">Reply</button>
                </div>
            </div>
        </div>
    );
}
