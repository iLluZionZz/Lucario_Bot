const fs = require('fs');
const jsonfile = require('jsonfile');
const readline = require('readline');
const axios = require('axios');

module.exports = {
    name: 'test',
    description: "displays list of people in server by order of xp / level",
    async execute (client, message, args, Discord, profileData){
        var d = Math.random();
        var a = Math.random();
        console.log(d)
        if (a <= 0.0005){
            message.channel.send('SHINY')
            var ispokemonshiny = true
        } else {
            var ispokemonshiny = false
        }
        if (d <= 0.01) {
            var pokemonrarity = 'Legendary'
            message.channel.send('LEGENDARY')
        }
        else if (d < 0.1){
            message.channel.send('RARE')
            var pokemonrarity = 'Rare'
        }
        else if (d <= 0.5) {
            message.channel.send('UNCOMMON')
            var pokemonrarity = 'Uncommon'
        }
        else {
            message.channel.send('COMMON')
            var pokemonrarity = 'Common'
        }

        let RandomPokemon = Math.floor(Math.random() * (898 - 1 + 1)) + 1;
        console.log(RandomPokemon)
        
        let Legendaries = [144, 145, 146, 150, 151, 243, 244, 245, 249, 250, 251, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 638, 638, 639, 640, 641, 642,, 643, 644, 645, 646, 647, 648, 649]
        const getlegendary = Legendaries[Math.floor(Math.random() * Legendaries.length)];
        if(Legendaries.includes(RandomPokemon)){
            message.channel.send('Found Legendary')
        }
        console.log(getlegendary)
            
        channel = client.channels.cache.get ('579849193846472704'); //designated channel to throw embed
        // request to API
        axios.get(`https://pokeapi.co/api/v2/pokemon/${RandomPokemon}`)
            .then((data) => data.data)
            .then(data => {
                const name = data.species.name;
                const weight = data.weight / 10;
                const height = data.height / 10;
                
                const shiny = data.sprites.front_shiny
        
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
                
                console.log(data.types)
                const type = data.types[0].type.name;
                const type1formatted = type.charAt(0).toUpperCase() + type.slice(1)
                if(data.types.length == 2){
                    const type2 = data.types[1].type.name;
                    var type2formatted = type2.charAt(0).toUpperCase() + type2.slice(1)
                } else {
                    var type2formatted = ''
                }

                const formatName = (name) => name.charAt(0).toUpperCase() + name.slice(1);
                const nameformatted = formatName(name)
        
                const ability = data.abilities[0].ability.name;
                if(ispokemonshiny == true){ // Determine if Pokemon is Shiny
                    var output = shiny
                    var reformatted = `Shiny ${nameformatted}`
                } else {
                    var output = data.sprites.front_default
                    var reformatted = `${nameformatted}`
                }

                const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#FFFF00')
                .setAuthor(`You encountered a wild ${reformatted}!`, 'https://archives.bulbagarden.net/media/upload/7/7c/PE_Grass.png')
                .setImage(output)
                .setDescription(`${pokemonrarity}`)
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
                
                const timeoutembed = new Discord.MessageEmbed()
                .setColor('#FEEF22')
                .setAuthor(`${reformatted} fled...`, 'https://archives.bulbagarden.net/media/upload/c/c0/Dream_Escape_Rope_Sprite.png')
                .setImage(output)
                .setDescription(`${pokemonrarity}`)
                .addFields(
                    { name: 'Ability', value: `${formatName(ability)}`, inline: true},
                    { name: '\u200B', value: '\u200B', inline: true }
                )
                .setTimestamp() 
                .setFooter('Blah Blah');

                let filter = m => m.author.id === message.author.id
                message.channel.send({ embeds: [exampleEmbed] }).then(() => {
                let id = (message.id)
                let channelid = (message.channel.id)
                console.log(id)

                async function findmessagelocation() {
                    await message.channel.fetch(id).then(msg => msg.edit(timeoutembed))
                }

                message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 30000,
                        errors: ['time']
                    })
                    .then(message => { // CATCHING CALCULATORS
                        message = message.first()
                        if (message.content.toUpperCase() == 'POKEBALL' || message.content.toUpperCase() == 'PB' || message.content.toUpperCase() == 'GREATBALL' || message.content.toUpperCase() == 'GB' || message.content.toUpperCase() == 'ULTRABALL' || message.content.toUpperCase() == 'UB') { // DO OR STATEMENTS INSTEAD, PB || GB || UB 
                            message.channel.send(`Pokemon caught`)
                            var catchcalulator = true
                        } else if (message.content.toUpperCase() == 'MASTERBALL' || message.content.toUpperCase() == 'MB') { // PUT MASTERBALL HERE - VAR CAUGHT = TRUE > PASS IN LATER, AND USE MATH || CAUGHT == TRUE {}
                            message.channel.send(`Pokemon caught`)
                            var Caught = true
                        } else {
                            message = message.channel.fetchMessage(id);
                            console.log(message)
                            message.edit(timeoutembed)
                        }
                    })
                    .catch(collected => {
                        message.channel.send('Timeout')
        
                        findmessagelocation();
                    });
                })


                //INSERT STUFF HERE AFTER MESSAGE COLLECTION
            })
            .catch((err) => {
                console.log(err)
            if (err.response && err.response.status === 404) {
                // Pokemon doesn't exist or some backend error
                throw err
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