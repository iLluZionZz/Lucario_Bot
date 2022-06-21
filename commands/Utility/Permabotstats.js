module.exports = {
    name: 'permalucariobotstats',
    aliases: ['permabotstats'],
    description: 'Get the stats of the bot',
    async execute (client, message, args, Discord) {
        const time = Math.round(process.uptime() * 10) / 10
        if (time > 86400){
            var formattime = time / 86400
            var variable = 'day(s)'
        } else if (time > 3600){
            var formattime = time / 3600
            var variable = 'hour(s)'
        } else if (time > 60){
            var formattime = time / 60
            var variable = 'minute(s)'
        } else {
            var formattime = time
            var variable = 'seconds'
        }

        const statembed = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle(`**${client.user.username} Stats**`)
        .setAuthor(message.guild.name, message.guild.iconURL({
            dynamic: true
        }))
        .addFields(
            { name: "Discord.js", value: `\`${Discord.version}\``, inline: true },
            { name: "Node.js", value:`\`${process.version}\``, inline: true },
            { name: "🕑 Last Refreshed", value: `<t:${(Math.floor(Date.now() / 1000))}:R>`, inline: true },
            { name: `Latency`, value: `\`${(client.ws.ping.toFixed(2))}ms\``, inline: true },
            { name: `Uptime`, value: `\`${formattime.toFixed(2)}\` ${variable}`, inline: true },
            { name: `Commands`, value: `\`${client.commands.size}\``, inline: true },
            { name: "Servers", value: `\`${client.guilds.cache.size}\``, inline: true },
            { name: "Channels", value: `\`${client.channels.cache.size}\``, inline: true },
            { name: "Users", value: `\`${client.guilds.cache.filter((e) => e.memberCount).reduce((a, g) => a + g.memberCount, 0)}\``, inline: true },
            )
        .addField("**Cached Data:**", `Users: \`${client.users.cache.size}\`\n Emojis: \`${client.emojis.cache.size}\``)
        .addField("**Memory:**", `\`${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}\` MB RSS \n \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}\` MB Heap`, true)
        .setFooter(`Requested by ${message.author.tag}`, client.user.displayAvatarURL())
        .setTimestamp()

        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('refresh')
                    .setLabel('🔄 Refresh')
                    .setStyle('SECONDARY'),
            );
        
        const channel = client.channels.cache.get('987892000713998396')
        const embedMessage = await channel.send({
            embeds: [statembed],
            components: [row]
        })
    }
}


