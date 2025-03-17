const express = require('express');
const {
  usernameChange,
  characterChange,
  colorChange,
  saveUnit,
  unsaveUnit,
  getAccountData,
  getPFP,
} = require('../controllers/userController');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.patch('/:userId/username', authMiddleware, usernameChange);
router.patch('/:userId/character', authMiddleware, characterChange);
router.patch('/:userId/color', authMiddleware, colorChange);
router.get('/account', authMiddleware, getAccountData);
router.get('/pfp', authMiddleware, getPFP);
router.post('/save/:type/:tag', authMiddleware, saveUnit);
router.patch('/unsave/:type/:tag', authMiddleware, unsaveUnit);


module.exports = router;
