import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAlert } from '../../util/AlertContext';
import { usernameCheck } from '../../util/validateAuth';
import { changeUsername, changeCharacter } from '../../util/updateUserInfo';
import { fetchUserData } from '../../util/getUserData';
import useImage from '../../util/images/useImage';
import { troopNames } from '../../util/images/imageCategories';

function logoutUser(navigate, showAlert) {
  localStorage.removeItem('token');
  navigate('/auth');
  showAlert('You have been logged out', 'info');
}

export default function Account({}) {
  const { tab } = useParams();
  const navigate = useNavigate();
  const bodyContent = tab || 'saves';
  const { showAlert } = useAlert();

  const [userData, setUserData] = useState(null);

  const [settingChanges, setSettingChanges] = useState({
    username: '',
    color: '',
    character: '',
  });

  const accountChanges = (settingsData, accountData) => {
    const token = localStorage.getItem('token');

    // USERNAME CHANGE
    if (settingsData.username === '') {
      console.log('error changing username0');
    } else if (settingsData.username !== accountData.username) {
      if (usernameCheck(settingsData, showAlert)) {
        if (changeUsername(settingsData, showAlert, token)) {
          setUserData((prev) => ({
            ...prev,
            username: settingsData.username,
          }));
          setSettingChanges((prev) => ({
            ...prev,
            username: '',
          }));
        } else {
          console.warn('error changing username');
        }
      } else {
        console.warn('error changing username2');
      }
    } else {
      console.log('error changing username3');
    }

    //PFP CHARACTER CHANGE
    if (settingsData.character !== accountData.character) {
      if (changeCharacter(settingsData, showAlert, token)) {
        setUserData((prev) => ({
          ...prev,
          character: settingsData.character,
        }));
        setSettingChanges((prev) => ({
          ...prev,
          character: '',
        }));
      } else {
        console.warn('error changing username');
      }
    } else {
      console.log('you already have the character u entered');
    }
  };

  useEffect(() => {
    fetchUserData(navigate, showAlert, setUserData);
  }, []);

  function GetPFP({ name, bgcolor }) {
    const imageSrc = useImage(name);

    return (
      <div id="account-pfp-container" style={{ backgroundColor: bgcolor }}>
        <img src={imageSrc} id="account-pfp" alt="" />
      </div>
    );
  }

  if (!userData) return <div>Loading...</div>;

  return (
    <div id="account-container">
      <div className="account-tab">
        <div id="account-header">
          <GetPFP name={userData.pfpCharacter} bgcolor={userData.pfpColor} />
          <h3 id="account-username">
            {userData ? userData.username : '...loading'}
          </h3>
        </div>
        <div id="account-body">
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
          <div id="account-content">
            {bodyContent === 'saves' ? (
              <SavedContent />
            ) : bodyContent === 'votes' ? (
              <VotesContent />
            ) : bodyContent === 'comments' ? (
              <CommentsContent />
            ) : (
              <SettingsContent
                logoutUser={logoutUser}
                navigate={navigate}
                showAlert={showAlert}
                settingChanges={settingChanges}
                setSettingChanges={setSettingChanges}
                accountChanges={accountChanges}
                userData={userData}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SavedContent({}) {
  return (
    <div className="account-content-tab">
      <h5>Saves</h5>
      <p></p>
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
  logoutUser,
  navigate,
  showAlert,
  settingChanges,
  setSettingChanges,
  accountChanges,
  userData,
}) {
  const pfpColors = [
    'white',
    'red',
    'tomato',
    'orangered',
    'lightcoral',
    'chocolate',
    'gold',
    'peachpuff',
    'lime',
    'palegreen',
    'mediumspringgreen',
    'cyan',
    'dodgerblue',
    'blue',
    'midnightblue',
    'plum',
    'magenta',
    'slategray',
    'darkslategray',
    'black',
  ];

  const onColorChange = (color) => {
    setSettingChanges((prev) => ({
      ...prev,
      color: color,
    }));
  };

  const onCharacterChange = (character) => {
    setSettingChanges((prev) => ({
      ...prev,
      character: character,
    }));
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
      </div>
      <div className="account-settings-buttons">
        <button
          className="standard-btn"
          onClick={() => accountChanges(settingChanges, userData)}
        >
          Save
        </button>
        <button
          className="standard-btn"
          onClick={() => logoutUser(navigate, showAlert)}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
