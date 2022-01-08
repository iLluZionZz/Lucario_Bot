module.exports = {
    name: "coinflip",
    description: "Flips a coin!",
    async execute (client, message, args, Discord){
        const choices= ["heads", "tails"];
        const choice = choices[Math.floor(Math.random() * choices.length)];
        return message.channel.send({embeds: [new Discord.MessageEmbed()
        .setTitle("Coinflip!")
        .setDescription(`You flipped a **${choice}**!`)
    .setThumbnail("https://i.pinimg.com/originals/d7/49/06/d74906d39a1964e7d07555e7601b06ad.gif")
        .setFooter(`This message was requested by ${message.author.username}`)]

    })
}
}