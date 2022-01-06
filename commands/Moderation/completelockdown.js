const { MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    name: 'totallockdown',
    description: "mutes the specified user",
    execute(client, message, args) {
        if (message.member.permissions.has('ADMINISTRATOR', 'KICK_MEMBERS', 'BAN_MEMBERS')) {

            let mainRole = message.guild.roles.cache.find(role => role.name === 'Member');
            const collector = message.createMessageComponentCollector({
                componentType: 'BUTTON',
                time: 15000
            });

            collector.on('collect', i => {
                if (i.user.id === interaction.user.id) {
                    i.reply(`${i.user.id} clicked on the ${i.customId} button.`);
                } else {
                    i.reply({
                        content: `These buttons aren't for you!`,
                        ephemeral: true
                    });
                }
            });

            collector.on('end', collected => {
                console.log(`Collected ${collected.size} interactions.`);
            });

        } else {
            message.channel.send(`You can't use this command.`);
        }

    }
}