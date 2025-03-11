export async function processRegister(formData, navigate, showAlert) {
  const { username, email, password } = formData;

  try {
    const response = await fetch('http://localhost:3001/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      tempPageChange(navigate);
    } else {
      showAlert(data.message || 'Registration failed', 'error');
    }
  } catch (error) {
    console.log('Error: ', error);
    showAlert('Something went wrong. Please try again.', 'error');
  }
}

export async function processLogin(formData, navigate, showAlert) {
  const { email, password } = formData;

  try {
    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      tempPageChange(navigate);
    } else {
      showAlert(data.message || 'Login failed', 'error');
    }
  } catch (error) {
    console.log('Error: ', error);
    showAlert('Something went wrong. Please try again.', 'error');
  }
}

function tempPageChange(navigate) {
  navigate('/');
}
