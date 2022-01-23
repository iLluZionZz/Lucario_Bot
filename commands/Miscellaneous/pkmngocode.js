const profileModel = require("../../models/profileSchema");
module.exports = {
  name: "gocode",
  aliases: ['pkmngo'],
  cooldown: 10,
  permissions: [],
  description: "Set or view your Pokemon go friend code for your profile",
  async execute(client, message, args, Discord, cmd, profileData) {
    if(args.length < 1){
        if(profileData.pkmngocode=== ''){
            return message.channel.send('Please enter a Pokemon Go Code to add to your profile.')
        } else {
            message.reply(`Your go code is ${profileData.pkmngocode}`)
        };
    };
    let gocode = /([0-9]{4})[- ]?([0-9]{4})[- ]?([0-9]{4})/.exec(args);
    console.log(gocode)
    if(!gocode) return message.channel.send('This is not a valid Pokemon Go Friend Code format!')
    gocode = `${gocode[1]} ${gocode[2]} ${gocode[3]}`;
    const response = await profileModel.findOneAndUpdate(
      {
        userID: message.author.id,
      },
      {
        $set: {
          pkmngocode: gocode,
        },
      }
    );
    return message.channel.send(`Your Pokemon Go Friend code has been posted to your profile. ${gocode}`);
  },
};

