import { jwtDecode } from 'jwt-decode';

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
