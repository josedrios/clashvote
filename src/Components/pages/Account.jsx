import images from "../features/Images";
const getImage = (name) => images[name.replace(/[ .]/g, "_")] || null;

export default function Account({}) {
    return (
        <div className="account-container">
            <div id="account-header">
                <img src={getImage("Thrower")} id="account-pfp" alt="" />
                <h3 id="account-username">(Username)'s <span>Profile</span></h3>
            </div>
            <div id="account-body">
                <div id="account-body-nav">
                    <button className="account-body-nav-button">
                        Saved
                    </button>
                    <button className="account-body-nav-button">
                        Votes
                    </button>
                    <button className="account-body-nav-button">
                        Comments
                    </button>
                </div>
                <div id="account-content-container">
                    content
                </div>
            </div>
        </div>
    );
}
