import images from '../features/Images';
import { useState } from 'react';
const getImage = (name) => images[name.replace(/[ .]/g, '_')] || null;
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../util/AlertContext';

function logoutUser(navigate, showAlert) {
  localStorage.removeItem('token');
  navigate('/auth');
  showAlert('You have been logged out', 'info');

}

export default function Account({}) {
  const [bodyContent, setBodyContent] = useState('saved');
  const navigate = useNavigate();
  const { showAlert } = useAlert();

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
            />
          )}
        </div>
      </div>
    </div>
  );
}

function SavedContent() {
  return <div className="account-content-page">saved</div>;
}

function VotesContent() {
  return <div className="account-content-page">votes</div>;
}

function CommentsContent() {
  return <div className="account-content-page">comments</div>;
}

function SettingsContent({ logoutUser, navigate, showAlert }) {
  return (
    <div className="account-content-page">
      <h4>Settings</h4>
      <button onClick={() => logoutUser(navigate, showAlert)}>Logout</button>
    </div>
  );
}
