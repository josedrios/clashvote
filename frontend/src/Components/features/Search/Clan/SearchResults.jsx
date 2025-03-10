import { useState, useEffect } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import images from '../../Images';
import Members from '../Clan/Members';
import THOverview from './THOverview';

const getImage = (name) => images[name.replace(/[ .]/g, '_')] || null;

const getCWL = (name) => {
  name = name.toLowerCase().replace(' league', '');
  const tokens = name.split(' ');
  const league = tokens[0] + tokens[1].length;
  return league;
};

export default function SearchResults({ clanData, fetchPlayer }) {
  const [selectedClan, setSelectedClan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setSelectedClan(null);
    setError(null);
  }, [clanData]);

  const handleViewClick = async (clanTag) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getClanData(clanTag.slice(1)); // Remove '#' and fetch data
      if (data) {
        setSelectedClan(data);
      } else {
        setError('Failed to fetch clan data.');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getClanData = async (clanTag) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/clash/clans/${clanTag}`
      );

      if (response.status === 404) {
        showAlert(
          `No ${type}(s) found with the entry of '${prompt}'.`,
          'error'
        );
        throw new Error(`Clan with tag '${clanTag}' not found.`);
      } else if (!response.ok) {
        showAlert(
          `Failed to get ${type}'s data right now. Please try again later.`,
          'error'
        );
        throw new Error('Failed to fetch clan data.');
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleBackClick = () => {
    setSelectedClan(null);
  };

  if (isLoading) {
    return <p>Loading clan details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (selectedClan) {
    return (
      <ClanResult
        clan={selectedClan}
        handleBackClick={handleBackClick}
        fetchPlayer={fetchPlayer}
      />
    );
  }

  if (clanData.items?.length === 0) {
    return <div>No clan(s) found :(</div>;
  }

  if (clanData.tag) {
    return <ClanResult clan={clanData} fetchPlayer={fetchPlayer} />;
  }

  return (
    <div id="clan-results-container">
      {clanData?.items?.map((clan, key) => (
        <div className="clan-result-card" key={key}>
          <img
            className="clan-result-badge"
            src={clan.badgeUrls.medium}
            alt=""
          />
          <h5>{clan.name}</h5>
          <p className="clan-card-tag">{clan.tag}</p>
          <div className="clan-card-progress-label">
            <p>Members</p>
            <p className="clan-card-member-fraction">
              {clan.members}
              <span>/50</span>
            </p>
          </div>
          <div className="clan-card-progress-bar">
            <div
              className="clan-card-fill-bar"
              style={{ width: `${clan.members * 2}%` }}
            />
          </div>
          <div className="clan-card-footer">
            {clan.warLeague.name.toLowerCase() !== 'unranked' ? (
              <img
                className="clan-result-cwl"
                src={getImage(getCWL(clan.warLeague.name))}
                alt="Clan War League Badge"
              />
            ) : (
              <p>Unranked</p>
            )}
            <button
              className="standard-btn"
              onClick={() => handleViewClick(clan.tag)}
            >
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const warFreqFixer = (oldFreq) => {
  const freqMap = {
    never: 'Never',
    lessThanOncePerWeek: '> Weekly',
    oncePerWeek: 'Weekly',
    moreThanOncePerWeek: 'Bi-Weekly',
    always: 'Always',
  };

  return freqMap[oldFreq] || 'Unknown';
};

function ClanResult({ clan, handleBackClick, fetchPlayer }) {
  return (
    <div className="clan-details-view">
      {handleBackClick && (
        <div className="center-return-button">
          <button className="return-clan-results" onClick={handleBackClick}>
            <FaArrowLeftLong className="return-clan-results-icon" />
          </button>
        </div>
      )}
      <div className="clan-header-details">
        <div className="clan-header-label">
          <h3>{clan.name}</h3>
          <div>
            <img
              className="clan-header-badge"
              src={clan.badgeUrls.medium}
              alt=""
            />
            {clan.warLeague.name.toLowerCase() !== 'unranked' && (
              <img
                className="clan-header-cwl"
                src={getImage(getCWL(clan.warLeague.name))}
                alt=""
              />
            )}
          </div>
        </div>
      </div>
      <div className="clan-info-section">
        <div className="clan-detail-cards">
          <div className="clan-basic-card clan card">
            <p>{clan.warLeague.name}</p>
            <p>{clan.tag}</p>
            {clan.labels?.[0] && (
              <div className="clan-labels">
                <img
                  className="clan-label-image"
                  src={clan.labels[0].iconUrls.medium}
                  alt=""
                />
                {clan.labels[1] && (
                  <img
                    className="clan-label-image"
                    src={clan.labels[1].iconUrls.medium}
                    alt=""
                  />
                )}
                {clan.labels[2] && (
                  <img
                    className="clan-label-image"
                    src={clan.labels[2].iconUrls.medium}
                    alt=""
                  />
                )}
              </div>
            )}
          </div>
          <div className="clan-trophy-card clan-card">
            <h5>Trophies</h5>
            <p>
              <span>
                <img src={getImage('th_trophy')} alt="" />
                {clan.clanPoints}
              </span>
              |
              <span>
                <img src={getImage('bb_trophy')} alt="" />
                {clan.clanBuilderBasePoints}
              </span>
            </p>
            <h6>Requirements:</h6>
            <p>
              <span>
                <img src={getImage('th_trophy')} alt="" />
                {clan.requiredTrophies}
              </span>
              |
              <span>
                <img src={getImage('bb_trophy')} alt="" />
                {clan.requiredBuilderBaseTrophies}
              </span>
            </p>
          </div>
          <div className="clan-war-card clan-card">
            <h5>War</h5>
            <p>
              <span>Freq:</span>
              {warFreqFixer(clan.warFrequency)}
            </p>
            <h6>Wins|Ties|Losses</h6>
            <p>
              {clan.warWins}/{clan.warTies}/{clan.warLosses}
            </p>
          </div>
        </div>
        {clan.description !== '' && (
          <div className="clan-description">
            <h5>Description:</h5>
            <p>{clan.description}</p>
          </div>
        )}
      </div>
      <THOverview clan={clan} />
      <Members clan={clan} fetchPlayer={fetchPlayer} />
    </div>
  );
}
