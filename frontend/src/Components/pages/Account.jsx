import images from '../features/Images';
import { useEffect, useState } from 'react';
const getImage = (name) => images[name.replace(/[ .]/g, '_')] || null;
import { useParams, useNavigate } from 'react-router-dom';
import { useAlert } from '../../util/AlertContext';
import { usernameCheck } from '../../util/validateAuth';
import { changeUsername } from '../../util/updateUserInfo';
import { jwtDecode } from 'jwt-decode';

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

  const accountChanges = (data) => {
    const token = localStorage.getItem('token');
    if (data.username) {
      if (usernameCheck(data, showAlert)) {
        changeUsername(data, showAlert, token);
      }
    }
    setSettingChanges((prev) => ({
      ...prev,
      username: '',
    }));
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
          showAlert('No token detected. Please logout and try again', 'error');
          return;
        }

        const response = await fetch('http://localhost:3001/api/user/account', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          showAlert('Failed to fetch user data', 'error');
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        showAlert(err.message, 'error');
      } 
    };

    fetchUserData();
  }, []);


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
  userData
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
      <label htmlFor="" className="pfp-color-label">
        Profile Picture Color:
      </label>
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
        placeholder={userData.username}
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
