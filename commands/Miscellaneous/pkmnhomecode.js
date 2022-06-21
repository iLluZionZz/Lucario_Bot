const profileModel = require("../../models/profileSchema");
module.exports = {
  name: "homecode",
  aliases: ['pkmnhome', 'pokemonhome'],
  cooldown: 10,
  permissions: [],
  description: "Set or view your Pokemon Home Code for your profile",
  async execute(client, message, args, Discord, cmd, profileData) {
    if(args.length < 1){
        if(profileData.pkmnhomecode === ''){
            return message.channel.send('Please enter a Pokemon Home Friend Code to add to your profile.')
        } else {
            return message.channel.send(`Your Pokemon Home Friend code is \`${profileData.pkmnhomecode}\``)
        };
    };
    let homecode = /[A-Z]{12}/.exec(args);
    if(!homecode) return message.channel.send('This is not a valid Pokemon Home Friend Code format!')
    homecode = `${homecode}`
    const response = await profileModel.findOneAndUpdate(
      {
        userID: message.author.id,
      },
      {
        $set: {
          pkmnhomecode: homecode,
        },
      }
    );
    return message.channel.send(`Your Home Friend Code has been posted to your profile. ${homecode}`);
  },
};

