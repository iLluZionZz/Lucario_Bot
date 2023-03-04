const Discord = require("discord.js");

module.exports = {
  name: "Avatar",
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

    const avatarembed = new Discord.MessageEmbed()
    .setTitle(`${member.user.tag}'s Avatar`)
    .setImage(member.user.displayAvatarURL({dynamic: true}))
    .setColor("RED")
    .setTimestamp()

    await interaction.reply({ephemeral: true, embeds: [avatarembed]})
  },
};