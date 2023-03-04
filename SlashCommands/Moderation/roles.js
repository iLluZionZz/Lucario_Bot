const Discord = require('discord.js')
module.exports = {
  name: "role",
  description: "Gives a user the specified role",
  options: [
      {
          name: "member",
          description: "The server memeber you want to give the role to",
          required: true,
          type: 'USER',
          value: 'member'
      },
      {
        name: "role",
        description: "The role to give the specified member",
        required: true,
        type: 'ROLE',
        value: 'role'
      }
  ],
   /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    
  run: async (client, interaction, args) => {
    if(!interaction.memberPermissions.has("ManageRoles")){
      return interaction.editReply("You do not have the required permissions to do this!")
    }

    
    const role = interaction.options.getRole('role')
    const member = interaction.options.getMember('member')
    if(!member){
      interaction.editReply("An error occured finding this user; This user is likely not a member of this discord server.")
    };
    

    member.roles.add(role)
    
    

  interaction.editReply({
    embeds: [
      new Discord.MessageEmbed()
          .setColor('GREEN')
          .setTitle('Role Added!')
          .setDescription(`Gave <@${member.id}> the role <@${role}>`)
    ],
  });
    
  },
};