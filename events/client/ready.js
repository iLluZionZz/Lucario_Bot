module.exports = async (Discord, client, message) => {
        console.log('Attempting to start Lucario Bot...');
        try {
        const guild = client.guilds.cache.get('579837419449221233');
        const guild2 = client.guilds.cache.get('858192074155622420')
        const emojis = guild.emojis.cache.map(e => `<${e.animated ? 'a' : ''}:${e.name}:${e.id}>`)
        const emojis2 = guild2.emojis.cache.map(e => `<${e.animated ? 'a' : ''}:${e.name}:${e.id}>`)
        const combinedmap = emojis.concat(emojis2)
        client.emojiList = combinedmap;
        console.log('Successfully cached server emojis!');
        } catch (err) {
        console.error('There was an error trying to cache emojis:' + err);
        };
        await client.guilds.fetch()
        const Guilds = client.guilds.cache.map(guild => guild.name);
        console.log(`Successfully cached all servers!:` + `[${Guilds}]`);
        console.log("\n")
        console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`)
        console.log(`     ┃                                                                  ┃`)
        console.log(`     ┃                 Logged in as ${client.user.tag}!                   ┃`)
        console.log(`     ┃                                                                  ┃`)
        console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`)
        console.log("\n")
        // Cooler login sequence initalized :)
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
        // Information for Pi
}