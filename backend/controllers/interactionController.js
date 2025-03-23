const User = require('../models/User');
const Player = require('../models/Players');
const Clan = require('../models/Clans');

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