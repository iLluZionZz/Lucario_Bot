const moment = require('moment')
module.exports = {
    name: 'info',
    aliases: ['whois', 'lookup'],
    description: 'Gets info of a user',
    async execute (client, message, args, Discord){
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.get(message.author.id)
        if(!member) return message.channel.send('Please specify someone to lookup!')
        let memberroles = member.roles.cache.sort((a, b) => b.position - a.position).map((r) => `${r}`).join(' ')
        if(member.presence?.status == null){
            var presence = 'offline'
        } else {
            var presence = member.presence?.status
        }

        const embed = new Discord.MessageEmbed()
        .setTitle(`${member.displayName}'s Information`)
        .setColor('#0375ff')
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .addFields(
            { name: 'User Information', value: `ID: \`${member.id}\` \n Profile: <@${member.id}> \n Is Bot: \`${member.user.bot}\``, inline: true},
            { name: 'Roles', value: `${memberroles}`},
            { name: 'Activity', value: `Status: ${(presence).charAt(0).toUpperCase() + (presence).slice(1)} \n Joined Server: ${moment(member.joinedAt, "YYYYMMDD").fromNow()} (${moment(member.joinedAt).format('LLLL')}) \n Account Created: ${moment(member.user.createdAt, "YYYYMMDD").fromNow()} (${moment(member.user.createdAt).format('LLLL')})`},
        )
        .setTimestamp()
        .setFooter(`This message was requested by ${message.author.username}`);
    
    message.channel.send({ embeds: [embed] })

    .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
    }
}