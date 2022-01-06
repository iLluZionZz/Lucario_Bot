module.exports = async (Discord, client, message) => {
        const embed = new MessageEmbed()
        .setTitle("Left a Guild")
        .setColor("RED")
        .addField("**Guild Info**", ` \`${guild.name} (${guild.id})\``)
        .addField("**Owner Info**", ` \`${guild.owner}\``)
        .addField("**Server Member Count**", ` \`${guild.memberCount}\``)
        .addField("**Total Servers**", ` \`${client.guilds.cache.size}\``)
        .addField("**Total Member count**", ` \`${client.users.cache.size}\``)
        .setTimestamp()
        const LogChannel = client.channels.cache.get('925964685851918386')
        LogChannel.send({ embeds: [embed] }) 
}