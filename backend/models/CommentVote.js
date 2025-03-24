const mongoose = require('mongoose');

const commentVoteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  commentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
  vote: { type: String, enum: ['like', 'dislike'] },
  createdAt: { type: Date, default: Date.now },
});

commentVoteSchema.index({ userId: 1, commentId: 1 }, { unique: true });

const CommentVote = mongoose.model('CommentVote', commentVoteSchema);
module.exports = CommentVote;