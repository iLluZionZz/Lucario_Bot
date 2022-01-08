const Discord = require('discord.js')
module.exports = {
    name: 'suggest',
    aliases: ['suggest', 'suggestion'],
    description: 'Creates a suggestion for people to vote for!',
    execute (client, message, args, Discord){
        const channel = client.channels.cache.get ('827497710830747658');
        if(!channel) return message.channel.send('suggestions channel does not exist!');
        if(!args[0]) return message.reply("you cannot suggest nothing!").then(msg => {msg.delete({timeout: 5000 /*time unitl delete in milliseconds*/})
        });

        let messageArgs = args.join(' ');
        const embed = new Discord.MessageEmbed()
        .setColor('FADF2E')
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(messageArgs)
        .setTimestamp();

        channel.send({ embeds: [embed] }).then((msg) =>{
            msg.react('👍');
            msg.react('👎');
            message.delete();
        }).catch((err)=>{
            console.log(err);
        });
    }
}