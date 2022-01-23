const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userID: { type: String, require: true, unique: true },
  serverID: { type: String, require: true },
  coins: { type: Number, default: 1000 },
  bank: { type: Number },
  prestige: { type: Number },
  reputation: { type: Number },
  pokeballs: { type: Number },
  greatballs: { type: Number },
  ultraballs: { type: Number },
  masterballs: { type: Number },
  premierballs: { type: Number },
  oldcharm: { type: Boolean },
  inventory: { type: Array },
  switchcode: { type: String },
  pkmngocode: { type: String },
  pkmnhomecode: { type: String },
});

const model = mongoose.model("ProfileModels", profileSchema);

module.exports = model;