const { CommandInteracion, Client, MessageEmbed, Util } = require('discord.js');

module.exports = {
   name: 'stealemoji',
   description: 'Steal an emoji from another server',
   options: [
    {
        name: "emoji",
        description: "The emoji you want to steal",
        type: 'STRING',
        required: true,
    }
],
   /**
   *
   * @param {Client} client
   * @param {CommandInteracion} interaction
   * @param {String[]} args
   */
 run: async (client, interaction, args) => {

    if(!interaction.member.permissions.has("MANAGE_EMOJIS_AND_STICKERS")) return interaction.editReply({content: `You are not a staff member!`, ephemeral: true})
    if(!args.length) return interaction.editReply({content: `Please supply some emojis`, ephemeral: true})
    if(args.length > 10) return interaction.editReply({content: `Can only added 10 emojis at each time!`, ephemeral: true})
    for(const rawEmojis of args) {
        const parsedEmoji = Util.parseEmoji(rawEmojis)
        if(parsedEmoji.id) try {
            
            const exe = parsedEmoji.animated ? ".gif" : ".png"
            const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + exe}`
            interaction.guild.emojis.create(url, parsedEmoji.name).then((e) => {
                interaction.editReply({content: `Added ${e} - \`${e.url}\``, ephemeral: true})
                
            })
        } catch (err) {
            console.log(err)
            interaction.editReply({content: `Failed attempting to add ${e} - \`${e.url}\` \n Error: ${err}`, ephemeral: true})
        }
        }
    }

 }