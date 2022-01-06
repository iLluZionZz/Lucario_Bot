module.exports = {
    name: 'unmuteuser',
    description: "unmutes the specified user",
    aliases: ['unmute'],
    execute (client, message, args){
        if(message.member.permissions.has('ADMINISTRATOR', 'KICK_MEMBERS', 'BAN_MEMBERS')){
            const target = message.mentions.users.first();
            if(target){
                let mainRole = message.guild.roles.cache.find(role => role.name === 'Member');
                let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
    
                let memberTarget= message.guild.members.cache.get(target.id);
                
                memberTarget.roles.remove(muteRole.id);
                memberTarget.roles.add(mainRole.id);
                message.channel.send(`<@${memberTarget.user.id}> has been unmuted.`)
            } else {
                message.channel.send('User not found.');
            }
        } else {
            message.channel.send(`You can't use this command.`);
        }
        }
    
    }