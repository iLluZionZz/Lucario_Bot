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
                { name: 'Rock, Paper, Scissors', value: `\`${process.env.PREFIX}rps\` | up to a 500 coin reward` },
                { name: 'Guess the Number!', value: `\`${process.env.PREFIX}gtn\` | up to a 10000 coin reward!!` },
                { name: '**Discord Games!**', value: `Betrayal.io: \`${process.env.PREFIX}betray\` \n :underage: Poker Night: \`${process.env.PREFIX}poker\` \n YoutubeTogether: \`${process.env.PREFIX}ytt\` \n Fishington.io: \`${process.env.PREFIX}fishing\``},
            )
            .setFooter('You must be in a voice channel to play Discord games.')
            .setTimestamp() 
    message.channel.send({ embeds: [exampleEmbed] })
    }
}