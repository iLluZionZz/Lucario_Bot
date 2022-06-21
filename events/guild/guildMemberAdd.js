const profileModel = require("../../models/profileSchema");
const pokemoncollectionmodel = require("../../models/pokemoncollectionSchema");

module.exports = async (Discord, client, member) => {
    if (process.env.WELCOME === 1) {
      const ruleschannel = "579845914785611827"
      const welcomemessage = `Welcome <@${member.id}> to **${member.guild.name}!** \n Make sure to check out <#${ruleschannel}> to get access to the rest of the server! \n Have fun!`
      const welcomechannel = client.channels.cache.get('579841035119624193')
      welcomechannel.send(welcomemessage)
    }

    try {
      profileData = await profileModel.findOne({ userID: member.id });
      pokemonData = await pokemoncollectionmodel.findOne({ userID: member.id });
      if (!profileData) {
        let profile = await profileModel.create({
          userID: member.id,
          serverID: member.guild.id,
          coins: 1000,
          bank: 0,
          prestige: 0,
          reputation: 0, 
          pokeballs: 0,
          greatballs: 0,
          ultraballs: 0,
          masterballs: 0,
          premierballs: 0,
          inventory: [],
          keyitems: [],
          switchcode: '',
          pkmngocode: '',
          pkmnhomecode: '',
        });
        profile.save();
      };
      if (!pokemonData) {
        let pokemon = await pokemoncollectionmodel.create({
          userID: member.id,
          serverID: member.guild.id,
          pokemon: [],
        });
        pokemon.save();
      };
    }
    catch (err) {
      console.log(err);
    }
};