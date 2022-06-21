module.exports = async function (Discord, client, role) {
  const guild = client.guilds.cache.get('579837419449221233');
  const embed = new Discord.MessageEmbed()
  .setColor(`RED`)
  .setAuthor(`Role Deleted`, guild.iconURL())
  .addField(`Role Deleted:`, `\`${role.id}\` / *\`${role.id}\`*`)
  .addField(`Role Hex-Code:`, `*\`${role.hexColor}\`*`)
  .addField(`Role Position:`, `\`${role.position}\``)

  const LogChannel = client.channels.cache.get('925964685851918386')
  LogChannel.send({ embeds: [embed] })
}
  