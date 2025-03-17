import { IoClose } from "react-icons/io5";
import { deleteSave } from "../../../util/updateUserInfo";

export function SavedContent({ userData, navigate, showAlert, setUserData }) {
  return (
    <div className="account-content-tab saved-container">
      <div className="saved-container-tab">
        <h5>Players</h5>{' '}
        {userData.favoritePlayers.map((player, key) => (
          <div className='saved-card-row'>
            <div
              className="saved-card"
              onClick={() => navigate(`/search/player/${player.tag}`)}
              key={key}
            >
              <div className="saved-card-header">
                <p>{player.name}</p>
                <img src={player.icon} alt="" />
              </div>
              <div className="saved-card-footer">
                <p>#{player.tag}</p>
              </div>
            </div>
            <IoClose className="saved-card-trash" onClick={() => deleteSave('player', player.tag, showAlert, setUserData)}/>
          </div>
        ))}
      </div>
      <div className="saved-container-tab">
        <h5>Clans</h5>{' '}
        {userData.favoriteClans.map((clan, key) => (
          <div className='saved-card-row'>
            <div
              className="saved-card"
              onClick={() => navigate(`/search/clan/${clan.tag}`)}
              key={key}
            >
              <div className="saved-card-header">
                <p>{clan.name}</p>
                <img src={clan.icon} alt="" />
              </div>
              <div className="saved-card-footer">
                <p>#{clan.tag}</p>
              </div>
            </div>
            <IoClose className="saved-card-trash" onClick={() => deleteSave('clan', clan.tag, showAlert, setUserData)}/>
          </div>
        ))}
      </div>
    </div>
  );
}
