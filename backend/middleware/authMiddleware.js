const jwt = require('jsonwebtoken');
const User = require('../models/User');

function authenticate(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    User.findById(decoded.id).then(user => {
      if (!user) return res.status(404).json({ message: 'User not found.' });
      req.user = user;
      req.user.id = decoded.id;

      next();
    });
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ message: 'Invalid token. Please logout and try again.' });
  }
};

function isAdmin(req, res, next) {
  if (req.user?.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Access denied: Admin only action'})
}

module.exports = { authenticate, isAdmin }