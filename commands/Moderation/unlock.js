module.exports = {
    name: 'unlock',
    description: "unlocks the channel the message was sent in",
    execute (client, message, args, Discord){
        const member = message.author
        if(message.member.hasPermission('ADMINISTRATOR', 'BAN_MEMBERS')){
            if(member){
                message.channel.updateOverwrite(message.guild.roles.cache.get("827682970890534942"), {
                    SEND_MESSAGES: true
                })
                const embed = new Discord.MessageEmbed()
                    .setColor('#00FF00')
                    .setTitle('This channel is unlocked, have fun!')
                    .setDescription(`This command was sent by <@${member.id}>`)
                    .setTimestamp() 
                message.channel.send({ embeds: [embed] })
            }
        } else {
        message.channel.send(`You can't use this command.`);
    }
    }

}