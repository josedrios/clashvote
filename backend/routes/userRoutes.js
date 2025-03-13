const express = require('express');
const { usernameChange, saveUnit, getAccountData } = require('../controllers/userController');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.patch('/:userId/username', authMiddleware, usernameChange);
router.get('/account', authMiddleware, getAccountData)
router.post('/save/:type/:tag', authMiddleware, saveUnit);

module.exports = router;
