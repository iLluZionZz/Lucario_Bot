fs = require('fs')
jsonfile = require('jsonfile')
randomstring = require('randomstring')
module.exports = {
    name: 'createkey',
    description: "Create a key for a user to claim",
    async execute (client, message, args, Discord){

        if(message.member.permissions.has("ADMINISTRATOR")){

            const createdKey = randomstring.generate(10);
            console.log(createdKey)
            if(fs.existsSync('keys.json')) {
                keys = jsonfile.readFileSync('keys.json'); // Load the created key list before everything else
                }
            
            const target = message.mentions.users.first()
            if(!target){return message.channel.send('Please specificy a person to recieve a code.')}

            if(target == client.user.id) 
                return;

            if(message.guild.id in keys === false){
                keys[message.guild.id] = {};
            }

            const guildstats = keys[message.guild.id];
            if(target in guildstats === false){
                guildstats[target] = {
                    key: createdKey.slice(1) + randomstring.generate(1),
                    claimed: 0
                };
            } else return message.channel.send('You already have a key, you cannot create another one.');

            const userStats = guildstats[target];

            if(userStats.key === createdKey) return message.channel.send('Generated a duplicate key, try again.');
            console.log(userStats.key)

            //EMBED HERE
            const exampleEmbed = new Discord.MessageEmbed()
            .setAuthor('Pokedex', 'https://i.imgur.com/RWFriKR.png')
            .setColor("#4cb942")
            .setTitle('Wassup bitches')
            .setDescription("")
            .addField(` __Keys__ `    , ` ${target} Here is your key  \`${userStats.key}\`  `);
            message.channel.send(exampleEmbed)

            jsonfile.writeFileSync('keys.json', keys);
        } else return message.channel.send(`You don't have permission to use this command.`)   
    }
            
};