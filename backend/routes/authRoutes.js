const express = require('express');
const { addUser } = require('../controllers/authController');

const router = express.Router();

router.post('/register', addUser);
//router.post('/login', getUser);
//router.post('/delete', deleteUser);

module.exports = router;