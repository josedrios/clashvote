const User = require('../models/User');
const Player = require('../models/Players');
const Clan = require('../models/Clans');
const bcrypt = require('bcrypt');

exports.getAccountData = async (req, res) => {
  const token = req.user.id;

  if (!token) {
    console.log('No token found')
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  try {
    const userId = req.user.id;

    const user = await User.findById(userId)
      .populate('favoritePlayers')
      .populate('favoriteClans')
      .select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log(user);
    return res.json(user);
  } catch (error) {
    console.log(error)
    return res.status(403).json({ error: 'Invalid token' });
  }
};

exports.updateUsername = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(500).json({
        message: `The username of '${username}' is already in use`,
      });
    }

    const updateUser = await User.findByIdAndUpdate(
      userId,
      { username },
      { new: true, runValidators: true }
    );

    if (!updateUser) {
      return res
        .status(404)
        .json({ message: 'User not found, logout and try again' });
    }

    res
      .status(200)
      .json({ message: 'Username updated successfully', user: updateUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error changing username', error: error.message });
  }
};

exports.updateCharacter = async (req, res) => {
  try {
    const userId = req.user.id;
    const { character } = req.body;

    const updateUser = await User.findByIdAndUpdate(
      userId,
      { pfpCharacter: character },
      { new: true, runValidators: true }
    );

    if (!updateUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({
      message: 'PFP Character updated successfully',
      user: updateUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error changing character pfp', error: error.message });
  }
};

exports.updateColor = async (req, res) => {
  try {
    const userId = req.user.id;
    const { color } = req.body;

    const updateUser = await User.findByIdAndUpdate(
      userId,
      { pfpColor: color },
      { new: true, runValidators: true }
    );

    if (!updateUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res
      .status(200)
      .json({ message: 'PFP color updated successfully', user: updateUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error changing color pfp', error: error.message });
  }
};

exports.updateEmail = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newEmail } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: `No user was found`,
      });
    }

    const pwMatch = await bcrypt.compare(currentPassword, user.password);

    if (!pwMatch) {
      return res.status(400).json({
        message: `Invalid credentials`,
      });
    }

    if (newEmail === user.email)
      return res.status(400).json({
        message: 'New email must be different from your current email',
      });

    const emailExists = await User.findOne({ email: newEmail });
    if (emailExists) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    user.email = newEmail;

    await user.save();

    return res.json({ message: 'Email was successfully changed' });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: 'Error changing email', error: error.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: `No user was found`,
      });
    }
    
    const pwMatch = await bcrypt.compare(currentPassword, user.password);
    if (!pwMatch) {
      return res.status(400).json({
        message: `Invalid credentials`,
      });
    }

    if (await bcrypt.compare(newPassword, user.password)) {
      return res.status(400).json({
        message: 'New password must be different from your current password',
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    return res.json({ message: 'Password was successfully changed' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error changing password', error: error.message });
  }
};