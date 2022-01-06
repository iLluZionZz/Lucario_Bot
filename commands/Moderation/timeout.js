const { Permissions } = require('discord.js');
module.exports = {
    name: 'timeout',
    description: "mutes the specified user using Discord's timeout function",
    execute (client, message, args){ // DOES NOT WORK IN DJS VERSION V13.1!! ONLY V13.4 ^
        const member = message.mentions.users.first();
        if(message.member.permissions.has('ADMINISTRATOR', 'BAN_MEMBERS')){
        if(member){
            const memberTarget = message.guild.members.cache.get(member.id);
            let time = args[1] * 60000
            if(!time){
                return message.reply('Please enter a time!')
            }
            if(isNaN(time)){
                return message.reply('The time must be a number, in minutes')
            }
            let reason = args[2].slice(1).join(' ');
            memberTarget.timeout(time,`Reason: ${reason}`)

            message.channel.send(`<@${memberTarget.id}> has been put in a timeout. | Reason: ${reason}`);
        }else{
            message.channel.send('Timeout failed. Please specify a user.');
        }
    } else {
        message.channel.send(`You can't use this command.`);
    }
    }

}