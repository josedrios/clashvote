const express = require('express');
const { addUser } = require('../controllers/userController');

const router = express.Router();

router.post('/add-post', addUser);

module.exports = router;