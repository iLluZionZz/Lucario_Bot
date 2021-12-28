module.exports = {
    name: 'lock',
    description: "locks the channel the message was sent in",
    execute (client, message, args, Discord){
        const member = message.author
        if(message.member.hasPermission('ADMINISTRATOR', 'BAN_MEMBERS')){
            if(member){
                message.channel.updateOverwrite(message.guild.roles.cache.get("827682970890534942"), {
                    SEND_MESSAGES: false
                })
                const embed = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('This channel is now locked.')
                    .setDescription(`This command was sent by <@${member.id}>`)
                    .setTimestamp() 
                message.channel.send(embed)
            }
        } else {
        message.channel.send(`You can't use this command.`);
    }
    }

}