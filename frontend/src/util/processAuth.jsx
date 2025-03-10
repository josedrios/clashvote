export async function processRegister(formData, showAlert) {
  showAlert(`Information has reached the process function`, 'success');
  const { username, email, password } = formData;

  try {
    const response = await fetch('http://localhost:3001/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log('Error: ', error);
  }
}

export async function processLogin(formData, showAlert) {
  showAlert(`Information has reached the process function`, 'success');
  const { email, password } = formData;

  try {
    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log('Error: ', error);
  }
}