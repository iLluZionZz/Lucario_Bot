module.exports = async function (Discord, client, oldMember, newMember) {
    let options = {}
  if (options[newMember.guild.id]) {
    options = options[newMember.guild.id]
  }
  // Add default empty list
  if (typeof options.excludedroles === "undefined") options.excludedroles = new Array([])
  if (typeof options.trackroles === "undefined") options.trackroles = true
  const oldMemberRoles = [...oldMember.roles.cache.keys()];
  const newMemberRoles = [...newMember.roles.cache.keys()];
  const oldRoles = oldMemberRoles.filter(x => !options.excludedroles.includes(x)).filter(x => !newMemberRoles.includes(x))
  const newRoles = newMemberRoles.filter(x => !options.excludedroles.includes(x)).filter(x => !oldMemberRoles.includes(x))
  const rolechanged = (newRoles.length || oldRoles.length)
  if (rolechanged) {
    let roleadded = ""
    if (newRoles.length > 0) {
      for (let i = 0; i < newRoles.length; i++) {
        if (i > 0) roleadded += ", "
        roleadded += `<@&${newRoles[i]}>`
      }
    }
    let roleremoved = ""
    if (oldRoles.length > 0) {
      for (let i = 0; i < oldRoles.length; i++) {
        if (i > 0) roleremoved += ", "
        roleremoved += `<@&${oldRoles[i]}>`
      }
    }
    let text = `${roleremoved ? `**Role Changed (REMOVED)**\n${roleremoved}` : ""}${roleadded ? `**Role Changed (ADDED)**\n${roleadded}` : ""}`
    
    const embed = new Discord.MessageEmbed()
    .setColor(`YELLOW`)
    .setAuthor(`${newMember.user.tag} - User Updated`, newMember.displayAvatarURL())
    .setDescription(`${text}`)
    .setTimestamp()
    const LogChannel = client.channels.cache.get('925964685851918386')
    LogChannel.send({ embeds: [embed] }) 
    };
}

  