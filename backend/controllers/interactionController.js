const User = require('../models/User');
const Player = require('../models/Players');
const Clan = require('../models/Clans');
const Comment = require('../models/Comments');
const CommentVote = require('../models/CommentVote');

exports.addSave = async (req, res) => {
  try {
    const userId = req.user.id;
    const { type, tag } = req.params;
    const { name, icon } = req.body;
    if (!userId || !name || !tag) {
      return res.status(400).json({ message: 'Missing required field(s)' });
    }

    if (type !== 'player' && type !== 'clan') {
      return res
        .status(400)
        .json({ message: `Cannot save unit of type: ${type}` });
    }

    const user = await User.findById(userId)
      .populate('favoritePlayers')
      .populate('favoriteClans');

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    let alreadySaved = false;

    if (type === 'player') {
      alreadySaved = user.favoritePlayers.some((unit) => unit.tag === tag);
    } else if (type === 'clan') {
      alreadySaved = user.favoriteClans.some((unit) => unit.tag === tag);
    }

    if (alreadySaved) {
      return res.status(409).json({ message: `The ${type} is already saved` });
    }

    if (
      (type === 'player' && user.favoritePlayers?.length === 5) ||
      (type === 'clan' && user.favoriteClans?.length === 5)
    ) {
      return res
        .status(400)
        .json({ message: `You can only save up to 5 ${type}s` });
    }

    let newUnit;

    if (type === 'player') {
      newUnit = new Player({ tag, name, icon });
      await newUnit.save();
      user.favoritePlayers.push(newUnit);
    } else if (type === 'clan') {
      newUnit = new Clan({ tag, name, icon });
      await newUnit.save();
      user.favoriteClans.push(newUnit);
    }

    await user.save();

    return res.status(201).json({ message: 'Save was successful!' });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: 'Error occurred while saving unit', error: error });
  }
};

exports.removeSave = async (req, res) => {
  try {
    const userId = req.user.id;
    const { type, tag } = req.params;

    if (type !== 'player' && type !== 'clan') {
      return res
        .status(400)
        .json({ message: `Cannot unsave unit of type: ${type}` });
    }

    const user = await User.findById(userId)
      .populate('favoritePlayers')
      .populate('favoriteClans');

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    let deletedItem;
    if (type === 'player') {
      deletedItem = user.favoritePlayers.find((unit) => unit.tag === tag);
      user.favoritePlayers = user.favoritePlayers.filter(
        (unit) => unit.tag !== tag
      );
    } else if (type === 'clan') {
      deletedItem = user.favoriteClans.find((unit) => unit.tag === tag);
      user.favoriteClans = user.favoriteClans.filter(
        (unit) => unit.tag !== tag
      );
    }

    await user.save();

    if (deletedItem) {
      if (type === 'player') {
        await Player.findByIdAndDelete(deletedItem._id);
      } else if (type === 'clan') {
        await Clan.findByIdAndDelete(deletedItem._id);
      }
    }

    return res.status(201).json({ message: 'Unsave was successful!' });
  } catch (error) {
    console.log('Error: ', error.message);
    return res.json({ message: 'Unit unsaved successfully' });
  }
};

exports.getComments = async (req, res) => {
  try {
    const { postId } = req.body;
    console.log(postId);

    const comments = await Comment.find({ post: postId })
      .sort({ createdAt: -1 })
      .populate('user', 'username pfpCharacter pfpColor');

    return res.json(comments);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: 'Error occurred while getting comments', error: error });
  }
};

exports.createComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { content, postId } = req.body;
    console.log(postId);

    const newComment = new Comment({
      user: userId,
      post: postId,
      content: content,
    });

    await newComment.save();

    return res.status(201).json({ message: 'Comment was created' });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: 'Error occurred while creating comment', error: error });
  }
};

exports.voteComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { commentId, vote } = req.body;
    console.log(commentId);

    const comment = await Comment.findById(commentId);

    const commentVote = await CommentVote.findOne({ commentId, userId });
    if(commentVote){
      console.log(commentVote);
    } else {
      console.log("COMMENT VOTE MADE");
    }

    let resultType;

    if (!commentVote) {
      const newCommentVote = new CommentVote({
        userId,
        commentId,
        vote,
      });
      comment[`${vote}s`] += 1;
      await newCommentVote.save();
      resultType = 'initial';
    } else if(commentVote.vote === vote) {
      console.log('MATCHED:',commentVote.vote," ", vote);
      comment[`${vote}s`] -= 1;
      await CommentVote.deleteOne({_id: commentVote._id});
      resultType = 'remove';
    } else {
      console.log('CHANGED: ', commentVote.vote, ' ' , vote)
      comment[`${commentVote.vote}s`] -= 1;
      comment[`${vote}s`] += 1;
      commentVote.vote = vote;
      await commentVote.save();
      resultType = 'change';
    }
    await comment.save()


    return res.status(201).json({ message: 'Comment vote was created', type: resultType});
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({
        message: 'Error occurred while creating comment vote',
        error: error,
        type: 'error'
      });
  }
};
