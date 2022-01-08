const profileModel = require("../../models/profileSchema");
module.exports = {
  name: "daily",
  aliases: [],
  cooldown: 82800,
  permissions: [],
  description: "Daily reward for users",
  async execute(client, message, args, Discord, cmd, profileData) {
    const randomNumber = Math.floor(Math.random() * 2000) + 1;
    const response = await profileModel.findOneAndUpdate(
      {
        userID: message.author.id,
      },
      {
        $inc: {
          coins: randomNumber,
        },
      }
    );
    return message.channel.send(`${message.author.username}, you claimed your daily bonus and received ${randomNumber} coins`);
  },
};