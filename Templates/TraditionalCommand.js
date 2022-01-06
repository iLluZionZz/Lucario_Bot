module.exports = {
    name: "test",
    aliases: ["x", "x"],
    permissions: [],
    description: "Example Command",
    execute(client, message, args, Discord, cmd, profileData) {
      message.channel.send('Test!')
    },
  };