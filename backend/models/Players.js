const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  tag: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  icon: { type: String, required: true},
  lastUpdated: { type: Date, default: Date.now },
});

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;
