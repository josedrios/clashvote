export async function fetchComments(postId, setCommentList, showAlert) {
  try {
    const response = await fetch(
      `http://localhost:3001/api/interaction/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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

export async function handleVoteComment(vote, showAlert) {}
