export async function retrievePostList(setPostList, showAlert) {
    const token = localStorage.getItem('token');
  
    if (!token) {
      showAlert(
        'Authentication error: No token found, please logout and try again',
        'error'
      );
      return false;
    }
  
    try {
      const response = await fetch(`http://localhost:3001/api/post/`, {
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

  export async function getPostData(postId, setPostData, showAlert) {
    const token = localStorage.getItem('token');
  
    if (!token) {
      showAlert(
        'Authentication error: No token found, please logout and try again',
        'error'
      );
      return false;
    }
  
    try {
      const response = await fetch(`http://localhost:3001/api/post/${postId}`, {
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
        console.log(responseData)
        setPostData(responseData);
        return;
      }
    } catch (error) {
      console.log('Error: ', error);
      showAlert('Something went wrong. Please try again later.', 'error');
      return;
    }
  }