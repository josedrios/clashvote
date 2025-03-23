const Post = require('../models/Posts');
const units = require('../constants/units.json');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1});
    res.json(posts);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({
        message: 'Error occurred while retrieving post',
        error: error.message,
      });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, type } = req.body;
    const unitNames = units[`${type}Names`];

    if (!unitNames) {
      return res.status(400).json({ message: 'Invalid type' });
    }

    const candidates = unitNames.map((name) => ({ name }));

    const newPost = new Post({
      title,
      type,
      candidates,
    });

    await newPost.save();
    return res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({
        message: 'Error occurred while creating post',
        error: error.message,
      });
  }
};

exports.updatePost = async (req, res) => {};
exports.removePost = async (req, res) => {};
