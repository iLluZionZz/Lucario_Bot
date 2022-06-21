module.exports = async function (Discord, client, oldMessage, newMessage) {
    if(oldMessage.embeds.length === 0 && newMessage.embeds.length === 1 ) return; //Discord is embeding a video or gif
    if(newMessage.author.bot) return;
    if(newMessage.content.length >= 200) return; //Embed fields can only fit 256 characters.
    
      let files = null;
            //add images if added (no videos possible)
            if (oldMessage.attachments.size > 0){
                if (oldMessage.attachments.every(attachIsImage)) {
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
    .setColor(`YELLOW`)
    .setAuthor(`${newMessage.author.tag} - Message Updated`, newMessage.author.displayAvatarURL())
    .addField(`Message Creation (DATE):`, `*\`${newMessage.createdAt}\`*`)
    .addField(`Channel Updated From:`, `${newMessage.channel} | \`${newMessage.channel.id}\` / *\`${newMessage.channel.name}\`*`)
     .addField(`Old Message Content:`, `\`\`\`\n${oldMessage.content.replace(/`/g, "'") || "Possible Embed"}\n\`\`\``)
    .addField(`New Message / Update:`, `\`\`\`\n${newMessage.content.replace(/`/g, "'") || "Possible Embed"}\n\`\`\``)
    .setImage(files)
    
    const LogChannel = client.channels.cache.get('925964685851918386')
    LogChannel.send({ embeds: [embed] })
};

