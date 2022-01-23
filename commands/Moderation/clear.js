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

         // helper so you can await a setTimeout
         function sleep(seconds) {
            return new Promise(r => setTimeout(r, seconds * 1000))
          }
          
          const messages = await message.channel.messages.fetch({limit: ++args[0]})
          message.channel.send('Deleting '+args[0]+' messages in 5 seconds...')
          await sleep(5) // see above
          message.channel.bulkDelete(messages)
        }
}