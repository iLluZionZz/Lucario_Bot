module.exports = async (Discord, client, message) => {
        try {
        const g = client.guilds.cache.get('579837419449221233');
        const g2 = client.guilds.cache.get('858192074155622420')
        const emojis = g.emojis.cache.map(e => `<${e.animated ? 'a' : ''}:${e.name}:${e.id}>`)
        const emojis2 = g2.emojis.cache.map(e => `<${e.animated ? 'a' : ''}:${e.name}:${e.id}>`)
        const combinedmap = emojis.concat(emojis2)
        client.emojiList = combinedmap;
        console.log('Successfully cached server emojis!')
        } catch (err) {
        console.log('There was an error trying to cache emojis:' + err);
        };
        console.log(`Logged in as ${client.user.tag}!`); //Woohooo!
}