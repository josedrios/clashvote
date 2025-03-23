const express = require('express');
const {
    addSave,
    removeSave
} = require('../controllers/interactionController');

const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Player/Clan save related routes
router.post('/saves/:type/:tag', authenticate, addSave);
router.delete('/saves/:type/:tag', authenticate, removeSave);

// Comments related routes

// Votes related routes

module.exports = router;