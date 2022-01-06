const {
    MessageEmbed,
    MessageActionRow,
    MessageButton,
    Client
} = require("discord.js");
const fetch = require('node-fetch')


module.exports = {
    name: 'fishingtonio',
    description: "Creates a Discord Game in VC - Fishington.io",
    aliases: ['fishing', 'fishington'],
    execute(client, message, args) {

        const channel = message.member.voice.channel;
        const embed = new MessageEmbed()
            .setDescription("> :x: **You must be connected to a voice channel to use this command.**")
            .setColor("RANDOM")
        const embedembed = new MessageEmbed()
            .setDescription("I was unable to start a fishington.io session.")
            .setColor("RANDOM")
        if (!channel) return message.channel.send({
            embeds: [embed]
        })
        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "814288819477020702",
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${process.env.DISCORD_TOKEN}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(invite => {
            if (!invite.code) return message.channel.send({
                embeds: [embedembed]
            })
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setLabel("Fishington.io")
                    .setStyle("LINK")
                    .setURL(`https://discord.com/invite/${invite.code}`),
                );
            const inviteembed = new MessageEmbed()
                .setDescription("> **Click on the button to start playing Fishington.io**")
                .setColor("RANDOM")
            message.channel.send({
                embeds: [inviteembed],
                components: [row]
            })
        })
    }
}