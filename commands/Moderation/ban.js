module.exports = {
    name: 'ban',
    description: "bans the specified user",
    execute (client, message, args){
        const member = message.mentions.users.first();
        if(message.member.permissions.has('ADMINISTRATOR', 'BAN_MEMBERS')){
        if(member){
            const memberTarget = message.guild.members.cache.get(member.id);
            const user = member
            let reason = args.slice(1).join(' ');
            memberTarget.ban({ reason: reason });
            message.channel.send(`Ban successful, <@${memberTarget.id}> has been banned. | Reason: ${reason}`);
            const embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('MUTED')
            .setDescription(`You have been been banned from **${message.guild.name}** \n Reason: **${reason}**`)
            .setFooter({ text: "Rejoining on an alternate account will be met with another ban on that account. If you wish to appeal your ban, please use our online forum." });

            user.send({ embeds: [embed] });
        }else{
            message.channel.send('Ban failed. Please specify a user.');
        }
    } else {
        message.channel.send(`You can't use this command.`);
    }
    }

}