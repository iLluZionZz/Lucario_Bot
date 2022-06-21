module.exports = async (Discord, client, emoji) => {
    const embed = new Discord.MessageEmbed()
    .setColor(`GREEN`)
    .setAuthor(`Emoji Created`, emoji.url)
    .addField(`Emoji Created:`, `${emoji} | \`${emoji.id}\` / *\`${emoji.name}\`*`)
    
    const LogChannel = client.channels.cache.get('925964685851918386')
    LogChannel.send({ embeds: [embed] })
}