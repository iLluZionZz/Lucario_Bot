module.exports = {
    name: "games",
    aliases: ['fun'],
    cooldown: 20,
    description: 'lists an embed of my available games',    
    execute(client, message, args, Discord){
    
    const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#0375ff')
            .setTitle(`My Available Games!`)
            .setDescription('Its game time! You can earn some cash from playing!')
            .addFields(
                { name: 'Rock, Paper, Scissors', value: `/rps | ^500 coin reward` },
                { name: 'Guess the Number!', value: `/gtn | ^10000 coin reward!!` },
            )
            .setTimestamp() 
    message.channel.send(exampleEmbed)
    }
}