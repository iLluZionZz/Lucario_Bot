const fs = require ('fs')
const profileModel = require("../../models/profileSchema");
const jsonfile = require('jsonfile'); //Everything we need for stuff to work blah blah
module.exports = {
    name: 'profile',
    description: "Displays a user profile",
    cooldown: 10,
    async execute (client, message, args, Discord, cmd){
        //let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.get(message.author.id) - DISCORD GUILDMEMBER, We need Userid.
        let user = message.mentions.users.first() || message.author
        const userid = user.id
        if(!user) return message.channel.send('Something went wrong. Please report this as a bug or ping Ethan to find out what happened.')
        
        if(fs.existsSync('stats.json')) {
            stats = jsonfile.readFileSync('stats.json'); // Load the Stats for XP system before everything else
        }
        const guildstats = stats[message.guild.id]
        const userStats = guildstats[userid];

        let profileData = await profileModel.findOne({ userID: userid })

        if(profileData.switchcode == ''){
            var switchcode = ''
        } else {
            var switchcode = `Switch: \`${profileData.switchcode}\``
        };
        if(profileData.pkmngocode == ''){
            var pkmngocode = ''
        } else {
            var pkmngocode = `Pokemon Go: \`${profileData.pkmngocode}\``
        };
        if(profileData.pkmnhomecode == ''){
            var pkmnhomecode = ''
        } else {
            var pkmnhomecode = `Pokemon Home: \`${profileData.pkmnhomecode}\``
        };

        const Emoji = client.emojiList
        const i = Emoji.indexOf('<:PokeCoin:860656640457441300>');
        const PokeCoin = Emoji[i]
        const fullstar = '★'
        const emptystar = '☆'
        const calc = 5 - profileData.prestige
        const cosmeticamountofstars = fullstar.repeat(profileData.prestige)
        let remainingstarlevel = emptystar.repeat(calc)
        let starstring = `[ ${profileData.prestige} ] ${cosmeticamountofstars}${remainingstarlevel}`

        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#0375ff')
        .setTitle(`${user.username} Stats`)
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .addFields(
            { name: 'Level', value: `${userStats.level}`, inline: true },
            { name: '\u200b', value: '\u200b', inline: false, inline: true},
            { name: 'Prestige', value: `${starstring}`, inline: true},  
            { name: 'Money', value: `Wallet: ${profileData.coins} ${PokeCoin} \n Bank: ${profileData.bank} ${PokeCoin}`},
            { name: 'Experience', value: `You currently have ${userStats.xp} xp. \n You need ${(userStats.xpToNextLevel - userStats.xp)} xp to get to the next level`},
            { name: 'Connections', value: `${switchcode} \n ${pkmngocode} \n ${pkmnhomecode}`, inline: true},
            { name: 'Misc', value: `Reputation: ${profileData.reputation}` },
        )
        .setTimestamp(); 
        //.setFooter('This message will be deleted in 20 seconds.');
    
    message.channel.send({ embeds: [exampleEmbed] })
    // .then(msg => {
    //     setTimeout(() => msg.delete(), 20000)
    // })
    // .catch()
    }
}
