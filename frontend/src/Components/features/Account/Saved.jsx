import { GoBookmarkSlash } from 'react-icons/go';

export function SavedContent({ userData, navigate }) {
    return (
      <div className="account-content-tab saved-container">
        <div className="saved-container-tab">
          <h5>Players</h5>{' '}
          {userData.favoritePlayers.map((player, key) => (
            <div className="saved-card" onClick={() => navigate(`/search/player/${player.tag}`)} key={key}>
              <div className="saved-card-header">
                <p>{player.name}</p>
                <img src={player.icon} alt="" />
              </div>
              <div className="saved-card-footer">
                <p>#{player.tag}</p>
                <GoBookmarkSlash className="saved-card-trash" />
              </div>
            </div>
          ))}
        </div>
        <div className="saved-container-tab">
          <h5>Clans</h5>{' '}
          {userData.favoriteClans.map((clan, key) => (
            <div className="saved-card" onClick={() => navigate(`/search/clan/${clan.tag}`)} key={key}>
              <div className="saved-card-header">
                <p>{clan.name}</p>
                <img src={clan.icon} alt="" />
              </div>
              <div className="saved-card-footer">
                <p>#{clan.tag}</p>
                <GoBookmarkSlash className="saved-card-trash" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }