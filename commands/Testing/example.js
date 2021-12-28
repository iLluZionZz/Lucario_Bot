module.exports = {
    name: 'examplecommand',
    description: "a test command for random shit",
    execute (client, message, args, Discord){
        const Rarecandy = client.emojis.cache.get("858192390757416970")
        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#FFFF00')
        .setTitle('Lucario Bot Commands!') 
        .setDescription(`${Rarecandy}`)
        .setTimestamp() 
    
    message.channel.send(exampleEmbed)
    }
}