const profileModel = require("../../models/profileSchema");
module.exports = {
    name: 'rps',
    cooldown: 20,
    description: "Lets play a game of Rock, Paper, Scissors",
    async execute (client, message, args, Discord){
        let embed = new Discord.MessageEmbed()
        .setTitle("Lets play Rock, Paper, Scissors!")
        .setDescription("React to emojis below to play.")
        .setTimestamp()
        .setFooter('This message will timeout in 1 min.')
        let msg = await message.channel.send({ embeds: [embed] })
        await msg.react("🗻")
        await msg.react("✂")
        await msg.react("📰")

        const filter = (reaction, user) => {
            return ['🗻', '✂', '📰'].includes(reaction.emoji.name) && user.id === message.author.id;
        }

        const choices = ['🗻', '✂', '📰']
        const me = choices[Math.floor(Math.random() * choices.length)]
        msg.awaitReactions({ filter, max: 1, time: 60000, error: ["time"] }).then(
            async(collected) => {
                const reaction = collected.first()
                let result = new Discord.MessageEmbed()
                .setTitle("Result")
                .addField("Your Choice", `${reaction.emoji.name}`)
                .addField("My choice", `${me}`)
                await msg.edit({ embeds: [result] })

                if((me === "🗻" && reaction.emoji.name === "✂") ||
                (me === "✂" && reaction.emoji.name === "📰") ||
                (me === "📰" && reaction.emoji.name === "🗻")) {
                    message.reply("You Lost!");
                } else if (me === reaction.emoji.name) {
                    return message.reply("Its a tie!");
                } else {
                    const randomNumber = Math.floor(Math.random() * 500) + 1;
                    const response = await profileModel.findOneAndUpdate(
                    {
                        userID: message.author.id,
                    },
                    {
                        $inc: {
                        coins: randomNumber,
                        },
                    }
                    );
                    return message.reply(`You Won, and recieved ${randomNumber} coins!`);
                }
            })
            .catch(collected => {
                message.channel.send('Our game is over quitter, you failed to respond in time!');
            }) 

    }
}