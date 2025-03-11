import { jwtDecode } from 'jwt-decode';

export async function changeUsername(data, showAlert, token) {
    if (!token) {
      showAlert("Authentication error: No token found.", "error");
      return;
    }
  
    const decodedToken = jwtDecode(token);
    console.log("Decoded Token:", decodedToken);
    
    const userId = decodedToken?.userId || decodedToken?.id; 

    if (!userId) {
      showAlert("Authentication error: User ID missing in token.", "error");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3001/api/user/${userId}/username`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username: data.username }),
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        showAlert("Username was changed", "success");
      } else {
        showAlert(responseData.message || "Username change was unsuccessful, please try again", "error");
      }
    } catch (error) {
      console.log("Error: ", error);
      showAlert("Something went wrong. Please try again later.", "error");
    }
  }
  
