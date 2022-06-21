module.exports = async (Discord, client, channel) => {
    const guild = client.guilds.cache.get('579837419449221233'); 
    const embed = new Discord.MessageEmbed()
    .setColor(`GREEN`)
    .setAuthor(`Channel Created`, guild.iconURL())
    .addField(`Channel:`, `${channel} | \`${channel.id}\` / *\`${channel.name}\`*`)
    .addField(`Channel Type:`, `*\`${channel.type}\`*`)
    .setTimestamp()
    const LogChannel = client.channels.cache.get('925964685851918386')
    LogChannel.send({ embeds: [embed] }) 
}