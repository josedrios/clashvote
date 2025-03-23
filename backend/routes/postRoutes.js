const express = require('express');
const {
    createPost,
    updatePost,
    removePost,
    getPosts
} = require('../controllers/postController');

const { authenticate, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/get', authenticate, isAdmin, getPosts)
router.post('/create', authenticate, isAdmin, createPost);
router.patch('/update', authenticate, isAdmin, updatePost);
router.delete('/delete', authenticate, isAdmin, removePost);

module.exports = router;