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

        if (message.author.id != "304028144761831424") {
            return message.channel.send({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle(":x: You Are not Allowed to run this command")
                    .setDescription("You have to be the **OWNER**")
                    .setColor("#000000")
                ]
            })
        }

        const Titleembed = new Discord.MessageEmbed()
        .setTitle("WARNING")
        .setDescription("Are you sure you want to do this? This will kill all instance of the bot and you will have to manually wake me up.")
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
            if(interaction.customId === 'yes'){
                var embedplaceholder = Confirmembed
                require("child_process").exec("pm2 stop main.js")
            } else { // JUST DO ELSE IF OTHERWISE
                var embedplaceholder = Denyembed
            }
            await interaction.update({ embeds: [embedplaceholder] });
        })
        
    }
}