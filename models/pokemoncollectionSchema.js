const mongoose = require("mongoose");

const pokemoncollectionSchema = new mongoose.Schema({
  userID: { type: String, require: true, unique: true },
  serverID: { type: String, require: true },
  numberofitems: { type: String }
});

const model = mongoose.model("pokemoncollection", pokemoncollectionSchema);

module.exports = model;