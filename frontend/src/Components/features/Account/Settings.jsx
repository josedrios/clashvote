import { useState } from 'react';
import {
  troopNames,
  superTroopNames,
  petNames,
  heroNames,
  pfpColors,
} from '../../../util/images/imageCategories';
import useImage from '../../../util/images/useImage';
import { passwordCheck, emailCheck } from '../../../util/processInputs';
import {
  changePassword,
  changeEmail,
  updateUsernameSettings,
  updateAccountSettings,
} from '../../../util/accountUtils';

export function SettingsContent({ showAlert, userData, setUserData }) {
  const [settingChanges, setSettingChanges] = useState({
    username: '',
    color: '',
    character: '',
  });

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

  return (
    <div className="account-content-tab account-settings-tab">
      <ChangeForms
        showAlert={showAlert}
        passwordChange={changePassword}
        emailChange={changeEmail}
      />
      <h5 id="account-username-change-header">Change Username</h5>
      <label
        id="account-username-change-label"
        htmlFor="account-username-change"
      >
        New username:
      </label>
      <input
        id="account-username-change"
        type="text"
        placeholder={userData ? userData.username : ''}
        value={settingChanges.username}
        onChange={(e) =>
          setSettingChanges((prev) => ({
            ...prev,
            username: e.target.value,
          }))
        }
      />
      <div className="username-change-btn-container">
        <button
          className="standard-btn confirm-username-change"
          onClick={(e) => {
            e.preventDefault();
            updateUsernameSettings(
              settingChanges.username,
              userData,
              setSettingChanges,
              showAlert,
              setUserData
            );
          }}
        >
          Save
        </button>
      </div>
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
        <CharacterOptions
          units={troopNames}
          settingChanges={settingChanges}
          onCharacterChange={onCharacterChange}
        />
        <CharacterOptions
          units={superTroopNames}
          settingChanges={settingChanges}
          onCharacterChange={onCharacterChange}
        />
        <CharacterOptions
          units={petNames}
          settingChanges={settingChanges}
          onCharacterChange={onCharacterChange}
        />
        <CharacterOptions
          units={heroNames}
          settingChanges={settingChanges}
          onCharacterChange={onCharacterChange}
        />
      </div>
      <div className="account-settings-pfp-footer">
        <div className='pfp-preview-layer'>
          <p>Preview:</p>
          <PFPPreview
            previewCharacter={settingChanges.character}
            currentCharacter={userData.pfpCharacter}
            previewColor={settingChanges.color}
            currentColor={userData.pfpColor}
          />
        </div>
        <button
          className="standard-btn"
          onClick={() =>
            updateAccountSettings(
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

function PFPPreview({
  previewCharacter,
  currentCharacter,
  previewColor,
  currentColor,
}) {
  const imageSrc = useImage(
    previewCharacter === '' ? currentCharacter : previewCharacter
  );

  return (
    <div
      className="pfp-preview-container"
      style={{
        backgroundColor: previewColor === '' ? currentColor : previewColor,
      }}
    >
      <img className="pfp-preview" src={imageSrc} alt="" />
    </div>
  );
}

function CharacterOptions({
  units,
  settingChanges,
  onCharacterChange,
}) {
  return (
    <>
      {units.map((troop, key) => {
        return (
          <button
            className="character-option"
            onClick={() => onCharacterChange(troop)}
            title={troop}
            key={key}
            style={{
              outline:
                settingChanges.character === troop ? '1px solid white' : 'none',
            }}
          >
            <RetrieveImage name={troop}/>
          </button>
        );
      })}
    </>
  );
}

function RetrieveImage({ name }) {
  const imageSrc = useImage(name);

  return <img src={imageSrc} alt="" />;
}

function ChangeForms({ showAlert, passwordChange, emailChange }) {
  const [pwChanges, setPWChanges] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const [emailChanges, setEmailChanges] = useState({
    currentPassword: '',
    newEmail: '',
  });

  const changePassword = (pwChanges, setPWChanges, showAlert) => {
    if (pwChanges.currentPassword === '' || pwChanges.newPassword === '') {
      showAlert('An input field was left empty', 'error');
      return;
    }

    if (!passwordCheck(pwChanges.newPassword, showAlert)) {
      return;
    }

    if (
      passwordChange(
        pwChanges.currentPassword,
        pwChanges.newPassword,
        showAlert
      )
    ) {
      setPWChanges({
        currentPassword: '',
        newPassword: '',
      });
    }
  };

  const changeEmail = (emailChanges, setEmailChanges, showAlert) => {
    if (emailChanges.currentPassword === '' || emailChanges.newEmail === '') {
      showAlert('An input field was left empty', 'error');
      return;
    }

    if (!emailCheck(emailChanges.newEmail, showAlert)) {
      return;
    }

    if (
      emailChange(
        emailChanges.currentPassword,
        emailChanges.newEmail,
        showAlert
      )
    ) {
      setEmailChanges({
        currentPassword: '',
        newEmail: '',
      });
    }
  };

  return (
    <div id="account-settings-forms-container">
      <form
        action=""
        className="account-settings-form"
        id="password-change-form"
      >
        <h5>Change Password</h5>
        <label htmlFor="current-password">Current password:</label>
        <input
          id="current-password"
          placeholder="Current Password"
          type="password"
          value={pwChanges.currentPassword}
          onChange={(e) =>
            setPWChanges((prev) => ({
              ...prev,
              currentPassword: e.target.value,
            }))
          }
        />
        <label htmlFor="new-password">New password:</label>
        <input
          id="new-password"
          placeholder="New Password"
          type="password"
          value={pwChanges.newPassword}
          onChange={(e) =>
            setPWChanges((prev) => ({
              ...prev,
              newPassword: e.target.value,
            }))
          }
        />
        <button
          className="standard-btn account-form-button"
          onClick={(e) => {
            e.preventDefault();
            changePassword(pwChanges, setPWChanges, showAlert);
          }}
        >
          Save
        </button>
      </form>
      <form action="" className="account-settings-form" id="email-change-form">
        <h5>Change Email</h5>
        <label htmlFor="current-password-for-email">Current password:</label>
        <input
          id="current-password-for-email"
          placeholder="Current Password"
          type="password"
          value={emailChanges.currentPassword}
          onChange={(e) =>
            setEmailChanges((prev) => ({
              ...prev,
              currentPassword: e.target.value,
            }))
          }
        />
        <label htmlFor="current-email">New email:</label>
        <input
          id="current-email"
          placeholder="Current Email"
          type="email"
          value={emailChanges.newEmail}
          onChange={(e) =>
            setEmailChanges((prev) => ({
              ...prev,
              newEmail: e.target.value,
            }))
          }
        />
        <button
          className="standard-btn account-form-button"
          onClick={(e) => {
            e.preventDefault();
            changeEmail(emailChanges, setEmailChanges, showAlert);
          }}
        >
          Save
        </button>
      </form>
    </div>
  );
}
