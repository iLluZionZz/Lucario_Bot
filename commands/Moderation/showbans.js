module.exports = {
    name: "showban",
    description: "Show all banned user",
    async execute (client, message, args, Discord){
        if(!message.member.permissions.has('BAN_MEMBERS')){
            return message.channel.send("You can't use this command.")
        }

        const fetchBans = message.guild.bans.fetch();
        const bannedMembers = (await fetchBans).map((member) => `\`Name:${member.user.tag} ID:${member.user.id}\``).join(', ')

        message.channel.send({embeds: [
            new Discord.MessageEmbed()
            .setTitle("Banned members")
            .setDescription(bannedMembers)
            .setColor("RED")
        ]})
    }
}