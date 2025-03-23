const express = require('express');
const {
  getAccountData,
  updateUsername,
  updateCharacter,
  updateColor,
  updateEmail,
  updatePassword,
  addSave,
  removeSave,
} = require('../controllers/userController');

const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Fetch Account Data
router.get('/account', authenticate, getAccountData);

// User settings related routes
router.patch('/username', authenticate, updateUsername);
router.patch('/character', authenticate, updateCharacter);
router.patch('/color', authenticate, updateColor);
router.patch('/email', authenticate, updateEmail);
router.patch('/password', authenticate, updatePassword);

module.exports = router;
