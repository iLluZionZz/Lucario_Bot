module.exports = {
    name: "balance",
    aliases: ["bal", "bl", "bank", "wallet"],
    permissions: [],
    description: "Checks the users wallet & bank balance",
    execute(client, message, args, Discord, cmd, profileData) {
      message.channel.send(`Your wallet balance is \`${profileData.coins}\` Pokécoins, and your bank balance is \`${profileData.bank}\` Pokécoins`);
    },
  };