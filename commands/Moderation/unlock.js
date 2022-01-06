module.exports = {
    name: "unlock-channel",
    description: "Unlocks a Channel",
    aliases: ['unlock'],
    async execute(client, message, args, Discord) {
        if(message.member.permissions.has('ADMINISTRATOR' || 'MANAGE_CHANNELS')){
            // message.channel.permissionOverwrites.edit(message.guild.id, {
            //     SEND_MESSAGES: true
            // });
            // ^ Is for the @everyone role. I have a special role that needs verification to get, so we'll use that instead.
            const universalroleid = '827682970890534942'
            message.channel.permissionOverwrites.edit(universalroleid, { SEND_MESSAGES: false });
            const embed = new Discord.MessageEmbed()
                .setTitle("Channel Updates")
                .setDescription(`🔒 ${message.channel} has been Unlocked`)
                .setColor("RANDOM");
            await message.channel.send({ embeds: [embed] });
            message.delete();
        } else {
            message.channel.send(`You don't have permission to use this command!`)
        }
    }
};