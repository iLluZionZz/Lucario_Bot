module.exports = {
    name: 'vote',
    description: "gives the user links to the voting page for the server.",
    execute (client, message, args, Discord){
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#0375ff')
        .setTitle('Links')
        .addFields(
            {name: 'Below are the links to our voting page!', value: 'https://top.gg/servers/579837419449221233/vote'}
        )
        .setFooter('Our reward system is currently in progress.');

        message.channel.send({ embeds: [newEmbed] })
        .then(msg => {
            msg.delete({ timeout: 5000 /*time unitl delete in milliseconds*/});
        })
    }
}