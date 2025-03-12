const express = require('express');
const { usernameChange, saveUnit } = require('../controllers/userController');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.patch('/:userId/username', authMiddleware, usernameChange);
router.post('/save/:type/:tag', authMiddleware, saveUnit);

module.exports = router;
