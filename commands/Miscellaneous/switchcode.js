const profileModel = require("../../models/profileSchema");
module.exports = {
  name: "switchcode",
  aliases: ['switch'],
  cooldown: 10,
  permissions: [],
  description: "Set or view your Nintendo switch code for your profile",
  async execute(client, message, args, Discord, cmd, profileData) {
    if(args.length < 1){
        if(profileData.switchcode === ''){
            return message.channel.send('Please enter a Nintendo Switch Code to add to your profile.')
        } else {
            return message.channel.send(`Your switch code is \`${profileData.switchcode}\``)
        };
    };
    let nswitchcode = /^(?:SW)?[- ]?([0-9]{4})[- ]?([0-9]{4})[- ]?([0-9]{4})/.exec(args);
    if(!nswitchcode) return message.channel.send('This is not a valid Nintendo Switch Code format!')
    nswitchcode = `SW-${nswitchcode[1]}-${nswitchcode[2]}-${nswitchcode[3]}`;
    const response = await profileModel.findOneAndUpdate(
      {
        userID: message.author.id,
      },
      {
        $set: {
          switchcode: nswitchcode,
        },
      }
    );
    return message.channel.send(`Your Switch code has been posted to your profile. ${nswitchcode}`);
  },
};

