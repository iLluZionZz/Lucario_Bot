module.exports = {
    name: "bugreport",
    aliases: ['bug', 'reportbug'],
    cooldown: 20,
    description: 'Let users report bugs to developers',
    async execute(client, message, args, Discord){
        //the channel you want the bug-reports to be send to
        const channel = client.channels.cache.get('857458775736451092')

         //look if there is a bug specified
        const query = args.join(' ');
        if(!query) return message.reply('Please specify the bug')
        
         //create an embed for the bug report
        const reportEmbed = new Discord.MessageEmbed()
        .setTitle('New Bug!')
        .addField('Author', message.author.toString(), true)
        .addField('Guild', message.guild.name, true)
        .addField('Report', query)
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        channel.send({ embeds: [reportEmbed] });
        //send the embed to the channel
        message.channel.send(`${message.author.toString()}**Your bug report has been sent!**`).then(message.delete())
    }
}