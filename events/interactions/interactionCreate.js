const { Message } = require('discord.js')

module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
        if(interaction.isCommand()) {
            
            await interaction.deferReply({ empheral: false }).catch(() => {});
            const cmd = client.slashCommands.get(interaction.commandName)
            if(!cmd) return interaction.followUp({content: `An error has occured!`})
            const args = []
            interaction.options.data.map((x) => {
                args.push(x.value)
            });
           
           
            cmd.execute(interaction, client, args)
        };
        
        if(interaction.isButton()){
            console.log(interaction);

            interaction.reply({ content: `${interaction.user.tag} clicked me!` })
        };
    }
}