const mongoose = require('mongoose');

const clanSchema = new mongoose.Schema({
  tag: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  lastUpdated: { type: Date, default: Date.now },
});

// For caching:
// data: { type: Object, required: true }

const Clan = mongoose.model('Clan', clanSchema);
module.exports = Clan;
