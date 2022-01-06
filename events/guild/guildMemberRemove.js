module.exports = async (Discord, client, member) => {
    let myGuild = client.guilds.cache.get('579837419449221233'); // your server token goes here.
    const LogChannel = client.channels.cache.get('925964685851918386')
    let memberCount = myGuild.memberCount;
    LogChannel.send(`${member.user.username} left the server! We now have ${memberCount} members.`)

}