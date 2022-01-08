const fs = require ('fs')
const jsonfile = require('jsonfile'); //Everything we need for stuff to work blah blah
module.exports = {
    name: 'profile',
    description: "Displays a user profile",
    execute (client, message, args, Discord, cmd, profileData){
        
        if(fs.existsSync('stats.json')) {
            stats = jsonfile.readFileSync('stats.json'); // Load the Stats for XP system before everything else
        }
        const guildstats = stats[message.guild.id]
        const userStats = guildstats[message.author.id];

        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#0375ff')
        .setTitle(`${message.author.username} Stats`)
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .addFields(
            { name: 'Level', value: `${userStats.level}` },
            { name: 'Money', value: `Wallet: ${profileData.coins} coins \n Bank: ${profileData.bank} coins` },
            { name: 'Experience', value: `You currently have ${userStats.xp} xp. \n You need ${userStats.xpToNextLevel} xp to get to the next level`},
        )
        .setTimestamp() 
        .setFooter('This message will be deleted in 20 seconds.');
    
    message.channel.send({ embeds: [exampleEmbed] })
    .then(msg => {
        setTimeout(() => msg.delete(), 20000)
    })
    .catch()
    }
}
