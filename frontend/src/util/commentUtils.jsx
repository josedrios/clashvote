export async function fetchComments(postId, setCommentList, showAlert) {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(
      `http://localhost:3001/api/interaction/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          postId: postId,
        }),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      showAlert(
        responseData.message ||
          'Comments retrieval was unsuccessful, please try again',
        'error'
      );
      return;
    }
    setCommentList(responseData);
    console.log(responseData);
    return;
  } catch (error) {
    console.log('Error: ', error);
    showAlert('Something went wrong. Please try again later.', 'error');
    return;
  }
}

export async function handleCreateComment(content, postId, showAlert) {
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
      `http://localhost:3001/api/interaction/comments/create`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: content,
          postId: postId,
        }),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      showAlert(
        responseData.message ||
          'Comment creation was unsuccessful, please try again',
        'error'
      );
      return false;
    }
    return true;
  } catch (error) {
    console.log('Error: ', error);
    showAlert('Something went wrong. Please try again later.', 'error');
    return false;
  }
}

export async function handleVoteComment(commentId, vote, showAlert) {
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
      `http://localhost:3001/api/interaction/comments/vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          commentId,
          vote
        }),
      }
    );

    const responseData = await response.json();

    if (!response.ok || response.type === 'error') {
      showAlert(
        responseData.message ||
          'Comment vote was unsuccessful, please try again',
        'error'
      );
      return false;
    }
    return responseData.type;
  } catch (error) {
    console.log('Error: ', error);
    showAlert('Something went wrong. Please try again later.', 'error');
    return 'error';
  }
}
