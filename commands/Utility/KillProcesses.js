module.exports = {
    name: 'killall',
    description: "Terminates bot's connection to Discord",
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
        .setDescription("Are you sure you want to do this? This will kill all instances of the bot and you will have to manually wake me up.")
        .setColor("#000000");
        const Confirmembed = new Discord.MessageEmbed()
        .setTitle("Done!")
        .setDescription("Lucario Bot is now going to sleep.. 💤")
        .setColor("#000000");
        const Denyembed = new Discord.MessageEmbed()
        .setTitle("Whew!")
        .setDescription("That was a close one.")
        .setColor("#000000");

        const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
                .setCustomId('yes')
                .setLabel('Yes')
                .setStyle('SUCCESS'),
            new Discord.MessageButton()
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
                //require("child_process").exec("pm2 stop main.js") //- This doesnt work anymore lol
                try {
                    client.destroy();
                } catch (err) {
                    console.clear
                    console.warn('\n \n FATAL ERROR DURING WEBSOCKET CLOSE: LUCARIOBOT STILL RUNNING \n \n')
                    return message.channel.send('LucarioBot could not be terminated.')
                }
            } else { // JUST DO ELSE IF OTHERWISE
                var embedplaceholder = Denyembed
            }
            row.components[0].setDisabled(true)
            row.components[1].setDisabled(true)
            await interaction.update({ embeds: [embedplaceholder], components: [row] });
        })
        
    }
}