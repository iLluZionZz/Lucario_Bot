const { MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    name: 'killall',
    description: "Kills all bot processes",
    /**
     * 
     * @param {*} client 
     * @param {*} message 
     * @param {*} args
     * @param {Discord} Discord
     * @returns 
     */
    async execute(client, message, args, Discord) {

        const Titleembed = new Discord.MessageEmbed()
        .setTitle("WARNING")
        .setDescription("Are you sure you want to do this?")
        .setColor("#000000");
        const Confirmembed = new Discord.MessageEmbed()
        .setTitle("Done!")
        .setDescription("You selected yes")
        .setColor("#000000");
        const Denyembed = new Discord.MessageEmbed()
        .setTitle("Done!")
        .setDescription("You selected no")
        .setColor("#000000");

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('yes')
                .setLabel('Yes')
                .setStyle('SUCCESS'),
            new MessageButton()
                .setCustomId('no')
                .setLabel('No')
                .setStyle('DANGER'),    
        );
        
        const embedMessage = await message.channel.send({
            embeds: [Titleembed],
            components: [row]
        })
        
        const collector = embedMessage.createMessageComponentCollector({
            filter: ({user}) => user.id === message.author.id})

        collector.on('collect', async interaction => {
            if(interaction.customId === 'yes'){ //This must match the customId of the buttons listed above
                var embedplaceholder = Confirmembed
            } else { // JUST DO ELSE IF - IF YOU HAVE MORE THAN 2 BUTTONS
                var embedplaceholder = Denyembed
            }
            await interaction.update({ embeds: [embedplaceholder] });
        })
        
    }
}