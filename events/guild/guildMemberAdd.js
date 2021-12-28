const profileModel = require("../../models/profileSchema");
const pokemoncollectionmodel = require("../../models/pokemoncollectionSchema");

module.exports = async (client, discord, member) => {
  let profile = await profileModel.create({
    userID: member.id,
    serverID: member.guild.id,
    coins: 1000,
    bank: 0,
    pokeballs: 0,
    greatballs: 0,
    ultraballs: 0,
    masterballs: 0,
    premierballs: 0,
    inventory: [],
  });
  let pokemon = await pokemoncollectionmodel.create({
    userID: member.id,
    serverID: member.guild.id,
    pokemon: [],
  });
  profile.save();
  pokemon.save();
};