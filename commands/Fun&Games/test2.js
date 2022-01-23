const { MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');
const pokemon = require('pokemon');
module.exports = {
    name: 'safari',
    description: "Play the safari minigame",
    /**
     * 
     * @param {*} client 
     * @param {*} message 
     * @param {*} args
     * @param {Discord} Discord
     * @returns 
     */
    async execute(client, message, args, Discord, profileData) {

        var d = Math.random(); // POKEMON
        var a = Math.random(); // SHINY VALUE
        console.log(d)
        if (a <= 0.0005){ //Check if we found a shiny
            var folderdir = 'ani-front-shiny'
            var shinyplaceholder = 'Shiny'
        } else {
            var folderdir = 'ani-front'
            var shinyplaceholder = ''
        }
        if (d <= 0.01 && profileData.oldcharm === true) {
            var pokemonrarity = 'Legendary'
            var rarityid = 4
        }
        else if (d < 0.1){
            var rarityid = 3
            var pokemonrarity = 'Rare'
        }
        else if (d <= 0.5) {
            var rarityid = 2
            var pokemonrarity = 'Uncommon'
        }
        else {
            var rarityid = 1
            var pokemonrarity = 'Common'
        }

        const params = {
            serverID: (message.guild.id),
            userID: (message.author.id)
        }

        // CATCHING CALCULATORS AND INFLUENCE
        let numberofballsthrown = 0
        let amountofinteractions = 0
        let baitused = 0
        let pokemonaggression = Math.floor(Math.random() * 8) + 2.5

        const Legendaries = [144, 145, 146, 150, 151, 243, 244, 245, 249, 250, 251, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 638, 638, 639, 640, 641, 642,, 643, 644, 645, 646, 647, 648, 649]
        const getlegendary = Legendaries[Math.floor(Math.random() * Legendaries.length)];
        const safarizonepokemonarray = [24, 46, 54, 55, 102, 115, 163, 164, 183, 193, 194, 195, 285, 298, 315, 316, 318, 339, 340, 397, 399, 400, 406, 451, 452, 453, 454, 455]
        const randomsafaripokemon = safarizonepokemonarray[Math.floor(Math.random()*safarizonepokemonarray.length)];
        if(rarityid === 4){
            var pokemonfound = getlegendary
        } else {
            var pokemonfound = randomsafaripokemon
        }
        const pokemonname = pokemon.getName(pokemonfound)

        
        const attachment = new MessageAttachment(`pokemon-media/graphics/pokemon/${folderdir}/${pokemonname.toLowerCase()}.gif`);
        const Safariembed = new Discord.MessageEmbed()
        .setAuthor(`A wild ${shinyplaceholder}${pokemonname} appeared!`, `https://archives.bulbagarden.net/media/upload/7/7c/PE_Grass.png`)
        .setDescription(`You have 3 attempts to try and catch it! \n RARITY: ${pokemonrarity}`)
        .setImage(`attachment://${pokemonname.toLowerCase()}.gif`)
        .setColor("#000000");

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('ball')
                .setLabel('Safari Ball')
                .setStyle('SUCCESS'),
            new MessageButton()
                .setCustomId('bait') 
                .setLabel('Bait')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('mud') 
                .setLabel('Mud')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('run')
                .setLabel('Run')
                .setStyle('DANGER'),   
        );
        
        const embedMessage = await message.channel.send({
            embeds: [Safariembed],
            files: [attachment],
            components: [row]
        });
        
        const collector = embedMessage.createMessageComponentCollector({
            time: 59000,
            filter: ({user}) => user.id === message.author.id
        });
        
        collector.on('collect', async interaction => {
            let remainingballs = 3 - numberofballsthrown
            const baitperturn = 1 //Set to "1" (technically 2) to prevent people from spamming bait.

            if(pokemonaggression > 6){ //Reactionary text to bait or mud or throwing a ball
                var reaction = 'The Pokemon is angry!'
            } else if (pokemonaggression >= 4.6 && pokemonaggression <= 5.9){
                var reaction = 'The Pokemon is visibly upset.'
            }else if (pokemonaggression >= 3 && pokemonaggression <= 4.5){
                var reaction = 'The Pokemon appears a bit bothered.'
            } else if (pokemonaggression >= 1.6 && pokemonaggression <= 3){
                var reaction = 'The Pokemon is unbothered by your presence'
            } else if (pokemonaggression >= 0 && pokemonaggression <= 1.5){
                var reaction = 'The Pokemon is calm'
            } else if (pokemonaggression < 0){
                var reaction = `It's like the Pokemon doesn't even acknowledge you..`
            } else {
                var reaction = 'The Pokemon is looking at you.'
            };

            const Caughtembed = new Discord.MessageEmbed() //Defining Embeds
                .setAuthor("Pokemon Caught!")
                .setDescription(`The ${shinyplaceholder}${pokemonname} has been sent to your pc! \n RARITY: ${pokemonrarity}`)
                .setImage(`attachment://${pokemonname.toLowerCase()}.gif`)
                .setColor("#000000");
            const Mudembed = new Discord.MessageEmbed()
                .setAuthor(`You threw some mud.`)
                .setDescription(`Balls remaining: ${remainingballs} \n RARITY: ${pokemonrarity} \n ${reaction}`)
                .setImage(`attachment://${pokemonname.toLowerCase()}.gif`)
                .setColor("#000000");
            const Fledembed = new Discord.MessageEmbed()
                .setAuthor(`The wild ${shinyplaceholder}${pokemonname} Fled..`)
                .setDescription(`Maybe we'll catch one next time.`)
                .setColor("#000000");
            const Angryfleeembed = new Discord.MessageEmbed()
                .setAuthor(`The wild ${shinyplaceholder}${pokemonname} Fled cause it got too angry!`)
                .setDescription(`Maybe we'll catch one next time.`)
                .setColor("#000000");
            const Runembed = new Discord.MessageEmbed()
                .setAuthor("You ran away.")
                .setDescription(`:(`)
                .setColor("#000000");

            amountofinteractions++
            if(amountofinteractions >= 10){ //Take too many turns, pokemon flees.
                var embedplaceholder = Fledembed
                    row.components[0].setDisabled(true)
                    row.components[1].setDisabled(true)
                    row.components[2].setDisabled(true)
                    row.components[3].setDisabled(true)
                    collector.stop()
            }

            if(interaction.customId === 'ball'){ //This must match the customId of the buttons listed above
                baitused = 0;
                row.components[1].setDisabled(false)
                numberofballsthrown++
                let remainingballs = 3 - numberofballsthrown
                let catchcalculator = (numberofballsthrown + pokemonaggression) / rarityid //Calculate every interaction
                console.log(catchcalculator)

                const Angryembed = new Discord.MessageEmbed()
                .setTitle(`The ${shinyplaceholder}${pokemonname} got angrier!`)
                .setDescription(`Balls remaining: ${remainingballs} \n RARITY: ${pokemonrarity} \n ${reaction}`)
                .setImage(`attachment://${pokemonname.toLowerCase()}.gif`)
                .setColor("#000000");

                if(numberofballsthrown === 3){ //If you throw more than 3 pokeballs, the pokemon will flee.
                    var embedplaceholder = Fledembed
                    row.components[0].setDisabled(true)
                    row.components[1].setDisabled(true)
                    row.components[2].setDisabled(true)
                    row.components[3].setDisabled(true)
                    collector.stop()
                } else if ((catchcalculator >= 1 && catchcalculator <= 3 && Math.random() < 0.5)){ //If you meet the right conditions, catch the pokemon
                    var embedplaceholder = Caughtembed
                    row.components[0].setDisabled(true)
                    row.components[1].setDisabled(true)
                    row.components[2].setDisabled(true)
                    row.components[3].setDisabled(true)
                    collector.stop()
                } else if (pokemonaggression > 6){ //If pokemon is too mad, it will run away
                    var embedplaceholder = Angryfleeembed
                    row.components[0].setDisabled(true)
                    row.components[1].setDisabled(true)
                    row.components[2].setDisabled(true)
                    row.components[3].setDisabled(true)
                    collector.stop()
                } else { //If you throw a pokemon and it isnt docile, it will get angrier
                    pokemonaggression++
                    var embedplaceholder = Angryembed
                };
            } else if (interaction.customId === 'bait'){
                if(baitused === baitperturn){
                    row.components[1].setDisabled(true)
                }
                if(pokemonaggression < 0){  //If the pokemon wont acknowledge you, then it wont eat the bait
                    var flavourtext = `The Pokemon won't take the bait..`
                } else {
                    var flavourtext = `The Pokemon ate the bait, its become more tame!`
                    pokemonaggression-- 
                    baitused++
                }
                const Baitembed = new Discord.MessageEmbed()
                .setTitle(`You threw some bait!`)
                .setDescription(`Balls remaining: ${remainingballs} \n RARITY: ${pokemonrarity} \n ${flavourtext} \n${reaction}`)
                .setImage(`attachment://${pokemonname.toLowerCase()}.gif`)
                .setColor("#000000");
                var embedplaceholder = Baitembed
            } else if (interaction.customId === 'mud') {
                row.components[1].setDisabled(false)
                baitused = 0;
                pokemonaggression++
                var embedplaceholder = Mudembed
            } else if (interaction.customId === 'run') {
                var embedplaceholder = Runembed
                row.components[0].setDisabled(true)
                row.components[1].setDisabled(true)
                row.components[2].setDisabled(true)
                row.components[3].setDisabled(true)
                collector.stop()
            }

            if(interaction.size >= 7){
                var embedplaceholder = Fledembed
                row.components[0].setDisabled(true)
                row.components[1].setDisabled(true)
                row.components[2].setDisabled(true)
                row.components[3].setDisabled(true)
                collector.stop()
            };
            await interaction.update({ embeds: [embedplaceholder], components: [row] });
        })
        
        collector.on('end', collected => console.log(`Collected ${collected.size} items`));
    }
}