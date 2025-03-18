import {
  troopNames,
  superTroopNames,
  petNames,
  heroNames,
  pfpColors,
} from '../../../util/images/imageCategories';
import useImage from '../../../util/images/useImage';

export function SettingsContent({
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
      <ChangeForms />
      <label
        id="account-username-change-label"
        htmlFor="account-username-change"
      >
        Change Username:
      </label>
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

function ChangeForms() {
  return (
    <div id="account-settings-forms-container">
      <form
        action=""
        className="account-settings-form"
        id="password-change-form"
      >
        <h5>Change Password</h5>
        <label htmlFor="">Current password:</label>
        <input
          id="current-password"
          placeholder="Current Password"
          type="password"
        />
        <label htmlFor="">New password:</label>
        <input id="new-password" placeholder="New Password" type="password" />
        <button className="standard-btn account-form-button">Save</button>
      </form>
      <form action="" className="account-settings-form" id="email-change-form">
        <h5>Change Email</h5>
        <label htmlFor="">Current password:</label>
        <input
          id="current-password-for-email"
          placeholder="Current Password"
          type="password"
        />
        <label htmlFor="">New email:</label>
        <input id="current-email" placeholder="Current Email" type="email" />
        <button className="standard-btn account-form-button">Save</button>
      </form>
    </div>
  );
}
