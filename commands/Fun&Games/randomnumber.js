function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
    name: "randomnumber",
    aliases: ['numbergenerator'],
    description: 'Creates a random number',    
    execute(client, message, args, Discord){
        let min = args[0]
        let max = args[1]
        if(!min || !max){
            return message.channel.send("Please enter two numbers you want the random number to be between.")
        }
        if(isNaN(min || max)){
            return message.channel.send("Please enter a number!")
        }
    message.channel.send(`${randomInt(min, max)}`)
    }
}