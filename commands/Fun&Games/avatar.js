module.exports = {
    name: 'avatar',
    aliases: ['icon', 'pfp', 'profilepic'],
    description: 'Return a user(s) avatar picture!',
    //Use your own execute parameters
    async execute(client, message, args, Discord) {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.channel.send('Please Tag a Person');

        const avatarembed = new Discord.MessageEmbed()
        .setTitle(`${member.user.tag}'s Avatar`)
        .setImage(member.user.displayAvatarURL({dynamic: true}))
        .setColor("RED")
        .setTimestamp()

        message.channel.send({ephemeral: true, embeds: [avatarembed]});

    }
}