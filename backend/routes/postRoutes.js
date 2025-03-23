const express = require('express');
const {
    createPost,
    updatePost,
    removePost,
    getPosts,
    getPost
} = require('../controllers/postController');

const { authenticate, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// User Post Routes
router.get('/', authenticate, getPosts)
router.get('/:postId', authenticate, getPost)

// Admin ONLY Post Routes
router.post('/create', authenticate, isAdmin, createPost);
router.patch('/update', authenticate, isAdmin, updatePost);
router.delete('/delete', authenticate, isAdmin, removePost);

module.exports = router;