module.exports = {
    name: 'uptime',
    description: "Tells us how long the bot has been alive.",
    run: async (client, interaction, args) => {
        const time = Math.round(process.uptime() * 10) / 10
        if (time > 86400){
            var formattime = time / 86400
            var variable = 'Day(s)'
        } else if (time > 3600){
            var formattime = time / 3600
            var variable = 'Hour(s)'
        } else if (time > 60){
            var formattime = time / 60
            var variable = 'Minute(s)'
        } else {
            var formattime = time
            var variable = 'Seconds'
        }
    
        interaction.editReply(`I've been online for ${formattime} ${variable}.`)
        .catch((err)=>{
            console.log(err);
        })
    }

}