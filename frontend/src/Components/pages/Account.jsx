import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAlert } from '../../util/AlertContext';
import { changeAccount } from '../../util/updateUserInfo';
import { fetchUserData } from '../../util/getUserData';
import useImage from '../../util/images/useImage';
import { SettingsContent } from '../features/Account/Settings';
import { SavedContent } from '../features/Account/Saved';

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
        <button
          className="standard-btn logout-narrow"
          onClick={() => {
            setUserData(null);
            logoutUser(navigate, showAlert);
          }}
        >
          Logout
        </button>
        <div id="account-header">
          <GetPFP name={userData.pfpCharacter} bgcolor={userData.pfpColor} />
          <h3 id="account-username">
            {userData ? userData.username : '...loading'}
          </h3>
          <button
            className="standard-btn logout-wide"
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
            style={{
              color: tab === 'saves' || !tab ? 'rgb(235, 222, 36)' : '',
            }}
          >
            Saves
          </button>
          <button
            className="account-body-nav-button"
            onClick={() => navigate('/account/votes')}
            style={{ color: tab === 'votes' ? 'rgb(235, 222, 36)' : '' }}
          >
            Votes
          </button>
          <button
            className="account-body-nav-button"
            onClick={() => navigate('/account/comments')}
            style={{ color: tab === 'comments' ? 'rgb(235, 222, 36)' : '' }}
          >
            Comments
          </button>
          <button
            className="account-body-nav-button"
            onClick={() => navigate('/account/settings')}
            style={{
              color: tab === 'settings' ? 'rgb(235, 222, 36)' : '',
            }}
          >
            Settings
          </button>
        </div>
        <div id="account-body">
          <div id="account-content">
            {bodyContent === 'saves' ? (
              <SavedContent userData={userData} navigate={navigate}/>
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

function VotesContent() {
  return (
    <div className="account-content-tab">populate with player's votes</div>
  );
}

function CommentsContent() {
  return (
    <div className="account-content-tab">populate with player's comments </div>
  );
}