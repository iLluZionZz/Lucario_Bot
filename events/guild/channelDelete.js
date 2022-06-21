module.exports = async function (Discord, client, channel) {
    const guild = client.guilds.cache.get('579837419449221233'); 
    const embed = new Discord.MessageEmbed()
    .setColor(`RED`)
    .setAuthor(`Channel Deleted`, guild.iconURL())
    .addField(`Channel Deleted:`, `\`${channel.id}\` / *\`${channel.name}\`*`)
    .addField(`Channel Type:`, `*\`${channel.type}\`*`)
    .setTimestamp()
    const LogChannel = client.channels.cache.get('925964685851918386')
    LogChannel.send({ embeds: [embed] }) 
}