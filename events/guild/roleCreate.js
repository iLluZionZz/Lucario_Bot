module.exports = async function (Discord, client, role) {
    const guild = client.guilds.cache.get('579837419449221233');
    const embed = new Discord.MessageEmbed()
    .setColor(`${role.hexColor}`)
    .setAuthor(`Role Created`, guild.iconURL())
    .addField(`Role Created:`, `${role} | \`${role.id}\` / *\`${role.id}\`*`)
    .addField(`Role Hex-Code:`, `*\`${role.hexColor}\`*`)
    .addField(`Role Position:`, `\`${role.position}\``)
    const LogChannel = client.channels.cache.get('925964685851918386')
    LogChannel.send({ embeds: [embed] })
}
  