module.exports = {
    name: 'ban',
    description: "bans the specified user",
    execute (client, message, args){
        const member = message.mentions.users.first();
        if(message.member.hasPermission('ADMINISTRATOR', 'BAN_MEMBERS')){
        if(member){
            const memberTarget = message.guild.members.cache.get(member.id);
            let reason = args.slice(1).join(' ');
            memberTarget.ban({ reason: reason });
            message.channel.send(`Ban successful, <@${memberTarget.id}> has been banned. | Reason: ${reason}`);
        }else{
            message.channel.send('Ban failed. Please specify a user.');
        }
    } else {
        message.channel.send(`You can't use this command.`);
    }
    }

}