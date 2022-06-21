module.exports = {
    name: 'kick',
    description: "kicks the specified user",
    execute (client, message, args){
        const member = message.mentions.users.first()
        if(message.member.permissions.has('ADMINISTRATOR', 'KICK_MEMBERS')){
        if(member){
            const memberTarget = message.guild.members.cache.get(member.id);
            let reason = args.slice(1).join(' ');
            memberTarget.kick({ reason: reason });
            message.channel.send(`Kick successful, <@${memberTarget.id}> has been kicked. | Reason: ${reason}`);
        }else{
            message.channel.send('Kick failed. Please specify a user.');
        }
    } else {
        message.channel.send(`You can't use this command.`);
    }
    }

}
