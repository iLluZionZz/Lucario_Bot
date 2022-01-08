const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require("@discordjs/voice");
const { Message } = require('discord.js');

module.exports = {
    name: 'play',
    aliases: [], //We are using aliases to run the skip and stop command follow this tutorial if lost: https://www.youtube.com/watch?v=QBUJ3cdofqc
    cooldown: 0,
    description: 'Play music!',
    async execute(client, message, args, Discord, cmd){

        const requestedmusic = args.slice(1).join(' ');

        //Checking for the voicechannel and permissions (you can add more permissions if you like).
        if(!requestedmusic) return message.channel.send('You need to give me a link or Song name!')
        if(!message.member.voice.channel) return message.channel.send('You need to be a voice channel to execute this command!')
        if(!message.member.voice.channel.joinable) return message.channel.send('I need permission to join your voice channel!')

        let song = {};

        if(ytdl.validateURL(requestedmusic) === true){
            const songInfo = await ytdl.getInfo(requestedmusic);
            song = { Title: songInfo.videoDetails.title, url: songInfo.videoDetails.video_url }
            console.log("YTDL" + song.url)
        } else {
            const videofinder = async (query) =>{
                const videoresult = await ytSearch(query)
                return (videoresult.videos.length > 1) ? videoresult.videos[0] : null;
            }
            const video = await videofinder(requestedmusic)
            if(video){
                song = { Title: video.title, url: video.url }
                console.log("YTSEARCH" + song.url)
            } else {
                message.channel.send('Error finding Video')
            } 
        };
        const stream = ytdl((song.url), {filter: 'audioonly'});

        // const connection = joinVoiceChannel({
        //     channelId: message.member.voice.channel.id,
        //     guildId: message.member.guild.id,
        //     adapterCreator: message.channel.guild.voiceAdapterCreator
        // })

        const channelId = message.member.voice.channel.id
        console.log(channelId)
        client.channels.fetch(channelId).then(channel => {
        const VoiceConnection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator
        })
        //use a: direct mp3 link / file / 
        //Or for youtube: const ytdl = require("ytdl-core"); ytdl(https://youtu.be/dQw4w9WgXcQ)
        const resource = createAudioResource(stream, {
            inlineVolume: true
        }); //get the Audio
        resource.volume.setVolume(0.2); //set the volume
        const player = createAudioPlayer(); //Create a player
        VoiceConnection.subscribe(player);
        player.play(resource); //Play the audio resource

        }).catch(console.error);
        message.channel.send(`Now playing: ${song.Title} \n ${song.url}`)
    }
};
