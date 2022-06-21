module.exports = async (Discord, client, oldChannel, newChannel) => {
    const guild = client.guilds.cache.get('579837419449221233'); 
    let action;
    const embed = new Discord.MessageEmbed()
     .setColor(`YELLOW`)
     .setTimestamp()
    if (oldChannel.rateLimitPerUser != newChannel.rateLimitPerUser){
      action = "Slowmode"
      embed.addField(`Old Slowmode Value:`, `${oldChannel} | \`${oldChannel.id}\` / *\`${oldChannel.rateLimitPerUser}\`* Seconds`)
      embed.addField(`New Slowmode Value:`, `${newChannel} | \`${newChannel.id}\` / *\`${newChannel.rateLimitPerUser}\`* Seconds`)
    } else if (oldChannel.name != newChannel.name) {
      action = "Name"
      embed.addField(`Old Channel-Name:`, `${oldChannel} | \`${oldChannel.id}\` / *\`${oldChannel.name}\`*`)
      embed.addField(`New Channel-Name:`, `${newChannel} | \`${newChannel.id}\` / *\`${newChannel.name}\`*`)
    } else if (oldChannel.type != newChannel.type) {
      action = "Type"
      embed.addField(`Old Channel-Type:`, `*\`${oldChannel.type}\`*`)
      embed.addField(`New Channel-Type:`, `*\`${newChannel.type}\`*`)
    } else if (oldChannel.topic != newChannel.topic) {
      action = "Topic"
      embed.addField(`Old Channel-Topic:`, `\`${oldChannel.topic || "None"}\``)
      embed.addField(`New Channel-Topic:`, `\`${newChannel.topic || "None"}\``)
    } else {
      return; // To prevent Spam of Logs
    }
    embed.setAuthor(`Channel Updated - ${action}`, guild.iconURL()) 
    const LogChannel = client.channels.cache.get('925964685851918386')
    LogChannel.send({ embeds: [embed] }) 
}