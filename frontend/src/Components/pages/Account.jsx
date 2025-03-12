import images from '../features/Images';
import { useState } from 'react';
const getImage = (name) => images[name.replace(/[ .]/g, '_')] || null;
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../util/AlertContext';
import { usernameCheck } from '../../util/validateAuth';
import { changeUsername } from '../../util/updateUserInfo';

function logoutUser(navigate, showAlert) {
  localStorage.removeItem('token');
  navigate('/auth');
  showAlert('You have been logged out', 'info');
}

export default function Account({}) {
  const [bodyContent, setBodyContent] = useState('saved');
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const [settingChanges, setSettingChanges] = useState({
    username: '',
    color: '',
    character: '',
  });

  const accountChanges = (data) => {
    console.log(data);
    const token = localStorage.getItem('token');
    if (data.username) {
      if (usernameCheck(data, showAlert)) {
        console.log('Username sent to be changed');
        changeUsername(data, showAlert, token);
      }
    }
    setSettingChanges((prev) => ({
      ...prev,
      username: '',
    }));
  };

  return (
    <div className="account-container">
      <div id="account-header">
        <img src={getImage('Thrower')} id="account-pfp" alt="" />
        <h3 id="account-username">1234567890123456</h3>
      </div>
      <div id="account-body">
        <div id="account-body-nav">
          <button
            className="account-body-nav-button"
            onClick={() => setBodyContent('saved')}
          >
            Saved
          </button>
          <button
            className="account-body-nav-button"
            onClick={() => setBodyContent('votes')}
          >
            Votes
          </button>
          <button
            className="account-body-nav-button"
            onClick={() => setBodyContent('comments')}
          >
            Comments
          </button>
          <button
            className="account-body-nav-button"
            onClick={() => setBodyContent('settings')}
          >
            Settings
          </button>
        </div>
        <div id="account-content">
          {bodyContent === 'saved' ? (
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
            />
          )}
        </div>
      </div>
    </div>
  );
}

function SavedContent() {
  return (
    <div className="account-content-tab">
      <h5>Saved</h5>
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

  return (
    <div className="account-content-tab account-settings-tab">
      <h5>Settings</h5>
      <label htmlFor="">Profile Picture Color:</label>
      <div className="pfp-color-options-container">
        {pfpColors.map((color) => {
          return (
            <div
              className="pfp-color-option"
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
      <label htmlFor="account-username-change">Change Username:</label>
      <input
        id="account-username-change"
        type="text"
        value={settingChanges.username}
        onChange={(e) =>
          setSettingChanges((prev) => ({
            ...prev,
            username: e.target.value,
          }))
        }
      />
      <div className="account-settings-buttons">
        <button
          className="standard-btn"
          onClick={() => accountChanges(settingChanges)}
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
