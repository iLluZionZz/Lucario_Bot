module.exports = {
    name: 'restart',
    description: "Restarts the bot",
    async execute(client, message, args, Discord) {

        if(message.author.id != "304028144761831424" ) {
            return message.channel.send({
                embeds: [
                    new Discord.MessageEmbed()
                      .setTitle(":x: You Are not Allowed to run this command")
                      .setDescription("You have to be the **OWNER**")
                      .setColor("#000000")
                ]
            })
        }
        
        await client.destroy()
        await client.login(process.env.DISCORD_TOKEN)
        
        console.log("Bot Restarted!!")
        await message.channel.send({
            embeds: [
                new Discord.MessageEmbed()
                  .setTitle(" Restarted the **BOT**")
                  .setDescription("Please check me to see if all commands are working or not!!")
                  .setColor("BLURPLE")
            ]
        });
    }
}

