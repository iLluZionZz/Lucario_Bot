const fs = require('fs');
const jsonfile = require('jsonfile');
const readline = require('readline');
const axios = require('axios');
const pokemon = require('pokemon');
const { resourceLimits } = require('worker_threads');

module.exports = {
    name: 'test',
    description: "displays list of people in server by order of xp / level",
    async execute (client, message, args, Discord, profileData){
        if(!message.member.permissions.has('ADMINISTRATOR', 'BAN_MEMBERS')) return message.channel.send("You don't have permission to use this command.")
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
        
        const PokemonName = pokemon.getName(RandomPokemon)
        console.log(PokemonName)

        if(ispokemonshiny == true){ // Determine if Pokemon is Shiny
            var reformatted = `Shiny ${PokemonName}`
        } else {
            var reformatted = `${PokemonName}`
        }

            const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#FFFF00')
            .setAuthor(`You encountered a wild ${reformatted}!`, 'https://archives.bulbagarden.net/media/upload/7/7c/PE_Grass.png')
            .setDescription(`${pokemonrarity}`)
            .setTimestamp() 
            .setFooter({ text: 'Lucario Bot Pokedex' });
            
            const timeoutembed = new Discord.MessageEmbed()
            .setColor('#FEEF22')
            .setAuthor(`${reformatted} fled...`, 'https://archives.bulbagarden.net/media/upload/c/c0/Dream_Escape_Rope_Sprite.png')
            .setDescription(`${pokemonrarity}`)
            .addFields(
                { name: 'Ability', value: `Example`, inline: true},
                { name: '\u200B', value: '\u200B', inline: true }
            )
            .setTimestamp() 
            .setFooter({ text:'Blah Blah' });

            let filter = m => m.author.id === message.author.id
            message.channel.send({ embeds: [exampleEmbed] }).then(() => {
            let id = (message.id)
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
    }
    
}