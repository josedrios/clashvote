const express = require('express');
const {
    createPost,
    updatePost,
    removePost
} = require('../controllers/postController');

const { authenticate, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authenticate, isAdmin, createPost);
router.patch('/update', authenticate, isAdmin, updatePost);
router.delete('/delete', authenticate, isAdmin, removePost);

module.exports = router;