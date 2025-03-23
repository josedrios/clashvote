import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAlert } from '../../util/AlertContext';
import { fetchUserData } from '../../util/accountUtils';
import useImage from '../../util/images/useImage';
import { SettingsContent } from '../features/Account/Settings';
import { SavedContent } from '../features/Account/Saved';

export default function Account({ userData, setUserData }) {
  const { tab } = useParams();
  const navigate = useNavigate();
  const bodyContent = tab || 'saves';
  const { showAlert } = useAlert();

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
            logoutUser(navigate, showAlert, setUserData);
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
              logoutUser(navigate, showAlert, setUserData);
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
              <SavedContent
                userData={userData}
                navigate={navigate}
                showAlert={showAlert}
                setUserData={setUserData}
              />
            ) : bodyContent === 'votes' ? (
              <VotesContent />
            ) : bodyContent === 'comments' ? (
              <CommentsContent />
            ) : (
              <>
                <SettingsContent
                  showAlert={showAlert}
                  userData={userData}
                  setUserData={setUserData}
                />
                {userData.role === 'admin' && (
                  <AdminConsole userData={userData} />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function logoutUser(navigate, showAlert, setUserData) {
  setUserData(null);
  localStorage.removeItem('token');
  navigate('/auth');
  showAlert('You have been logged out', 'info');
}

export function GetPFP({ name, bgcolor }) {
  const imageSrc = useImage(name);

  return (
    <div id="account-pfp-container" style={{ backgroundColor: bgcolor }}>
      <img src={imageSrc} id="account-pfp" alt="" />
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

function AdminConsole({ userData }) {
  return (
    <div className="admin-panel">
      <h3>Admin Panel</h3>
      <h5>Create Post</h5>
      <form className="create-post" action="">
        <div>
          <label htmlFor="">Title:</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Units:</label>
          <input type="text" />
        </div>
        <button className="standard-btn create-post-btn">Create</button>
      </form>
      <div>
        <h5 className="post-card-container-header">Current Post(s)</h5>
        <div className="admin-post-cards-container">
          <div className="admin-post-card">
            <div className="admin-post-card-header">
              <h5><span>Title: </span>Best Hero Equipment</h5>
              <p>(Hero Equipment)</p>
            </div>
            <div className="admin-post-card-footer">
              <p><span>Last Updated:</span>03-34-25 09:28 AM</p>
              <button className='standard-btn'>Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
