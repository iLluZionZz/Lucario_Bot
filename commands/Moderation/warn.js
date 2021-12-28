const fs = require('fs')
module.exports = {
    name: 'warn',
    description: "warns the specified user",
    execute (client, message, args, Discord, jsonfile){
        if(fs.existsSync('warns.json')) {
            warnsrecord = jsonfile.readFileSync('../warns.json'); 
        }

        const member = message.mentions.users.first();
        if(message.member.hasPermission('ADMINISTRATOR', 'KICK_MEMBERS', 'BAN_MEMBERS')){
        if(member){
            const memberTarget = message.guild.members.cache.get(member.id);
            let reason = args.slice(1).join(' ');

            if(message.memberTarget == client.user.id) 
            return;
            
            if(message.guild.id in warnsrecord === false){
                warnsrecord[message.guild.id] = {};
            }
            
            const guildstats = warnsrecord[message.guild.id];
            const userStats = guildstats(message.memberTarget);
            if(message.memberTarget.id in guildstats === false){
                guildstats[message.memberTarget.id] = {
                    warnsnumber: 0
                };
            }

            userStats.warnsnumber += 1
            const badnumber = 10
            const bannumber = 13
            memberTarget.send(`You have been warned. This is your ${warnsnumber} warning. Reason: ${reason}`)
            message.channel.send(`<@${memberTarget.id}> has been warned. | Reason: ${reason}`);

            if(userStats.warnsnumber = badnumber){
                memberTarget.kick({ reason: reason });
                message.channel.send(`<@${memberTarget.id}> has been kicked due to exceeding their warning amount. Reason: ${reason}`)
            }

            if (userStats.warnsnumber = bannumber){
                memberTarget.ban({ reason: reason });
                message.channel.send(`<@${memberTarget.id}> has been banned due to exceeding their warning amount; and being kicked previously. Reason: ${reason}`)
            }

            jsonfile.writeFileSync('warns.json', warnsrecord);

        }else{
            message.channel.send('Warn failed. Please specify a user.');
        }
    } else {
        message.channel.send(`You can't use this command.`);
    }
    }

}