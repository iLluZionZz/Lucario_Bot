module.exports = async (Discord, client, message) => {
        if (message.author.bot) return;
        if (message.channel.type === 'dm') return;
        if (message.content.includes('@')) {
            let channel = "925964685851918386"
            if (channel) {
                const embed = new Discord.MessageEmbed()
                    .setTitle('Ghostping Found!')
                    .setDescription(`${message.author.username} (ID: ${message.author.id}) has deleted their message & ghost pinged! \n Message: **${message.content}** \n In channel: <#${message.channel.id}>`)
                    .setColor('RED')
                message.guild.channels.cache.get(channel).send({
                    embeds: [embed]
                });
            } else {
                return;
            }
        }
}