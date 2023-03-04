const Discord = require("discord.js");
const fs = require ('fs')
const profileModel = require("../../models/profileSchema");
const jsonfile = require('jsonfile'); //Everything we need for stuff to work blah blah

module.exports = {
  name: "Profile",
  type: 2,
   /**
     *
     * @param {Client} client
     * @param {UserContextMenuInteraction} interaction
     * @param {String[]} args
     */
  run: async (client, interaction, args) => {
    let member = await interaction.guild.members.fetch(interaction.targetId)
        const user = member.user
        const userid = user.id
        if(!user) return interaction.reply('Something went wrong. Please report this as a bug or ping Ethan to find out what happened.')
        
        if(fs.existsSync('stats.json')) {
            stats = jsonfile.readFileSync('stats.json'); // Load the Stats for XP system before everything else
        } else {
            return interaction.reply({ephemeral: true, content: 'This person has no profile!'})
        }
        const guildstats = stats[interaction.guild.id]
        const userStats = guildstats[userid];

        let profileData = await profileModel.findOne({ userID: userid })
        if(!profileData) return interaction.reply({ephemeral: true, content: 'This person has no profile!'})

        if(profileData.switchcode == ''){
            var switchcode = 'Switch: '
        } else {
            var switchcode = `Switch: \`${profileData.switchcode}\``
        };
        if(profileData.pkmngocode == ''){
            var pkmngocode = 'Pokemon Go: '
        } else {
            var pkmngocode = `Pokemon Go: \`${profileData.pkmngocode}\``
        };
        if(profileData.pkmnhomecode == ''){
            var pkmnhomecode = 'Pokemon Home: '
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
        await interaction.reply({ephemeral: true, embeds: [exampleEmbed]})
    // .then(msg => {
    //     setTimeout(() => msg.delete(), 20000)
    // })
    // .catch()
  },
};