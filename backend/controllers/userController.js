const User = require('../models/User');
const Player = require('../models/Players');
const Clan = require('../models/Clans');
const bcrypt = require('bcrypt');

exports.getAccountData = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
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
    return res.status(403).json({ error: 'Invalid token' });
  }
};

exports.usernameChange = async (req, res) => {
  try {
    const { userId } = req.params;
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
      return res.status(404).json({ message: 'User not found.' });
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

exports.characterChange = async (req, res) => {
  try {
    const { userId } = req.params;
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

exports.colorChange = async (req, res) => {
  try {
    const { userId } = req.params;
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

// Function to store saved players/clans to a users account
exports.saveUnit = async (req, res) => {
  try {
    const { type, tag } = req.params;
    const { userId, name, icon } = req.body;
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

    // need to check if clan or player still exists before saving

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

exports.unsaveUnit = async (req, res) => {
  const { type, tag } = req.params;
  if (type !== 'player' && type !== 'clan') {
    return res
      .status(400)
      .json({ message: `Cannot unsave unit of type: ${type}` });
  }

  const userId = req.user.id;

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
    user.favoriteClans = user.favoriteClans.filter((unit) => unit.tag !== tag);
  }

  await user.save();

  if (deletedItem) {
    if (type === 'player') {
      await Player.findByIdAndDelete(deletedItem._id);
    } else if (type === 'clan') {
      await Clan.findByIdAndDelete(deletedItem._id);
    }
  }

  return res.json({ message: 'Unit unsaved successfully' });
};

exports.getPFP = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  try {
    const userId = req.user.id;

    const pfp = await User.findById(userId)
      .select('pfpColor')
      .select('pfpCharacter');

    if (!pfp) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log(pfp);
    return res.json(pfp);
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: `No user was found`,
      });
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword)
      return res.status(400).json({
        message: 'New password must be different from your current password',
      });

    const pwMatch = await bcrypt.compare(currentPassword, user.password);
    if (!pwMatch) {
      return res.status(400).json({
        message: `Inputted incorrect current password`,
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

exports.changeEmail = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newEmail } = req.body;


    const emailExists = await User.findOne({ email: newEmail });
    if (emailExists) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: `No user was found`,
      });
    }

    if (newEmail === user.email)
      return res.status(400).json({
        message: 'New email must be different from your current email',
      });

    const pwMatch = await bcrypt.compare(currentPassword, user.password);

    if (!pwMatch) {
      return res.status(400).json({
        message: `Inputted incorrect current password`,
      });
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
