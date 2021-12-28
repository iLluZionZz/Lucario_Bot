module.exports = {
    name: "spotifysearch",
    description: "idek",

    async execute(client, message, args, Discord){
        let msglink = args.join('%20') // we're joining the args using %20, so if the args are Hello World it would be Hello%20World
        let msg = args.join(' ') // we're joining the args using a space. If you don't have the space Hello World would be HelloWorld
        let Capitalized = msg.charAt(0).toUpperCase() + msg.slice(1)

    if(!args[0]) return message.channel.send('Please give me a song name to search') // if there is not args[0] stop reading the code and send that message.

        let embed = new Discord.MessageEmbed() // making the embed
        .setColor('GREEN')
        .setTitle('Spotify')
        .setDescription(`Your search result: [${Capitalized}](https://open.spotify.com/search/${msglink})`) // this is how you make a hyperlink ONLY IN DESCRIPTIONS [message](link), the ${} is used to call a variable in a string. You can only use it when using backticks.

        message.channel.send({ embeds: [embed] }) // sending the embed
    }
}