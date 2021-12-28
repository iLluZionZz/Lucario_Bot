module.exports = {
    name: 'ping',
    description: "Gives the latency of the bot.",
    execute (client, message, args){
        message.reply(`🏓My response latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms. \n Also, I pinged you back :)`)
        .catch((err)=>{
            console.log(err);
        })
    }

}