import { usernameCheck } from './processInputs';

export async function updateAccountSettings(
  settingsData,
  accountData,
  setSettingChanges,
  showAlert,
  setUserData
) {
  let changed = false;

  const updateSetting = async (key, accountKey, updateFunction, userKey) => {
    if (settingsData[key] && settingsData[key] !== accountData[accountKey]) {
      const success = await updateFunction(settingsData[key], showAlert);
      if (success) {
        setUserData((prev) => ({
          ...prev,
          [userKey]: settingsData[key],
        }));
        changed = true;
      }
      setSettingChanges((prev) => ({
        ...prev,
        [key]: '',
      }));
    }
  };

  await Promise.all([
    updateSetting('character', 'character', changeCharacter, 'pfpCharacter'),
    updateSetting('color', 'pfpColor', changeColor, 'pfpColor'),
  ]);

  if (changed) {
    showAlert('Account settings have been changed', 'success');
  }
}

export async function updateUsernameSettings(
  username,
  accountData,
  setSettingChanges,
  showAlert,
  setUserData
) {
  if(username === '') {
    showAlert('Input field was left empty', 'error')
    return;
  }

  if(!usernameCheck(username, showAlert)) {
    return;
  }

  let changed = false;

  const success = await changeUsername(username, showAlert);

  if (success) {
    setUserData((prev) => ({
      ...prev,
      username: username,
    }));
    changed = true;
  }
  setSettingChanges((prev) => ({
    ...prev,
    username: '',
  }));

  if (changed) {
    showAlert('Account settings have been changed', 'success');
  }
}

export async function changeUsername(username, showAlert) {
  const token = localStorage.getItem('token');

  if (!token) {
    showAlert(
      'Authentication error: No token found, please logout and try again',
      'error'
    );
    return false;
  }

  try {
    const response = await fetch(`http://localhost:3001/api/user/username`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ username: username }),
    });

    const responseData = await response.json();

    if (response.ok) {
      return true;
    } else {
      showAlert(
        responseData.message ||
          'Username change was unsuccessful, please try again',
        'error'
      );
      return false;
    }
  } catch (error) {
    console.log('Error: ', error);
    showAlert('Something went wrong. Please try again later.', 'error');
    return false;
  }
}

export async function changeCharacter(character, showAlert) {
  const token = localStorage.getItem('token');

  if (!token) {
    showAlert(
      'Authentication error: No token found, please logout and try again',
      'error'
    );
    return false;
  }

  try {
    const response = await fetch(`http://localhost:3001/api/user/character`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ character: character }),
    });

    const responseData = await response.json();

    if (response.ok) {
      return true;
    } else {
      showAlert(
        responseData.message ||
          'PFP character change was unsuccessful, please try again',
        'error'
      );
      return false;
    }
  } catch (error) {
    console.log('Error: ', error);
    showAlert('Something went wrong. Please try again later.', 'error');
    return false;
  }
}

export async function changeColor(color, showAlert) {
  const token = localStorage.getItem('token');

  if (!token) {
    showAlert(
      'Authentication error: No token found, please logout and try again',
      'error'
    );
    return false;
  }

  try {
    const response = await fetch(`http://localhost:3001/api/user/color`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ color: color }),
    });

    const responseData = await response.json();

    if (response.ok) {
      return true;
    } else {
      showAlert(
        responseData.message ||
          'PFP color change was unsuccessful, please try again',
        'error'
      );
      return false;
    }
  } catch (error) {
    console.log('Error: ', error);
    showAlert('Something went wrong. Please try again later.', 'error');
    return false;
  }
}

export async function changeEmail(currentPassword, newEmail, showAlert) {
  const token = localStorage.getItem('token');
  if (!token) {
    showAlert(
      'Authentication error: No token found, please logout and try again',
      'error'
    );
    return false;
  }

  try {
    const response = await fetch(`http://localhost:3001/api/user/email`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        currentPassword: currentPassword,
        newEmail: newEmail,
      }),
    });

    const responseData = await response.json();

    if (response.ok) {
      showAlert('Email was changed', 'success');
      return true;
    } else {
      showAlert(
        responseData.message ||
          'Email change was unsuccessful, please try again',
        'error'
      );
      return false;
    }
  } catch (error) {
    console.log('Error: ', error);
    showAlert('Something went wrong. Please try again later.', 'error');
    return false;
  }
}

export async function changePassword(currentPassword, newPassword, showAlert) {
  const token = localStorage.getItem('token');
  if (!token) {
    showAlert(
      'Authentication error: No token found, please logout and try again',
      'error'
    );
    return false;
  }

  try {
    const response = await fetch(`http://localhost:3001/api/user/password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        currentPassword: currentPassword,
        newPassword: newPassword,
      }),
    });

    const responseData = await response.json();

    if (response.ok) {
      showAlert('Password was changed', 'success');
      return true;
    } else {
      showAlert(
        responseData.message ||
          'Password change was unsuccessful, please try again',
        'error'
      );
      return false;
    }
  } catch (error) {
    console.log('Error: ', error);
    showAlert('Something went wrong. Please try again later.', 'error');
    return false;
  }
}

export async function saveUnit(type, name, tag, icon, showAlert) {
  const token = localStorage.getItem('token');
  if (!token) {
    showAlert(
      'Authentication error: No token found, please logout and try again',
      'error'
    );
    return false;
  }
  
  try {
    const response = await fetch(
      `http://localhost:3001/api/interaction/saves/${type}/${tag}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: name, icon: icon }),
      }
    );

    const responseData = await response.json();

    if (response.ok) {
      showAlert(`The ${type} has been saved to your account`, 'success');
      return true;
    } else {
      if (responseData.message) {
        showAlert(responseData.message, 'info');
      } else {
        showAlert(
          `The ${type} was not able to be saved to your account, please try again later`,
          'info'
        );
      }
      return false;
    }
  } catch (error) {
    console.log('Error: ', error);
    showAlert('Something went wrong. Please try again later.', 'error');
    return false;
  }
}

export async function unsaveUnit(type, tag, showAlert, setUserData) {
  const token = localStorage.getItem('token');
  if (!token) {
    showAlert(
      'Authentication error: No token found, please logout and try again',
      'error'
    );
    return false;
  }

  try {
    const response = await fetch(
      `http://localhost:3001/api/interaction/saves/${type}/${tag}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const responseData = await response.json();

    if (response.ok) {
      showAlert('Unit was unsaved', 'success');
      if (type === 'player') {
        setUserData((prevState) => ({
          ...prevState,
          favoritePlayers: prevState.favoritePlayers.filter(
            (player) => player.tag !== tag
          ),
        }));
      } else if (type === 'clan') {
        setUserData((prevState) => ({
          ...prevState,
          favoriteClans: prevState.favoriteClans.filter(
            (clan) => clan.tag !== tag
          ),
        }));
      }
      return true;
    } else {
      showAlert(
        responseData.message ||
          'Unit unsave was unsuccessful, please try again',
        'error'
      );
      return false;
    }
  } catch (error) {
    console.log('Error: ', error);
    showAlert('Something went wrong. Please try again later.', 'error');
    return false;
  }
}

export const fetchUserData = async (navigate, showAlert, setUserData) => {
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
    console.log(err);
  }
};
