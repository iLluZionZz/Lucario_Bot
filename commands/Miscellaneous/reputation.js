const profileModel = require("../../models/profileSchema");
module.exports = {
  name: "reputation",
  aliases: ['rep'],
  cooldown: 120,
  permissions: [],
  description: "Give somebody reputation for being a good member to the community.",
  async execute(client, message, args, Discord, cmd, profileData) {
    const target = message.mentions.users.first();
    if(target.id == message.author.id) return message.channel.send("You cannot give reputation to yourself!")
    if (!args.length) return message.channel.send("You need to mention a player to give them coins");
    if (!target) return message.channel.send("That user does not exist");
    
    try {
        const targetData = await profileModel.findOne({ userID: target.id });
        if (!targetData) return message.channel.send(`This user doens't exist in the database`);
  
        await profileModel.findOneAndUpdate(
          {
            userID: target.id,
          },
          {
            $inc: {
              reputation: +1,
            },
          }
        );
    } catch (err) {
        console.log(err);
      }
    return message.channel.send(`You gave ${target} +1 rep!`);
  },
};