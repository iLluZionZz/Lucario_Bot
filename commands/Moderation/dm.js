module.exports = {
    name: "dm",
    description: "DM a user in the guild",
    category: "Moderation",
    async execute (bot, message, args) {
        if(message.member.permissions.has('ADMINISTRATOR', 'BAN_MEMBERS')){
      let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!user)
        return message.channel.send(
         `**Please mention a user**`
        );
      if (!args.slice(1).join(" "))
        return message.channel.send("**Please Specify a Message!**");
      user.user
        .send(args.slice(1).join(" "))
        .catch(() => message.channel.send("**🇽 That user could not be DMed! 🇽**"))
        .then(() => message.channel.send(`**Sent a message to ${user.user.tag}**`));
        } else {
            message.reply('You cannot use this command.')
        }
    },
  };