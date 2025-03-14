const User = require('../models/User');
const Player = require('../models/Players');
const Clan = require('../models/Clans');

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

    res
      .status(200)
      .json({ message: 'PFP Character updated successfully', user: updateUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error changing character pfp', error: error.message });
  }
};

exports.colorChange = async (req, res) => {
  console.log('reached code here')

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
    } else {
      console.log('NO MATCHES');
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
    return res
      .status(500)
      .json({ message: 'Error occurred while saving unit', error: error });
  }
};
