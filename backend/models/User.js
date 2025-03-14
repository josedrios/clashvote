const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favoritePlayers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  favoriteClans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Clan' }],
  pfpColor: { type: String, required: true },
  pfpCharacter: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);
module.exports = User;