const lyrics = require('lyrics-finder'); // npm i lyrics-finder
const yt = require('yt-search'); // npm i yt-search

module.exports = {
    name: 'lyrics',
    description: 'Searches song lyrics from Google',
    async execute(client, message, args, Discord) {
        if (!args.length) return message.channel.send('No song specified'); // Handles empty search queries

        let newembed = new Discord.MessageEmbed().setColor('RANDOM').setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL()); // Constructing the embed
        let lyric = await lyrics(args.join(' ')); // Searching for the lyrics on Google
        let noLyric = 0 // Indicates if the lyrics exist or not

        if (!lyric) {
            lyric = `No Lyrics found for ${args.join(' ')}`; // Handles no lyrics
            noLyric++ // Increments noLyric to indicate theres no lyrics
        }

        newembed.setDescription(lyric.length >= 4093 ? lyric.substring(0, 4093) + '...' : lyric); // Adds the lyrics to the embed

        if (noLyric == 0) {
            let res = await yt.search(args.join(' ')); // Searches the song name on youtube
            let song = res.videos[0]; // Chooses the first result
            if (song) newembed.setTitle(song.title).setURL(song.url).setThumbnail(song.image) // Adds the youtube video data to the embed
        }

        message.channel.send({ embeds: [newembed]}) // Sends the embed
    }
}