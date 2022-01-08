const ms = require('ms');

module.exports = {
    name: "reminder",
    aliases: [`remind`],
    description: "Set a reminder for a certain time",
    async execute(client, message, args, Discord, cmd, profileData) {
            let time = args[0];
            let user = message.author
            let reminder = args.splice(1).join(' ')
        
            const notime = new Discord.MessageEmbed()
                .setColor('#F30B04')
                .setDescription(`**Please enter a time amount*`)
        
            const wrongtime = new Discord.MessageEmbed()
                .setColor('#F30B04')
                .setDescription(`**Please enter a time amount - d, h, m or s**`)

            const reminderembed = new Discord.MessageEmbed()
                .setColor('#F30B04')
                .setDescription(`**Please enter what you want to be reminded of**`)

                if (!args[0]) return message.channel.send({ embeds: [notime] });
            if (
                !args[0].endsWith("d") &&   
                !args[0].endsWith("m") &&
                !args[0].endsWith("h") &&
                !args[0].endsWith("s")
            )
        
        
                return message.channel.send({ embeds: [wrongtime] });
            if (!reminder) return channel.send({ embeds: [reminderembed] });
    
            const remindertime = new Discord.MessageEmbed()
            .setColor('#33F304')
            .setDescription(`\**I will remind you in ${time}**`)
            
        
            message.channel.send({ embeds: [remindertime] });
        
            const reminderdm = new Discord.MessageEmbed()
            .setColor('#7289DA')
            .setTitle('**REMINDER**')
            .setDescription(`**The ${time} for your reminder has passed! I should remind you of this:** ${reminder}`)
            setTimeout(async function () {
               try{
        
                await user.send({ embeds: [reminderdm] });
               }catch(err){
        
               }                
            }, ms(time));
    }
}