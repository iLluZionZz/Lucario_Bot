module.exports = {
    name: 'lock',
    description: "locks the channel the message was sent in",
    aliases: ['lockdown', 'lockchannel'],
    execute (client, message, args, Discord){
        const member = message.author
        if(message.member.permissions.has('ADMINISTRATOR' || 'MANAGE_CHANNELS')){
            if(member){
                // message.channel.permissionOverwrites.edit(message.guild.id, {
                //     SEND_MESSAGES: false //change here... xd
                //   });
                // ^ Is for the @everyone role. I have a special role that needs verification to get, so we'll use that instead.
                const universalroleid = '827682970890534942'
                message.channel.permissionOverwrites.edit(universalroleid, { SEND_MESSAGES: false });
                const embed = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('This channel is now locked.')
                    .setDescription(`This command was sent by <@${member.id}>`)
                    .setTimestamp() 
                message.channel.send({ embeds: [embed] })
            }
        } else {
        message.channel.send(`You can't use this command.`);
    }
    }

}