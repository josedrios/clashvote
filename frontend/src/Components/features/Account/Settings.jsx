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
import { changePassword, changeEmail } from '../../../util/accountUtils';
import { updateAccountSettings } from '../../../util/accountUtils';

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

  const getSource = (name) => {
    return useImage(name);
  };

  return (
    <div className="account-content-tab account-settings-tab">
      <ChangeForms
        showAlert={showAlert}
        passwordChange={changePassword}
        emailChange={changeEmail}
      />
      <label
        id="account-username-change-label"
        htmlFor="account-username-change"
      >
        Change Username:
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
          getSource={getSource}
        />
        <CharacterOptions
          units={superTroopNames}
          settingChanges={settingChanges}
          onCharacterChange={onCharacterChange}
          getSource={getSource}
        />
        <CharacterOptions
          units={petNames}
          settingChanges={settingChanges}
          onCharacterChange={onCharacterChange}
          getSource={getSource}
        />
        <CharacterOptions
          units={heroNames}
          settingChanges={settingChanges}
          onCharacterChange={onCharacterChange}
          getSource={getSource}
        />
      </div>
      <div className="account-settings-buttons">
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

function CharacterOptions({
  units,
  settingChanges,
  onCharacterChange,
  getSource,
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
            <img src={getSource(troop)} alt="" />
          </button>
        );
      })}
    </>
  );
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
