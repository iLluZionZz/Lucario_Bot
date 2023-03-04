const { UserContextMenuInteraction, MessageEmbed } = require("discord.js");
const moment = require('moment')

module.exports = {
  name: "User Info",
  type: 2,
   /**
     *
     * @param {Client} client
     * @param {UserContextMenuInteraction} interaction
     * @param {String[]} args
     */
    
  run: async (client, interaction, args) => {
        let member = await interaction.guild.members.fetch(interaction.targetId)
        if(!member) return interaction.reply('An error occured')
        
        let memberroles = member.roles.cache.sort((a, b) => b.position - a.position).map((r) => `${r}`).join(' ')
        if(member.presence?.status == null){
            var presence = 'offline'
        } else {
            var presence = member.presence?.status
        }

        const embed = new MessageEmbed()
        .setTitle(`${member.displayName}'s Information`)
        .setColor('#0375ff')
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .addFields(
            { name: 'User Information', value: `ID: \`${member.id}\` \n Profile: <@${member.id}> \n Is Bot: \`${member.user.bot}\``, inline: true},
            { name: 'Roles', value: `${memberroles}`},
            { name: 'Activity', value: `Status: ${(presence).charAt(0).toUpperCase() + (presence).slice(1)} \n Joined Server: ${moment(member.joinedAt, "YYYYMMDD").fromNow()} (${moment(member.joinedAt).format('LLLL')}) \n Account Created: ${moment(member.user.createdAt, "YYYYMMDD").fromNow()} (${moment(member.user.createdAt).format('LLLL')})`},
        )
        .setTimestamp()

        await interaction.reply({ephemeral: true, embeds: [embed]})
  },
};


