const {
    MessageActionRow,
    MessageButton,
    MessageEmbed,
} = require('discord.js')

module.exports = {
    name: 'examplecommand',
    description: "a test command for random shit",
    async execute(client, message, args, Discord) {
        

        // Constants

        const backId = 'back'
        const forwardId = 'forward'
        const backButton = new MessageButton({
            style: 'SECONDARY',
            label: 'Back',
            emoji: '⬅️',
            customId: backId
        })
        const forwardButton = new MessageButton({
            style: 'SECONDARY',
            label: 'Forward',
            emoji: '➡️',
            customId: forwardId
        })

        // Put the following code wherever you want to send the embed pages:

        const {
            author,
            channel
        } = message
        const guilds = [...client.guilds.cache.values()]

        /**
         * Creates an embed with guilds starting from an index.
         * @param {number} start The index to start from.
         * @returns {Promise<MessageEmbed>}
         */
        const generateEmbed = async start => {
            const current = guilds.slice(start, start + 10)

            // You can of course customise this embed however you want
            return new MessageEmbed({
                title: `Showing guilds ${start + 1}-${start + current.length} out of ${guilds.length}`,
                fields: await Promise.all(
                    current.map(async guild => ({
                        name: guild.name,
                        value: `**ID:** ${guild.id}\n**Owner:** ${(await guild.fetchOwner()).user.tag}`
                    }))
                )
            })
        }

        // Send the embed with the first 10 guilds
        const canFitOnOnePage = guilds.length <= 10
        const embedMessage = await channel.send({
            embeds: [await generateEmbed(0)],
            components: canFitOnOnePage ?
                [] :
                [new MessageActionRow({
                    components: [forwardButton]
                })]
        })
        // Exit if there is only one page of guilds (no need for all of this)
        if (canFitOnOnePage) return

        // Collect button interactions (when a user clicks a button),
        // but only when the button as clicked by the original message author
        const collector = embedMessage.createMessageComponentCollector({
            filter: ({
                user
            }) => user.id === author.id
        })

        let currentIndex = 0
        collector.on('collect', async interaction => {
            // Increase/decrease index
            interaction.customId === backId ? (currentIndex -= 10) : (currentIndex += 10)
            // Respond to interaction by updating message with new embed
            await interaction.update({
                embeds: [await generateEmbed(currentIndex)],
                components: [
                    new MessageActionRow({
                        components: [
                            // back button if it isn't the start
                            ...(currentIndex ? [backButton] : []),
                            // forward button if it isn't the end
                            ...(currentIndex + 10 < guilds.length ? [forwardButton] : [])
                        ]
                    })
                ]
            })
        })
    }
}

function genCode() {
    let codes = [];
    let str =
      "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890!@#$%'";
    for (let i = 0; i < 6; i++) {
      codes.push(str[Math.floor(Math.random() * str.length)]);
    }
    return codes.join("");
  }
  
  console.log(genCode());

  async function UnbanAllMembers(message) {
    // Delay function
    const delay = (ms) => new Promise(r => setTimeout(() => r(2), ms));
  
    const success = [], failed = [];
  
    const bans = await message.guild.bans.fetch().catch(console.error);
    const valids = bans.map(b => b.user.id).filter(Boolean);
    // status update
    message.reply(`👍 Found \`${bans.size}\` Bans and \`${valids.length}\` Valid IDS to unban!\n> It will take \`${valids.length * 200 / 1000} Seconds\`!`)
    
    
    for(const ban of valids) {
       await message.guild.members.unban(ban)
        .then(() => success.push(ban))
        .catch(() => failed.push(ban))
       await delay(150); // wait 150ms due to ratelimits
    }
    // status update
    message.reply(`✅ Unbanned \`${success.length}\` / \`${valids.length}\` Members, and I failed unbanning: \`${failed.length} Members\``);
    console.log(failed); 
  }
  UnbanAllMembers(message);