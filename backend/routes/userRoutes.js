const express = require('express');
const {
  updateUsername,
  characterChange,
  colorChange,
  saveUnit,
  unsaveUnit,
  getAccountData,
  changePassword,
  changeEmail
} = require('../controllers/userController');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Fetch Account Data
router.get('/account', authMiddleware, getAccountData);
// router.get('/account', authMiddleware, getAccountData);

// User settings related routes
router.patch('/username', authMiddleware, updateUsername);
router.patch('/change/character', authMiddleware, characterChange);
router.patch('/:userId/color', authMiddleware, colorChange);
router.patch('/change/email', authMiddleware, changeEmail);
router.patch('/change/password', authMiddleware, changePassword);
// router.patch('/username', authMiddleware, usernameChange);
// router.patch('/character', authMiddleware, characterChange);
// router.patch('/color', authMiddleware, colorChange);
// router.patch('/email', authMiddleware, emailChange);
// router.patch('/password', authMiddleware, passwordChange);

// User saves, votes, comments related routes 
// CREATE ITS OWN SECTION - interactionRoutes.js, interactionController.js
router.patch('/unsave/:type/:tag', authMiddleware, unsaveUnit);
router.post('/save/:type/:tag', authMiddleware, saveUnit);
//router.post('/saves/:type/:tag', authMiddleware, unsaveUnit);
//router.delete('/saves/:type/:tag', authMiddleware, saveUnit);

module.exports = router;
