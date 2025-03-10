const User = require('../models/User');

exports.addUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({
      username,
      email,
      password
    });

    await newUser.save();

    res.status(201).json({ message: 'User successfully registered' });
  } catch (error) {
    res.status(500).json({ message: 'Error occurred while registering user' });
  }
};

