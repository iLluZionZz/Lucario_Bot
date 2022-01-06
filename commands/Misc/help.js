module.exports = {
    name: 'help',
    aliases: 'h',
    description: "displays list of commands",
    execute (client, message, args, Discord){
        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#FFFF00')
        .setTitle('Lucario Bot Commands!') 
        .setDescription(`A list of all of my functional commands. My prefix is " ${process.env.PREFIX} " `)
        .addFields(
            { name: 'General Commands', value: `/Help - This command! :o \n /Vote - Forwards you to our voting page! \n /Profile - Your server profile \n /Pokedex - Find any pokemon by name or national dex number. \n /Ping - How fast I'm working! \n /Rules - Forwards you to the rules page. \n /Suggest - Suggest an idea to add to the server! \n /Trolling - We do a little trolling.` },
            { name: 'Administrator/Moderator Commands', value: '/Kick \n /Ban \n /Mute \n /Unmute \n /Clear - Delete a specific amount of messages'},
        )
        .setTimestamp() 
        .setFooter('This message will be deleted in 20 seconds.', message.author.displayAvatarURL({ dynamic: true }));
    
    message.channel.send({ embeds: [exampleEmbed] })
    .then(msg => {
        setTimeout(() => msg.delete(), 20000)
    })
    .catch()
    }
}