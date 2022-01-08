// const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');

// module.exports = { // UNFINISHED
//     name: 'play',
//     aliases: ['skip', 'stop'], //We are using aliases to run the skip and stop command follow this tutorial if lost: https://www.youtube.com/watch?v=QBUJ3cdofqc
//     cooldown: 0,
//     description: 'Advanced music bot',
//     async execute(client, message, args, Discord, cmd){

//         client.on("ready", async () => { 
//             //U can use this function for joining multiple channels easily!
//             joinChannel("580136859896905749")
//             //Joining and playing audio in a channel
//             function joinChannel(channelId) {
//               client.channels.fetch(channelId).then(channel => {
//                 const VoiceConnection = joinVoiceChannel({
//                     channelId: channel.id,
//                     guildId: channel.guild.id,
//                     adapterCreator: channel.guild.voiceAdapterCreator
//                 })
//                 //use a: direct mp3 link / file / 
//                 //Or for youtube: const ytdl = require("ytdl-core"); ytdl(https://youtu.be/dQw4w9WgXcQ)
//                 const resource = createAudioResource("https://streams.ilovemusic.de/iloveradio109.mp3", {
//                     inlineVolume: true
//                 }); //get the Audio
//                 resource.volume.setVolume(0.2); //set the volume
//                 const player = createAudioPlayer(); //Create a player
//                 VoiceConnection.subscribe(player); //Subscribe the connection
//                 player.play(resource); //Play the audio resource
//                 player.on("idle", () => { //once its finished, stop and replay
//                     try { player.stop(); } catch (e) { } //Stop the player
//                     try { VoiceConnection.destroy(); } catch (e) { } //destroy the connection
//                     joinChannel(channel.id); //rejoin 
//                 });
//               }).catch(console.error)
//             }
//         });
//     }
// }
