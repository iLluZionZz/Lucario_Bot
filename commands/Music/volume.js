const { getVoiceConnection } = require('@discordjs/voice')
module.exports = {
    name: 'volume',
    description: 'Adjust the volume of the current Music Player',
    async execute(client, message, args, Discord) {
        const connection = getVoiceConnection(message.guild.id)
        if(!connection) return message.channel.send("I'm not in a voice channel!")
        if(!args[0]) return message.channel.send("Please enter a volume from 1-10!")

        let volume = /\d/g.exec(args)
        if(!volume) return message.channel.send("Please enter a number")

        resource.volume.setVolume(volume/10); //set the volume

        message.channel.send('Leaving channel :smiling_face_with_tear:')
 
    }
}


