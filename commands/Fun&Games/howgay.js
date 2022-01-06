module.exports = {
    name: "howgay",
    description: "a howgay command",
    async execute (client, message, args, Discord) {
        let member = message.mentions.users.first() || message.author

        let rng = Math.floor(Math.random() * 101);

        const howgayembed = new Discord.MessageEmbed()
        .setTitle(`Gay Machine Calculator`)
        .setDescription(`${member.username} is ` + rng + "% Gay🌈")
        .setColor("GREEN")

        message.channel.send({ embeds: [howgayembed] })

    }
}