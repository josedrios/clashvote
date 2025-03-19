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