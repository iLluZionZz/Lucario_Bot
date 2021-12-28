module.exports = {
    name: "balance",
    aliases: ["bal", "bl"],
    permissions: [],
    description: "Check the user balance",
    execute(client, message, args, Discord, cmd, profileData) {
      message.channel.send(`Your wallet balance is ${profileData.coins}, your bank balance is ${profileData.bank}`);
    },
  };