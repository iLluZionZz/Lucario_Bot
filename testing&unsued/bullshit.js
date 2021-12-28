const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js");
const randomstring = require("randomstring");
const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });

client.on('ready', () => {
  console.log("Logged in worked");

})

client.on("messageCreate", message => {

    if(message.content =="/claimkey") {

        if(message.member.hasPermission('ADMINISTRATOR')){

            const createdKey = randomstring.generate(10);
            console.log(createdKey)
            if(fs.existsSync('keys.json')) {
                keys = jsonfile.readFileSync('keys.json'); // Load the created key list before everything else
                }
            
                //REMEMBER KEY LIST MUST HAVE {} IN IT TO WORK 
                
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
        } else return message.channel.send(`You don't have permission to use this command.`);  
    };

    
    if(message.content =="/claimkey") {
    
        if(fs.existsSync('keys.json')) {
        keys = jsonfile.readFileSync('keys.json'); // Load the created key list before everything else
        }

        const guildstats = keys[message.guild.id];

        const convertedid = ('<@' + message.author.id + '>')
        console.log(convertedid)
        if(convertedid in guildstats === false){
            return message.channel.send(`You don't have a code!`)
        }

        const userStats = guildstats[convertedid];
        if((userStats.claimed) === 0){
        channel = client.channels.cache.get ('854458555997880341'); //Change this for your server
        modchannel = client.channels.cache.get ('854458555997880341'); //Change this for your server
        userStats.claimed ++;
        jsonfile.writeFileSync('keys.json', keys);
        const exampleEmbed2 = new Discord.MessageEmbed()
            .setAuthor('Pokedex', 'https://i.imgur.com/RWFriKR.png')
            .setColor("#4cb942")
            .setTitle('Wassup bitches')
            .setDescription(`Congrats, you just claimed your key! \n \`${userStats.key}\` \n This code will no longer work in the future.`)
            channel.send(exampleEmbed2)
            modchannel.send(exampleEmbed2) //Create 2 different embeds if you want a different one sent publicly and another sent to a mod only channel

        }else return message.channel.send(`You've already claimed this key! ${userStats.key}`)
    };
  
})