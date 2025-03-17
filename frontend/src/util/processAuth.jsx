import { fetchUserData } from "./getUserData";

export async function processRegister(formData, navigate, showAlert, setUserData) {
  const { username, email, password } = formData;

  try {
    const response = await fetch('http://localhost:3001/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('User has been registered');
      if (data.token) {
        localStorage.setItem('token', data.token);
        fetchUserData(navigate, showAlert, setUserData);
      } else {
        showAlert(
          data.message || 'Registration failed, no token given',
          'error'
        );
      }
      tempPageChange(navigate, showAlert);
    } else {
      showAlert(data.message || 'Registration failed', 'error');
    }
  } catch (error) {
    console.log('Error: ', error);
    showAlert('Something went wrong. Please try again later.', 'error');
  }
}

export async function processLogin(formData, navigate, showAlert, setUserData) {
  const { email, password } = formData;

  try {
    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      if (data.token) {
        localStorage.setItem('token', data.token);
        fetchUserData(navigate, showAlert, setUserData);
      } else {
        showAlert(
          data.message || 'Login failed, no token given',
          'error'
        );
      }
      console.log('User has logged in');
      tempPageChange(navigate, showAlert);
    } else {
      showAlert(data.message || 'Login failed', 'error');
    }
  } catch (error) {
    console.log('Error: ', error);
    showAlert('Something went wrong. Please try again.', 'error');
  }
}

function tempPageChange(navigate, showAlert) {
  const token = localStorage.getItem('token');
  navigate(token ? '/' : '/auth');
  showAlert('You have successfully signed in!', 'success');
}