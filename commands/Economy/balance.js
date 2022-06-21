module.exports = {
    name: "balance",
    aliases: ["bal", "bl", "bank", "wallet", "coins"],
    cooldown: 5,
    permissions: [],
    description: "Checks the users wallet & bank balance",
    execute(client, message, args, Discord, cmd, profileData) {
      const Emoji = client.emojiList
      const i = Emoji.indexOf('<:PokeCoin:860656640457441300>');
      const PokeCoin = Emoji[i]
      const balembed = new Discord.MessageEmbed()
        .setColor('#0375ff')
        .setTitle(`${message.author.username}'s Balance!`)
        .setDescription(`Wallet: ${profileData.coins} ${PokeCoin} \n Bank: ${profileData.bank} ${PokeCoin}`)
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL())
        message.channel.send({ embeds: [balembed] })
      //message.channel.send(`Your wallet balance is \`${profileData.coins}\` Pokécoins, and your bank balance is \`${profileData.bank}\` Pokécoins`);
    },
  };