module.exports = {
    name: 'rules',
    description: "Points the user towards the rules channel",
    execute (client, message, args){
        const ruleschannel = ("579845914785611827")
        message.channel.send(`Check out our rules channel for our server guidlines. <#${ruleschannel}>`)
        .then(msg => {
            setTimeout(() => msg.delete(), 20000)
        })
        .catch()
    }

}