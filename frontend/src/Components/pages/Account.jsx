import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAlert } from '../../util/AlertContext';
import { usernameCheck } from '../../util/validateAuth';
import { changeAccount } from '../../util/updateUserInfo';
import { fetchUserData } from '../../util/getUserData';
import useImage from '../../util/images/useImage';
import {
  troopNames,
  superTroopNames,
  petNames,
  heroNames,
  pfpColors,
} from '../../util/images/imageCategories';

function logoutUser(navigate, showAlert) {
  localStorage.removeItem('token');
  navigate('/auth');
  showAlert('You have been logged out', 'info');
}

export function GetPFP({ name, bgcolor }) {
  var imageSrc = useImage(name);

  return (
    <div id="account-pfp-container" style={{ backgroundColor: bgcolor }}>
      <img src={imageSrc} id="account-pfp" alt="" />
    </div>
  );
}

export default function Account({ userData, setUserData }) {
  const { tab } = useParams();
  const navigate = useNavigate();
  const bodyContent = tab || 'saves';
  const { showAlert } = useAlert();

  const [settingChanges, setSettingChanges] = useState({
    username: '',
    color: '',
    character: '',
  });

  const accountChanges = (
    settingsData,
    accountData,
    setSettingChanges,
    showAlert
  ) => {
    changeAccount(
      settingsData,
      accountData,
      setSettingChanges,
      showAlert,
      setUserData
    );
  };

  useEffect(() => {
    fetchUserData(navigate, showAlert, setUserData);
  }, []);

  if (!userData) return <div>Loading...</div>;

  return (
    <div id="account-container">
      <div className="account-tab">
        <div id="account-header">
          <GetPFP name={userData.pfpCharacter} bgcolor={userData.pfpColor} />
          <h3 id="account-username">
            {userData ? userData.username : '...loading'}
          </h3>
          <button
            className="standard-btn"
            onClick={() => {
              setUserData(null);
              logoutUser(navigate, showAlert);
            }}
          >
            Logout
          </button>
        </div>
        <div id="account-body-nav">
          <button
            className="account-body-nav-button"
            onClick={() => navigate('/account/saves')}
          >
            Saves
          </button>
          <button
            className="account-body-nav-button"
            onClick={() => navigate('/account/votes')}
          >
            Votes
          </button>
          <button
            className="account-body-nav-button"
            onClick={() => navigate('/account/comments')}
          >
            Comments
          </button>
          <button
            className="account-body-nav-button"
            onClick={() => navigate('/account/settings')}
          >
            Settings
          </button>
        </div>
        <div id="account-body">
          <div id="account-content">
            {bodyContent === 'saves' ? (
              <SavedContent userData={userData} />
            ) : bodyContent === 'votes' ? (
              <VotesContent />
            ) : bodyContent === 'comments' ? (
              <CommentsContent />
            ) : (
              <SettingsContent
                showAlert={showAlert}
                settingChanges={settingChanges}
                setSettingChanges={setSettingChanges}
                accountChanges={accountChanges}
                userData={userData}
                setUserData={setUserData}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SavedContent({ userData }) {
  return (
    <div className="account-content-tab">
      <h5>Saves</h5>
      Players:
      {userData.favoritePlayers.map((player, key) => (
        <div key={key}>{player.name}</div>
      ))}
      Clans:
      {userData.favoriteClans.map((clan, key) => (
        <div key={key}>{clan.name}</div>
      ))}
    </div>
  );
}

function VotesContent() {
  return (
    <div className="account-content-tab">
      <h5>Votes</h5>
    </div>
  );
}

function CommentsContent() {
  return (
    <div className="account-content-tab">
      <h5>Comments</h5>
    </div>
  );
}

function SettingsContent({
  showAlert,
  settingChanges,
  setSettingChanges,
  accountChanges,
  userData,
  setUserData,
}) {
  const onColorChange = (color) => {
    if (color === settingChanges.color) {
      setSettingChanges((prev) => ({
        ...prev,
        color: '',
      }));
    } else {
      setSettingChanges((prev) => ({
        ...prev,
        color: color,
      }));
    }
  };

  const onCharacterChange = (character) => {
    if (character === settingChanges.character) {
      setSettingChanges((prev) => ({
        ...prev,
        character: '',
      }));
    } else {
      setSettingChanges((prev) => ({
        ...prev,
        character: character,
      }));
    }
  };

  const getSource = (name) => {
    return useImage(name);
  };

  return (
    <div className="account-content-tab account-settings-tab">
      <h5>Settings</h5>{' '}
      <label htmlFor="account-username-change">Change Username:</label>
      <input
        id="account-username-change"
        type="text"
        value={settingChanges.username}
        placeholder={userData ? userData.username : ''}
        onChange={(e) =>
          setSettingChanges((prev) => ({
            ...prev,
            username: e.target.value,
          }))
        }
      />
      <label htmlFor="" className="pfp-color-label">
        Profile Picture Color:
      </label>
      <div className="pfp-color-options-container">
        {pfpColors.map((color, key) => {
          return (
            <div
              className="pfp-color-option"
              key={key}
              title={color}
              style={{
                outline:
                  settingChanges.color === color ? '1px solid white' : 'none',
              }}
            >
              <button
                onClick={() => onColorChange(color)}
                className="pfp-color"
                style={{ background: `${color}` }}
              ></button>
            </div>
          );
        })}
      </div>
      <label htmlFor="">Profile Picture Troop:</label>
      <div className="pfp-character-options-container">
        {troopNames.map((troop, key) => {
          return (
            <button
              className="character-option"
              onClick={() => onCharacterChange(troop)}
              title={troop}
              key={key}
              style={{
                outline:
                  settingChanges.character === troop
                    ? '1px solid white'
                    : 'none',
              }}
            >
              <img src={getSource(troop)} alt="" />
            </button>
          );
        })}
        {superTroopNames.map((troop, key) => {
          return (
            <button
              className="character-option"
              onClick={() => onCharacterChange(troop)}
              title={troop}
              key={key}
              style={{
                outline:
                  settingChanges.character === troop
                    ? '1px solid white'
                    : 'none',
              }}
            >
              <img src={getSource(troop)} alt="" />
            </button>
          );
        })}
        {petNames.map((troop, key) => {
          return (
            <button
              className="character-option"
              onClick={() => onCharacterChange(troop)}
              title={troop}
              key={key}
              style={{
                outline:
                  settingChanges.character === troop
                    ? '1px solid white'
                    : 'none',
              }}
            >
              <img src={getSource(troop)} alt="" />
            </button>
          );
        })}
        {heroNames.map((troop, key) => {
          return (
            <button
              className="character-option"
              onClick={() => onCharacterChange(troop)}
              key={key}
              title={troop}
              style={{
                outline:
                  settingChanges.character === troop
                    ? '1px solid white'
                    : 'none',
              }}
            >
              <img src={getSource(troop)} alt="" />
            </button>
          );
        })}
      </div>
      <div className="account-settings-buttons">
        <button
          className="standard-btn"
          onClick={() =>
            accountChanges(
              settingChanges,
              userData,
              setSettingChanges,
              showAlert,
              setUserData
            )
          }
        >
          Save
        </button>
      </div>
    </div>
  );
}
