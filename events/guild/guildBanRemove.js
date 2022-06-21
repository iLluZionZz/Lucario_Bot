module.exports = async function (ban) {
    const embed = new Discord.MessageEmbed()
    .setColor(`RED`)
    .setAuthor(`${ban.user.tag} - Banned`, ban.user.displayAvatarURL())
    .addField(`User Banned:`, `${ban.user} | \`${ban.user.id}\` / *\`${ban.user.username}\`*`)
    .addField(`Ban Reason:`, `${ban.reason ? ban.reason : "None Reason"}`)
              
    const LogChannel = client.channels.cache.get('925964685851918386')
    LogChannel.send({ embeds: [embed] }) 
}