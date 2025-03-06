const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
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
