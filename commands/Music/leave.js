const { getVoiceConnection } = require('@discordjs/voice')
module.exports = {
    name: 'leave',
    description: 'Stop the bot and leave the channel',
    async execute(client, message, args, Discord) {
        const connection = getVoiceConnection(message.guild.id)

        if(!connection) return message.channel.send("I'm not in a voice channel!")

        connection.destroy()

        message.channel.send('Leaving channel :smiling_face_with_tear:')
 
    }
}
