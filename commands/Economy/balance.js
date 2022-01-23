module.exports = {
    name: "balance",
    aliases: ["bal", "bl", "bank", "wallet", "coins"],
    permissions: [],
    description: "Checks the users wallet & bank balance",
    execute(client, message, args, Discord, cmd, profileData) {
      const Pokecoin = client.emojiList
      const Dailyembed = new Discord.MessageEmbed()
        .setColor('#0375ff')
        .setTitle(`${message.author.username}'s Daily Reward!`)
        .setDescription(`Here are your daily coins! ${randomNumber} ${Pokecoin}`)
      message.channel.send(`Your wallet balance is \`${profileData.coins}\` Pokécoins, and your bank balance is \`${profileData.bank}\` Pokécoins`);
    },
  };