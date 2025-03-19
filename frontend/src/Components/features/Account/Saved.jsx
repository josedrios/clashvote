import { IoClose } from 'react-icons/io5';
import { unsaveUnit } from '../../../util/accountUtils';

export function SavedContent({ userData, navigate, showAlert, setUserData }) {
  return (
    <div className="account-content-tab saved-container">
      <div className="saved-container-tab">
        <div className="saved-container-header">
          <h5>Players</h5>
          {/* <p>({userData.favoritePlayers.length})</p> */}
        </div>
        {userData.favoritePlayers.length === 0 ? (
          <div className='none-saved-card'>No saves yet</div>
        ) : (
          userData.favoritePlayers.map((player, key) => (
            <div className="saved-card-row" key={key}>
              <div
                className="saved-card"
                onClick={() => navigate(`/search/player/${player.tag}`)}
              >
                <div className="saved-card-header">
                  <p>{player.name}</p>
                  <img src={player.icon} alt="" />
                </div>
                <div className="saved-card-footer">
                  <p>#{player.tag}</p>
                </div>
              </div>
              <IoClose
                className="saved-card-trash"
                onClick={() =>
                  unsaveUnit('player', player.tag, showAlert, setUserData)
                }
              />
            </div>
          ))
        )}
      </div>
      <div className="saved-container-tab">
        <div className="saved-container-header">
          <h5>Clans</h5>
          {/* <p>({userData.favoriteClans.length})</p> */}
        </div>
        {userData.favoriteClans.length === 0 ? (
          <div className='none-saved-card'>No saves yet</div>
        ) : (
          userData.favoriteClans.map((clan, key) => (
            <div className="saved-card-row" key={key}>
              <div
                className="saved-card"
                onClick={() => navigate(`/search/clan/${clan.tag}`)}
              >
                <div className="saved-card-header">
                  <p>{clan.name}</p>
                  <img src={clan.icon} alt="" />
                </div>
                <div className="saved-card-footer">
                  <p>#{clan.tag}</p>
                </div>
              </div>
              <IoClose
                className="saved-card-trash"
                onClick={() =>
                  unsaveUnit('clan', clan.tag, showAlert, setUserData)
                }
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
