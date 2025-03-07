const mongoose = require('mongoose');

const seasonSchema = new mongoose.Schema({
  seasonNumber: { type: Number, required: true, unique: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
});

const Season = mongoose.model('Season', seasonSchema);
module.exports = Season;
