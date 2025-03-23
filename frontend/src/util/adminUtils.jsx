export async function retrievePost(setPostList) {
  const token = localStorage.getItem('token');

  if (!token) {
    showAlert(
      'Authentication error: No token found, please logout and try again',
      'error'
    );
    return false;
  }

  try {
    const response = await fetch(`http://localhost:3001/api/post/get`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      showAlert(
        responseData.message ||
          'Post retrieval was unsuccessful, please try again',
        'error'
      );
      return;
    } else {
      setPostList(responseData);
      return;
    }
  } catch (error) {
    console.log('Error: ', error);
    showAlert('Something went wrong. Please try again later.', 'error');
    return;
  }
}

export async function createPostUtil(data, showAlert) {
  if (data.title === '' || data.type === '') {
    showAlert('Input fields left empty', 'error');
  }

  const token = localStorage.getItem('token');

  if (!token) {
    showAlert(
      'Authentication error: No token found, please logout and try again',
      'error'
    );
    return false;
  }

  try {
    const response = await fetch(`http://localhost:3001/api/post/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: data.title, type: data.type }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      showAlert(
        responseData.message ||
          'Post creation was unsuccessful, please try again',
        'error'
      );
      return;
    } else {
      showAlert('Post creation was successful', 'success');
      return;
    }
  } catch (error) {
    console.log('Error: ', error);
    showAlert('Something went wrong. Please try again later.', 'error');
    return;
  }
}
