import PlayerData from '../../../../util/processPlayerData';
import PlayerMain from './PlayerMain';
import PlayerBase from './PlayerBase';
import Achievements from './PlayerAchievements';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useImage from '../../../../util/images/useImage';

function SearchResult({ playerData }) {
  const navigate = useNavigate();

  const handleClanInfo = (clan) => {
    navigate(`/search/clan/${clan}`);
  };

  const [achCurrent, setAchCurrent] = useState('home');

  const data = PlayerData(playerData);

  return (
    <div id="search-result-container">
      <div id="player-data">
        <div id="player-data-bar">
          <h3 id="player-username">{data.username}</h3>
          <LeagueIcons data={data} />
        </div>
        <div id="player-header">
          <PlayerMain data={data} />
          <div id="cards-container">
            <PlayerClan data={data} handleClanInfo={handleClanInfo} />
          </div>
        </div>
      </div>
      <div id="player-base-flex">
        <PlayerBase data={data.home} />
        <PlayerBase data={data.builder} />
      </div>
      <AchievementSection
        data={data}
        achCurrent={achCurrent}
        setAchCurrent={setAchCurrent}
      />
    </div>
  );
}

function LeagueIcons({ data }) {
  const homeLeagueIcon =
    data.home.leagueIcon === 'Unranked'
      ? useImage('unranked')
      : data.home.leagueIcon;

  const builderLeagueIcon = useImage(data.builder.league.split(' ')[0]);

  return (
    <div id="player-rank-flex">
      <img
        className="player-rank-icon"
        alt=""
        src={homeLeagueIcon}
        title={data.home.league}
      />
      <div
        id="builder-rank-container"
        className={`${data.builder.league === 'Unranked' ? 'hide' : ''}`}
      >
        <img
          className="player-rank-icon"
          id="player-bh-icon"
          src={builderLeagueIcon}
          title={data.builder.league}
          alt=""
        />
        <div id="player-bh-division">{data.builder.league.split(' ')[2]}</div>
      </div>
    </div>
  );
}

function PlayerClan({ data, handleClanInfo }) {
  return (
    <div id="player-clan">
      <div id="player-clan-info">
        <h3
          id="player-clan-title"
          onClick={() => handleClanInfo(data.clan.tag.split('#').join(''))}
        >
          {data.clan.name}
        </h3>
        <div>
          Role: <p>{data.clan.role === 'None' ? '' : data.clan.role}</p>
        </div>
        <div>
          Donated: <p>{data.clan.donated}</p>
        </div>
        <div>
          Received: <p>{data.clan.received}</p>
        </div>
      </div>
      <div id="player-clan-image">
        <img id="player-clan-badge" src={data.clan.badge} alt="" />
      </div>
    </div>
  );
}

function AchievementSection({ data, achCurrent, setAchCurrent }) {
  return (
    <>
      <div id="ach-toggle-header">
        <h3 id="general-ach-header">Achievements</h3>
        <div id="ach-toggle-btns">
          <button
            className={`ach-btn ${
              achCurrent === 'home' ? 'ach-btn-selected' : ''
            }`}
            onClick={() => setAchCurrent('home')}
          >
            Home
          </button>
          <button
            className={`ach-btn ${
              achCurrent === 'builder' ? 'ach-btn-selected' : ''
            }`}
            onClick={() => setAchCurrent('builder')}
          >
            Builder
          </button>
        </div>
      </div>
      {data && (
        <>
          <Achievements
            achievements={data.home?.achievements || []}
            base={'home'}
            achCurrent={achCurrent}
          />
          <Achievements
            achievements={data.builder?.achievements || []}
            base={'builder'}
            achCurrent={achCurrent}
          />
        </>
      )}
    </>
  );
}

export default SearchResult;
