import { useState, useEffect } from 'react';
import Members from '../Clan/Members';
import THOverview from './THOverview';
import { IoBookmark } from 'react-icons/io5';
import { useAlert } from '../../../../util/AlertContext';
import { saveUnit } from '../../../../util/updateUserInfo';
import { useNavigate } from 'react-router-dom';
import useImage from '../../../../util/images/useImage';

const getCWL = (name) => {
  name = name.toLowerCase().replace(' league', '');
  const tokens = name.split(' ');
  const league = tokens[0] + tokens[1].length;
  return league;
};

function RetrieveImage({ name, classname }) {
  const imageSrc = useImage(name);

  return <img src={imageSrc} className={classname} alt="" />;
}

export default function SearchResults({ clanData, fetchPlayer }) {
  const [selectedClan, setSelectedClan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  useEffect(() => {
    setError(null);
  }, [clanData]);

  const handleClanSave = (data) => {
    const token = localStorage.getItem('token');
    saveUnit(
      token,
      'clan',
      data.name,
      data.tag.split('#').join(''),
      data.badgeUrls.medium || 'Unranked',
      showAlert
    );
  };

  const handleViewClick = async (clanTag) => {
    navigate(`/search/clan/${clanTag.slice(1)}`);
  };

  if (isLoading) {
    return <p>Loading clan details...</p>;
  }

  if (selectedClan) {
    return (
      <ClanResult
        clan={selectedClan}
        fetchPlayer={fetchPlayer}
        handleClanSave={handleClanSave}
      />
    );
  }

  if (clanData.items?.length === 0) {
    return <div>No clan(s) found :(</div>;
  }

  if (clanData.tag) {
    return (
      <ClanResult
        clan={clanData}
        fetchPlayer={fetchPlayer}
        handleClanSave={handleClanSave}
      />
    );
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
              <RetrieveImage
                name={getCWL(clan.warLeague.name)}
                classname={'clan-result-cwl'}
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

function ClanResult({ clan, fetchPlayer, handleClanSave }) {
  return (
    <div className="clan-details-view">
      <div className="clan-header-details">
        <div className="clan-header-label">
          <h3>
            {clan.name}
            <button
              className="save-clan-btn"
              onClick={() => handleClanSave(clan)}
            >
              <IoBookmark />
            </button>
          </h3>
          <div>
            <img
              src={clan.badgeUrls.medium}
              classname="clan-header-badge"
              alt=""
            />
            {clan.warLeague.name.toLowerCase() !== 'unranked' && (
              <RetrieveImage
                name={getCWL(clan.warLeague.name)}
                classname={'clan-header-cwl'}
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
                <RetrieveImage name={'th_trophy'} />
                {clan.clanPoints}
              </span>
              |
              <span>
                <RetrieveImage name={'bb_trophy'} />{' '}
                {clan.clanBuilderBasePoints}
              </span>
            </p>
            <h6>Requirements:</h6>
            <p>
              <span>
                <RetrieveImage name={'th_trophy'} /> {clan.requiredTrophies}
              </span>
              |
              <span>
                <RetrieveImage name={'bb_trophy'} />{' '}
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
              {clan.warWins}/{clan.warTies || 0}/{clan.warLosses || 0}
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
