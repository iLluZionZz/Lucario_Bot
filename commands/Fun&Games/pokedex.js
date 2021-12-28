const axios = require('axios');
module.exports = {
    name: 'pokedex',
    cooldown: 10,
    description: "displays list of pokemon",
    execute (client, message, args, Discord) {
        if(!args[0]) return message.reply("Enter a Pokemon name or National dex number.");
        channel = client.channels.cache.get ('854458555997880341'); //designated channel to throw embed
        // request to API
        axios.get(`https://pokeapi.co/api/v2/pokemon/${args[0].toLowerCase()}`)
            .then((data) => data.data)
            .then(data => {
                console.log(`Pokemon DATA: ${data}`)
                const name = data.species.name;
                const url = `https://pokemondb.net/pokedex/${args[0]}`;
                const weight = data.weight / 10;
                const height = data.height / 10;
        
                const stat1 = data.stats[0].stat.name;
                const stat2 = data.stats[1].stat.name;
                const stat3 = data.stats[2].stat.name;
                const stat4 = data.stats[3].stat.name;
                const stat5 = data.stats[4].stat.name;
                const stat6 = data.stats[5].stat.name;
        
                const stat1value = data.stats[0].base_stat;
                const stat2value = data.stats[1].base_stat;
                const stat3value = data.stats[2].base_stat;
                const stat4value = data.stats[3].base_stat;
                const stat5value = data.stats[4].base_stat;
                const stat6value = data.stats[5].base_stat;
        
                const type = data.types[0].type.name;
                const type2 = data.types[1].type.name;
        
                const ability = data.abilities[0].ability.name;
                const formatName = (name) => name.charAt(0).toUpperCase() + name.slice(1);
                const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#FFFF00')
                .setURL(`${url}`)
                .setAuthor('Pokedex', 'https://i.imgur.com/RWFriKR.png')
                .setThumbnail(data.sprites.front_default)
                .setTitle(`**No. ${data.id}** ${formatName(name)}`) 
                .setDescription(`**Types** \n ${type.charAt(0).toUpperCase() + type.slice(1)} , ${type2.charAt(0).toUpperCase() + type2.slice(1)}`)
                .addFields(
                    { name: 'Ability', value: `${formatName(ability)}`, inline: true},
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: 'Weight', value: `${weight} kg`, inline: true},
                    { name: 'Height', value: `${height} meters`, inline: true},
                    { name: '\u200B', value: '\u200B', inline: true }
                )
                .setTimestamp() 
                .setFooter('Lucario Bot Pokedex');

                channel.send({ embeds: [exampleEmbed] });
                message.reply(`${formatName(name)} found. <#854458555997880341>`);
            })
            .catch((err) => {
                console.log(err)
            if (err.response && err.response.status === 404) {
                // Pokemon doesn't exist
                message.reply(`The Pokemon "${args[0]}" does not exist. Please enter a valid Pokemon name or National dex number.`);
            } else {
                // Error
                console.log(err);
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}