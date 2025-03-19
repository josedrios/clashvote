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

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Fetch Account Data
router.get('/account', authMiddleware, getAccountData);

// User settings related routes
router.patch('/username', authMiddleware, updateUsername);
router.patch('/character', authMiddleware, updateCharacter);
router.patch('/color', authMiddleware, updateColor);
router.patch('/email', authMiddleware, updateEmail);
router.patch('/password', authMiddleware, updatePassword);

// User saves, votes, comments related routes 
// CREATE ITS OWN SECTION - interactionRoutes.js, interactionController.js
router.post('/saves/:type/:tag', authMiddleware, addSave);
router.delete('/saves/:type/:tag', authMiddleware, removeSave);

module.exports = router;
