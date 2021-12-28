module.exports = {
    name: 'muteuser',
    description: "mutes the specified user",
    aliases: ['mute'],
    execute (client, message, args){
        if(message.member.hasPermission('ADMINISTRATOR', 'KICK_MEMBERS', 'BAN_MEMBERS')){
        const target = message.mentions.users.first();
        if(target){
            let mainRole = message.guild.roles.cache.find(role => role.name === 'Member');
            let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');

            let memberTarget= message.guild.members.cache.get(target.id);
            
            memberTarget.roles.remove(mainRole.id);
            memberTarget.roles.add(muteRole.id);
            message.channel.send(`<@${memberTarget.user.id}> has been muted.`)
        } else {
            message.channel.send('User not found.');
        }
    } else {
        message.channel.send(`You can't use this command.`);
    }
    }

}
