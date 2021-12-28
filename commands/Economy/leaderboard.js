const fs = require('fs');
const jsonfile = require('jsonfile');

module.exports = {
    name: 'leaderboard',
    description: "displays list of people in server by order of xp / level]",
    async execute (client, message, args, Discord){
        let db = JSON.parse(fs.readFileSync('stats.json'));
        let stats = db[message.guild.id]
        console.log(stats)

        const c = Object.entries(stats).sort((a, b)=> b[1].level - a[1].level)

        const exampleEmbed = new Discord.MessageEmbed()
        .setTitle('Server Leaderboard!')
        .setDescription('Top 10 users:')
        for(const [key, value] of c) {
            const keyarray = [key]
            const list = keyarray.slice(0,10)
            const member = client.users.fetch(key)
            exampleEmbed.addField(`${member.displayName}`, `Level: ${value.level} | XP: ${value.xp}`)
            console.log(list)
        }
    
    message.channel.send({ embeds: [exampleEmbed] })
    .catch();
    }
}