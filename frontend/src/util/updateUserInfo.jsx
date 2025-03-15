import { jwtDecode } from 'jwt-decode';
import { usernameCheck } from './validateAuth';

export async function changeAccount(settingsData, accountData, setSettingChanges, showAlert, setUserData){
  const token = localStorage.getItem('token');
      var changed = false;
  
      if (
        settingsData.username !== accountData.username &&
        settingsData.username !== ''
      ) {
        if (usernameCheck(settingsData, showAlert)) {
          if (changeUsername(settingsData, showAlert, token)) {
            setUserData((prev) => ({
              ...prev,
              username: settingsData.username,
            }));
            setSettingChanges((prev) => ({
              ...prev,
              username: '',
            }));
            changed = true;
          } else {
            return;
          }
        } else {
          return;
        }
      } else {
        setSettingChanges((prev) => ({
          ...prev,
          username: '',
        }));
      }
  
      if (
        settingsData.character !== accountData.character &&
        settingsData.character !== ''
      ) {
        if (changeCharacter(settingsData, showAlert, token)) {
          setUserData((prev) => ({
            ...prev,
            pfpCharacter: settingsData.character,
          }));
          setSettingChanges((prev) => ({
            ...prev,
            character: '',
          }));
          changed = true;
        } else {
          return;
        }
      } else {
        setSettingChanges((prev) => ({
          ...prev,
          character: '',
        }));
      }
  
      if (
        settingsData.color !== accountData.pfpColor &&
        settingsData.color !== ''
      ) {
        if (changeColor(settingsData, showAlert, token)) {
          setUserData((prev) => ({
            ...prev,
            pfpColor: settingsData.color,
          }));
          setSettingChanges((prev) => ({
            ...prev,
            color: '',
          }));
        } else {
          return;
        }
      } else {
        setSettingChanges((prev) => ({
          ...prev,
          color: '',
        }));
      }
  
      if (changed === true) {
        showAlert('Account settings have been changed', 'success');
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
      `http://localhost:3001/api/user/${userId}/username`,
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
      showAlert('Username was changed', 'success');
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
      showAlert('PFP character was changed', 'success');
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
      showAlert('PFP color was changed', 'success');
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
      showAlert(
        responseData.message ||
          `The ${type} was not able to be saved to your account, please try again later`,
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