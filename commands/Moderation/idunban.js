module.exports = {
    name: "idunban",
    description: "Unban a user with their ID",
    async execute (client, message, args, Discord){
        
        if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply("**You Don't Have The Permission To ban A User!**");

        if (!args[0]) return message.reply("You need to specify a user ID");

      let user = args[0];
      let reden = args[1] || 'No reason given.'
        
      let ban = await message.guild.members.unban(user, {
        reden
      })
          const embed1 = new Discord.MessageEmbed()
          .setColor('#8BED7F')
          .setTitle(`✅ Banned ${ban.tag || "Unknown User"}`)
          .setDescription(`**Reason**: ${reden}`)
          return message.reply({ embeds: [embed1]});
        },
      };