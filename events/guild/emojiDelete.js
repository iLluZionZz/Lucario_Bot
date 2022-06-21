module.exports = async (Discord, client, emoji) => {
    const embed = new Discord.MessageEmbed()
    .setColor(`RED`)
    .setAuthor(`Emoji Deleted`, emoji.url)
    .addField(`Emoji Deleted:`, `\`${emoji.id}\` / *\`${emoji.name}\`*`)
    
    const LogChannel = client.channels.cache.get('925964685851918386')
    LogChannel.send({ embeds: [embed] })
}