module.exports = {
    name: 'clear',
    aliases: ['delete', 'purge'],
    description: "Clears messages",
    async execute (client, message, args){
        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply(`You can't use this command.`);
        if(!args[0]) return message.reply("Enter the amount of messages that you would like to clear.");
        if(isNaN(args[0])) return message.reply("Enter a number.");

        if(args[0] > 99) return message.reply("99 messages is the highest amount of messages you can clear.");
        if(args[0] < 1) return message.reply("1 messages is the least amount of messages you can clear.");
          
          const messages = await message.channel.messages.fetch({limit: ++args[0]})
          message.channel.send('Deleting '+args[0]+' messages in 5 seconds...').then(msg => {
            setTimeout(() => msg.channel.bulkDelete(messages), 5000)
        })
        }
}