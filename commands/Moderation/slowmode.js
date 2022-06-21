module.exports = {
    name: 'slowmode',
    description: 'Sets Slowmode for a Channel',
async execute(client, message, args, Discord){
    const member = message.mentions.users.first();
    if(!message.member.permissions.has('ADMINISTRATOR', 'KICK_MEMBERS')){
        message.channel.send(new Discord.MessageEmbed() .setDescription('You Cannot do that, Missing Permissions') .setColor('RED'))
        return;
    }

    if (!args[0]) return message.channel.send({embeds: [
        new Discord.MessageEmbed()
        .setDescription('Please enter the # of seconds for slowmode to be set to.') 
        .setColor('RED')
        ]});
    if (isNaN(args[0])) return message.channel.send({embeds: [
        new Discord.MessageEmbed() 
        .setDescription('Please type a real number!') 
        .setColor('RED')
        ]});
    if (args[0] > 21600 || args[0] < 1) return message.channel.send({embeds: [
        new Discord.MessageEmbed() 
        .setDescription('Number must be between 1 - 21600') 
        .setColor('RED')
        ]});

    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || message.channel

    try {
        channel.setRateLimitPerUser(args[0])
        return message.channel.send({embeds: [
            new Discord.MessageEmbed() 
            .setTitle('Slow Mode has been Enabled!')
            .setDescription(`Slow Mode set to ${args[0]} seconds.`) 
            .setColor('RED')
            ]});
    } catch(err) {
        message.channel.send('Error Occured!')
        err ? console.error(err) : console.log('Uknown Error')
    }
}
}