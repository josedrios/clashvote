const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  content: { type: String, required: true },
  likes: { type: Number, default: 0},
  dislikes: { type: Number, default: 0},
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null,
  },
  createdAt: { type: Date, default: Date.now },
});

// PREVENT SPAMMING?
//commentSchema.index({ user: 1, post: 1, content: 1 }, { unique: true });

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
