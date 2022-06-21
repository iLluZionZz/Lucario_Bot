const { Permissions, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'timeout',
    description: "mutes the specified user using Discord's timeout function",
    async execute (client, message, args, Discord){ // DOES NOT WORK IN DJS VERSION V13.1!! ONLY V13.4 ^
        const member = message.mentions.users.first();
        const discordmember = message.mentions.members.first();
        if(!message.channel.permissionsFor(message.guild.me).has('MODERATE_MEMBERS')){
            message.channel.send('I am missing `ADMINISTRATOR` or `TIMEOUT_MEMBERS` permission. Please give me one to use this command ') 
        }
            if(!message.member.permissions.has('MODERATE_MEMBERS')){
            return message.channel.send('You are missing `ADMINISTRATOR` or `TIMEOUT_MEMBERS` permission.') 
        }
        if(message.member.permissions.has('ADMINISTRATOR', 'BAN_MEMBERS')){
        if(member){
            const memberTarget = message.guild.members.cache.get(member.id);
            const user = member
            if (discordmember.roles.highest.position > message.member.roles.highest.position || discordmember.roles.highest.position === message.member.roles.highest.position) return message.channel.send('You cannot timeout someone with an equal or higher role');
            let time = args[1] * 60000
            if(!time){
                return message.reply('Please enter a time in minutes. \` Name / Time / Reason \`')
            }
            if(isNaN(time)){
                return message.reply('The time must be a number, in minutes')
            }
            const reason = args.slice(2).join(' ')  || 'No reason provided'
            memberTarget.timeout(time,`Reason: ${reason}`)
            message.channel.send(`<@${memberTarget.id}> has been put in a timeout. \n Time: ${time/60000} minutes \n Reason: \`${reason}\``);
            const embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('MUTED')
            .setDescription(`You have been muted in **${message.guild.name}** for ${time/60000} minutes. \n Reason: **${reason}**`)
            .setFooter({ text: "Further infractions against our community conduct can result in warnings or removal from the server." });

            user.send({ embeds: [embed] });
        }else{
            message.channel.send('Timeout failed. Please specify a user.');
        }
    } else {
        message.channel.send(`You can't use this command.`);
    }
    }

}