const profileModel = require("../../models/profileSchema");
module.exports = {
  name: "beg",
  aliases: [],
  cooldown: 120,
  permissions: [],
  description: "Beg for coins",
  async execute(client, message, args, Discord, cmd, profileData) {
    const Emoji = client.emojiList
    const i = Emoji.indexOf('<:PokeCoin:860656640457441300>');
    const PokeCoin = Emoji[i]
    
    const randomNumber = Math.floor(Math.random() * 500) + 1;
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

    const begembed = new Discord.MessageEmbed()
        .setColor('#0375ff')
        .setTitle(`${message.author.username} begged`)
        .setDescription(`You begged for some coins and recieved ${randomNumber} ${PokeCoin}!`)
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL())
    return message.channel.send({ embeds: [begembed] })
    //return message.channel.send(`${message.author.username}, you begged and received ${randomNumber} coins`);
  },
};