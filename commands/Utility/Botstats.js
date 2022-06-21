
module.exports = {
    name: 'lucariobotstats',
    aliases: ['botstats'],
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
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .addField("**Guild/Server Info**", `Servers: \`${client.guilds.cache.size}\`\n Channels: \`${client.channels.cache.size}\` \n Users: \`${client.guilds.cache.filter((e) => e.memberCount).reduce((a, g) => a + g.memberCount, 0)}\``)
        .addField("**Cached Data:**", `Users: \`${client.users.cache.size}\`\n Emojis: \`${client.emojis.cache.size}\``)
        .addField("**Performance**", `Ping: \`${(client.ws.ping.toFixed(2))}ms\` \n Uptime: \`${formattime.toFixed(2)}\` ${variable}`)
        .addField("**Memory:**", `\`${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}\` MB RSS \n \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}\` MB Heap`, true)
        .addField("**Node environment:**", ` \`${process.version} on ${process.platform} ${process.arch}\``)
        .addField("**Version**", ` \`1.0\``)
        .setFooter(`Requested by ${message.author.tag}`, client.user.displayAvatarURL())
        .setTimestamp()

        message.channel.send({ embeds: [statembed] })

        console.log(`\nThis was requested by a user on discord: ${message.author.tag}`)
        console.table({ 
            'Bot User:' : `${client.user.tag}` ,
            'Guild(s):' : `${client.guilds.cache.size} Servers` ,
            'Watching:' : `${client.guilds.cache.reduce((a, b) => a + b?.memberCount, 0)} Members` ,
            'Prefix:' : `${process.env.PREFIX}` ,
            'Commands:' : `${client.commands.size}` ,
            'Discord.js:' : `v${Discord.version}` ,
            'Node.js:' : `${process.version}` ,
            'Platform:' : `${process.platform} ${process.arch}` ,
            'Memory:' : `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`
          });
    }
}