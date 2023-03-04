const fs = require('fs')

module.exports = {
    name: "sprite",
    aliases: ["3dpokemon"],
    permissions: [],
    usage: "<sprite> <shiny>",
    description: "Get a sprite of the Pokemon specified - up to generation 8",
    execute(client, message, args, Discord ) {
        const ValidPokemonList = fs.readFileSync('pokemon.txt').toString('utf-8');
        const removewhitespaces = ValidPokemonList.trim();
        const Formattextbyline = removewhitespaces.split(/\r?\n/)
        //Taking our list of valid Pokemon names and making an array
        
        const Spritequery = args[0]
        const formorshiny = args[1]
        if(!Spritequery){
            return message.channel.send("Please enter a Pokemon name!")
        }
        spriteisshiny = false
        if(spriteisshiny === true){
            var path = "ani-front-shiny"
        } else {
            var path = "ani-front-all"
        };
        //Finding if the Pokemon is shiny or a mega form
        
        try{ //Attempt to grab the sprite image
            const converttostring = Spritequery.toString('utf-8');
            const lowercasetext = converttostring.toLowerCase();
            const searchabletext = lowercasetext.replace(/\s/g,'');
            const validpokemon = searchabletext.charAt(0).toUpperCase() + lowercasetext.slice(1);
            if(Formattextbyline.includes(validpokemon)){
                message.channel.send({files: [`../../Desktop/Lucario_Bot/pokemon-media/graphics/pokemon/${path}/${searchabletext}.gif`] });
            } else {
                return message.reply("This is not a valid Pokemon!")
            };
        } catch (err){
            message.channel.send("An error occured. \n  The Pokemon you entered is not correct or this Pokemon is not documented. Contact <@304028144761831424> (iLluZionZz#0628) if you believe there is an error.")
            console.log("POKEMON SPRITE ERROR:" + err)
        }

    },
  };