module.exports = {
    name: 'huh',
    aliases: ['whatdahell', 'neptune', ],
    description: "Send reaction picture of comedically large faced cat",
    execute (client, message, args){
        message.channel.send('https://cdn.discordapp.com/attachments/821355803986362378/1063945354153836564/IMG_3019.jpg');
    }

}