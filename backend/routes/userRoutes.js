const express = require('express');
const {
  usernameChange,
  characterChange,
  colorChange,
  saveUnit,
  unsaveUnit,
  getAccountData,
  getPFP,
  changePassword,
  changeEmail
} = require('../controllers/userController');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.patch('/:userId/username', authMiddleware, usernameChange);
router.patch('/:userId/character', authMiddleware, characterChange);
router.patch('/:userId/color', authMiddleware, colorChange);
router.patch('/unsave/:type/:tag', authMiddleware, unsaveUnit);
router.patch('/change/password', authMiddleware, changePassword);
router.patch('/change/email', authMiddleware, changeEmail);
// add change password route
// add change email route
router.get('/account', authMiddleware, getAccountData);
router.get('/pfp', authMiddleware, getPFP);
router.post('/save/:type/:tag', authMiddleware, saveUnit);

module.exports = router;
