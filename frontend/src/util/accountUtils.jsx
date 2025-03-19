import { jwtDecode } from 'jwt-decode';
import { usernameCheck } from './processInputs';

export async function updateAccountSettings(
  settingsData,
  accountData,
  setSettingChanges,
  showAlert,
  setUserData
) {
  const token = localStorage.getItem("token");
  let changed = false;

  const updateSetting = async (key, accountKey, updateFunction, userKey) => {
    if (settingsData[key] !== accountData[accountKey] && settingsData[key] !== "") {
      if (await updateFunction(settingsData, showAlert, token)) {
        setUserData((prev) => ({
          ...prev,
          [userKey]: settingsData[key],
        }));
        changed = true;
      } else {
        return false;
      }
    }
    setSettingChanges((prev) => ({
      ...prev,
      [key]: "",
    }));
    return true;
  };

  const usernameValid = settingsData.username === accountData.username || 
    (settingsData.username !== "" && usernameCheck(settingsData.username, showAlert));

  if (!usernameValid) return;

  const updates = [
    updateSetting("username", "username", changeUsername, "username"),
    updateSetting("character", "character", changeCharacter, "pfpCharacter"),
    updateSetting("color", "pfpColor", changeColor, "pfpColor"),
  ];

  for (const update of updates) {
    if (!(await update)) return;
  }

  if (changed) {
    showAlert("Account settings have been changed", "success");
  }
}

export async function changeUsername(data, showAlert, token) {
  if (!token) {
    showAlert(
      'Authentication error: No token found, please logout and try again',
      'error'
    );
    return false;
  }

  try {
    const response = await fetch(
      `http://localhost:3001/api/user/username`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username: data.username }),
      }
    );

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

export async function changeCharacter(data, showAlert, token) {
  if (!token) {
    showAlert(
      'Authentication error: No token found, please logout and try again',
      'error'
    );
    return false;
  }

  const decodedToken = jwtDecode(token);

  const userId = decodedToken?.userId || decodedToken?.id;

  if (!userId) {
    showAlert(
      'Authentication error: User ID missing in token, try again after logging out',
      'error'
    );
    return false;
  }

  try {
    const response = await fetch(
      `http://localhost:3001/api/user/${userId}/character`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ character: data.character }),
      }
    );

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

export async function changeColor(data, showAlert, token) {
  if (!token) {
    showAlert(
      'Authentication error: No token found, please logout and try again',
      'error'
    );
    return false;
  }

  const decodedToken = jwtDecode(token);

  const userId = decodedToken?.userId || decodedToken?.id;

  if (!userId) {
    showAlert(
      'Authentication error: User ID missing in token, try again after logging out',
      'error'
    );
    return false;
  }

  try {
    const response = await fetch(
      `http://localhost:3001/api/user/${userId}/color`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ color: data.color }),
      }
    );

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

export async function saveUnit(token, type, name, tag, icon, showAlert) {
  if (!token) {
    showAlert(
      'Authentication error: No token found, please logout and try again',
      'error'
    );
    return false;
  }

  try {
    const response = await fetch(
      `http://localhost:3001/api/user/save/${type}/${tag}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: userId, name: name, icon: icon }),
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

export async function deleteSave(type, tag, showAlert, setUserData) {
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
      `http://localhost:3001/api/user/unsave/${type}/${tag}`,
      {
        method: 'PATCH',
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
    const response = await fetch(`http://localhost:3001/api/user/change/password`, {
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
    const response = await fetch(`http://localhost:3001/api/user/change/email`, {
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