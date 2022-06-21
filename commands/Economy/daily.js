const profileModel = require("../../models/profileSchema");
module.exports = {
  name: "daily",
  aliases: [],
  cooldown: 82800,
  permissions: [],
  description: "Daily reward for users",
  async execute(client, message, args, Discord, cmd, profileData) {
    const Emoji = client.emojiList
    const i = Emoji.indexOf('<:PokeCoin:860656640457441300>');
    const PokeCoin = Emoji[i]
    
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
    const Dailyembed = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle(`${message.author.username}'s Daily Reward!`)
      .setDescription(`Here are your daily coins! **${randomNumber}** ${PokeCoin} \n You now have **${profileData.coins}** ${PokeCoin}`)
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL())
    return message.channel.send({ embeds: [Dailyembed] });
  },
};