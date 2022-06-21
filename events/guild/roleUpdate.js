module.exports = async function (Discord, client, oldRole, newRole) {
    let action;

    if (oldRole.name !== newRole.name) {
    action = "Name"
    } else if (oldRole.color !== newRole.color) {
    action = "Color"
    } else {
    return; // To prevent Logs Spams
    }

    const embed = new Discord.MessageEmbed()
    .setColor(`${newRole.hexColor}`)
    .setAuthor(`Role Updated - ${action}`, guild.iconURL())
    .addField(`Old Role-Name:`, `${oldRole} | \`${oldRole.id}\` / *\`${oldRole.id}\`*`)
    .addField(`New Role-Name:`, `${newRole} | \`${newRole.id}\` / *\`${newRole.id}\`*`)
    .addField(`Old Role Hex-Code:`, `*\`${oldRole.hexColor}\`*`)
    .addField(`New Role Hex-Code:`, `*\`${newRole.hexColor}\`*`)
    .addField(`Old Role-Position:`, `\`${oldRole.position}\``)
    .addField(`New Role-Position:`, `\`${newRole.position}\``)
    
    const LogChannel = client.channels.cache.get('925964685851918386')
    LogChannel.send({ embeds: [embed] })
}

