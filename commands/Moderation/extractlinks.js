const { MessageFlags } = require("discord.js");

module.exports = {
    name: "extractlinks",
    aliases: ['findlinks', 'getlink', 'getlinks'],
    description: "Takes links from a message",

    
    async execute (client, message, args, Discord){  
        const specialchannel = client.channels.cache.get('925964685851918386')
        if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send(`You don't have the required permissions.`)
        const linksRegex = /((([(https)(http)]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/g;
        if (linksRegex.test(message.content) === true) {
                            //  str.match(regex); // returns [ ["", "", ""] ]
        const usedLinks = message.content.match(linksRegex).map(d => d.slice(0));
        console.log(usedLinks)
        specialchannel.send(`Link extracted from message \n Previous message: \n ${message.content} \n Link: ${usedLinks}`) // sending the message in the text channel provided
        }
        message.delete() // deleting the command message

        }
    }


