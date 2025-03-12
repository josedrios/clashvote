const express = require('express');
const {
  usernameChange
} = require('../controllers/userController');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.patch('/:userId/username', authMiddleware, usernameChange);
router.patch('/save/:type/:tag', authMiddleware, usernameChange);

module.exports = router;