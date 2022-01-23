const mongoose = require('mongoose')

const blacklistSchema = new mongoose.Schema({ 
  userId: { type: String, require: true, unique: true },
  guildId: { type: String, require: true },
  moderatorId: { type: String, require: true },
  reason: { type: String },
  timestamp: { type: Number },
})

const model = mongoose.model("blacklistModel", blacklistSchema);

module.exports = model;