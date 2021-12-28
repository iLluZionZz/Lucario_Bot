module.exports = {
    name: '8ball',
    description: 'Asks a question and let the bot determine your fate :sparkler:',
    async execute(client, message, args, Discord) {
      if (!args[0]) return message.channel.send('Please ask a full question!'); // return if no question is commenced
      const replies = ['Yes.', 'No.', 'Never.', 'Definitely.', 'Ask again later.']; // random responses
  
      const result = Math.floor(Math.random() * replies.length); // Get a random response for the array
      const question = args.join(' '); // join the args(Array<string>) to a question string
      // check permissions for embed
      if (message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
        const embed = new Discord.MessageEmbed() // create embed 
          .setAuthor('🎱 The 8 Ball says...')
          .setColor('ORANGE').addField('Question:', question)
          .addField('Answer:', replies[result]);
        await message.channel.send(embed); // send embed message
      } else {
        await message.channel.send(`**Question:**\n${question}\n**Answer:**\n${replies[result]}`); // no permissins so bot will default to a raw message
      }
    },
};