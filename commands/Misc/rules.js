module.exports = {
    name: 'rules',
    description: "points the user towards the rules channel",
    execute (client, message, args){
        message.channel.send('Check out our rules channel for info. <#579845914785611827>')
        .then(msg => {
            setTimeout(() => msg.delete(), 20000)
        })
        .catch()
    }

}