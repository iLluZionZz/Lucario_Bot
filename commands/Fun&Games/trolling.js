module.exports = {
    name: 'trolling',
    description: "Send miniscule amount of tomfoolery gif",
    execute (client, message, args){
        message.channel.send('https://tenor.com/view/tomfoolery-cat-gif-20855967');
    }

}