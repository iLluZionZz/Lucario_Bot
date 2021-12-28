module.exports = {
    name: 'unban',
    description: "unbans the specified user",
    async execute (client, message, args){
        const Banlist = await message.guild.fetchBans();
        const bannedUser = Banlist.find(args[0]);
        if(message.member.hasPermission('ADMINISTRATOR', 'BAN_MEMBERS')){
            if(ars[1]) return message.channel.send('Please paste the id of the user you want unbanned.')
            const memberTarget = message.fetch(args[0]);
            if(memberTarget = bannedUser) {
                await message.guild.member.unban(memberTarget);
                message.channel.send(`<@${memberTarget}> has been unbanned.`);
            }else{
                message.channel.send('Unban failed. User is not banned!')
            }
        } else {
            message.channel.send(`You can't use this command.`);
        }
    }
}