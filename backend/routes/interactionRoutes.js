const express = require('express');
const {
    addSave,
    removeSave,
    createComment,
    getComments,
    voteComment
} = require('../controllers/interactionController');

const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Player/Clan save related routes
router.post('/saves/:type/:tag', authenticate, addSave);
router.delete('/saves/:type/:tag', authenticate, removeSave);

// Comments related routes
router.post('/comments/create', authenticate, createComment);
router.post('/comments', getComments);
router.post('/comments/vote', authenticate, voteComment);
//router.post('/comments/delete', authenticate, deleteComment);
//router.post('/comments/report', authenticate, reportComment);

// Votes related routes

module.exports = router;