const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token. Please logout and try again.' });
  }
};

// HOW FRONT END WILL LOOK LIKE:

// const token = localStorage.getItem('token');

// fetch('http://localhost:3001/api/user/profile', {
//     method: 'GET',
//     headers: {
//         'Authorization': token
//     }
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.error(error));
