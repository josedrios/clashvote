const mongoose = require('mongoose');

const clanSchema = new mongoose.Schema({
  tag: { type: String, required: true },
  name: { type: String, required: true },
  icon: { type: String, required: true},
  lastUpdated: { type: Date, default: Date.now },
});

const Clan = mongoose.model('Clan', clanSchema);
module.exports = Clan;