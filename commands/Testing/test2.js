module.exports = {
    name: 'test2',
    description: "Gives the latency of the bot.",
    execute (client, message, args, Discord, profileData){
        const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#FFFF00')
                .setAuthor(`You encountered a wild Pokemon!`, 'https://archives.bulbagarden.net/media/upload/7/7c/PE_Grass.png')
                .setDescription(`insertrarityhere`)
                .addFields(
                    { name: 'Ability', value: `test`, inline: true},
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: 'Weight', value: `balls kg`, inline: true},
                    { name: 'Height', value: `meters`, inline: true},
                    { name: '\u200B', value: '\u200B', inline: true }
                )
                .setTimestamp() 
                .setFooter('Lucario Bot Pokedex')

        const timeoutembed = new Discord.MessageEmbed()
                .setColor('#FEEF22')
                .setAuthor(`Pokemon fled...`, 'https://archives.bulbagarden.net/media/upload/c/c0/Dream_Escape_Rope_Sprite.png')
                .setDescription(`insertrarityhere`)
                .addFields(
                    { name: 'Ability', value: `Pokemon fled..`, inline: true},
                    { name: '\u200B', value: '\u200B', inline: true }
                )
                .setTimestamp() 
                .setFooter('Blah Blah');

        let id = (message.id)
                let channelid = (message.channel.id)
                console.log(id)

        async function findmessagelocation() {
            await message.channel.fetch(id).then(msg => msg.edit(timeoutembed))
        }
        
        message.channel.send({ embeds: [exampleEmbed] }).then(findmessagelocation());
    }

}

