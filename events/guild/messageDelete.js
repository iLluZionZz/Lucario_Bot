module.exports = async (Discord, client, message) => {
    if(message.partial) return;
    if(message.author.id == client.user.id) return;
    if(message.author.bot) return;

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
        }
    }

    let files = null;
            if (message.attachments.size > 0){
                if (message.attachments.every(attachIsImage)) {
                    files = url
                }
            }

    function attachIsImage(msgAttach) {
                url = msgAttach.url || null;
                imagename = msgAttach.name || `Unknown`;
                return url.indexOf(`png`, url.length - 3 ) !== -1 ||
                    url.indexOf(`jpeg`, url.length - 4 ) !== -1 ||
                    url.indexOf(`gif`, url.length - 3) !== -1 ||
                    url.indexOf(`jpg`, url.length - 3) !== -1;
            }

    const embed = new Discord.MessageEmbed()
    .setColor(`RED`)
    .setAuthor(`${message.author.tag} - Message Deleted`, message.author.displayAvatarURL())
    .addField(`Message Creation (DATE):`, `*\`${message.createdAt}\`*`)
    .addField(`Channel Deleted From:`, `${message.channel} | \`${message.channel.id}\` / *\`${message.channel.name}\`*`)
    .addField(`Message Deleted:`, `\`\`\`\n${message.content.replace(/`/g, "'") || "Possible Embed"}\n\`\`\``)
    .setImage(files)

    const LogChannel = client.channels.cache.get('925964685851918386')
    LogChannel.send({ embeds: [embed] })
};