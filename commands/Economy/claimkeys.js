fs = require('fs')
jsonfile = require('jsonfile')
module.exports = {
    name: 'claimkey',
    description: "test",
    async execute (client, message, args, Discord){

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
            .setTitle('Code claimed!')
            .setDescription(`Congrats, you just claimed your key! \n \`${userStats.key}\` \n This code will no longer work in the future.`)
            channel.send(exampleEmbed2)
            modchannel.send(exampleEmbed2) //Create 2 different embeds if you want a different one sent publicly and another sent to a mod only channel

        }else return message.channel.send(`You've already claimed a key! ${userStats.key}`)
    }      
};
