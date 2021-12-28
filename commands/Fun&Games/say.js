const { MessageFlags } = require("discord.js");

module.exports = {
    name: "say",
    description: "says something",

    
    async execute (client, message, args, Discord){  
        if(message.content.includes("@everyone") || message.content.includes("@here"))  return // if the message content includes @everyone OR ( || means or in js) @here, stop running the code. 
 
        if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send(`You don't have the required permissions.`)// if the user running the command doesn't have permissions to mannage messages, stop running the code. ! means no or doesn't in js.
        if(!args[0]) return message.channel.send('Provide a message to say!');
        message.delete() // deleting the command message

            msg = args.slice(0).join(" "); // everything including and after args[1]
            message.channel.send(msg) // sending the message in the text channel provided

        }
    }