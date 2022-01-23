const profileModel = require("../../models/profileSchema");
module.exports = {
  name: "weekly",
  aliases: [],
  cooldown: 604800,
  permissions: [],
  description: "Weekly reward for users",
  async execute(client, message, args, Discord, cmd, profileData) {
    const Emoji = client.emojiList
    const i = Emoji.indexOf('<:PokeCoin:860656640457441300>');
    const PokeCoin = Emoji[i]
    
    const randomNumber = Math.floor(Math.random() * 25000) + 1;
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
    const Dailyembed = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle(`${message.author.username}'s Weekly Reward!`)
      .setDescription(`Here are your weekly bonus coins! **${randomNumber}** ${PokeCoin} \n You now have **${profileData.coins}** ${PokeCoin}`) 
    return message.channel.send({ embeds: [Dailyembed] });
  },
};