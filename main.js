const Discord = require('discord.js');
require('dotenv').config();
const { Intents } = Discord;
const intents = new Intents ();

for(const intent of Object.keys (Intents.FLAGS)){
intents.add(intent);
}
const client = new Discord.Client({
    presence: {
        status: 'online',
        afk: false,
        activities: [{
            name: "/help",  //The message shown
			type: "PLAYING" //PLAYING: WATCHING: LISTENING: STREAMING:
        }],
    },
    intents: intents,
});
const fs = require('fs');
const mongoose = require('mongoose');
const jsonfile = require('jsonfile'); //Everything we need for stuff to work blah blah

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler =>{
	require(`./handlers/${handler}`)(client, Discord);
})

mongoose.connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('Connected to MongoDB database!')
}).catch((err) =>{
    console.log(err)
});

if(fs.existsSync('stats.json')) {
    stats = jsonfile.readFileSync('stats.json'); // Load the Stats for XP system before everything else
}

//Experience System
client.on('messageCreate', (message) => {
    if(message.author.id == client.user.id) 
        return;

    if(message.author.bot) return;

    if(message.guild.id in stats === false){
        if(message.guild.id = 858192074155622420){return}
        stats[message.guild.id] = {};
    }

    const guildstats = stats[message.guild.id];
    if(message.author.id in guildstats === false){
        guildstats[message.author.id] = {
            xp: 0,
            level: 0,
            last_message: 0,
        };
    }

    const userStats = guildstats[message.author.id];
    if(Date.now() - userStats.last_message > 60000) {
    userStats.xp += Math.round(Math.random(15) * 25);
    userStats.last_message = Date.now();

    userStats.xpToNextLevel = 5 * Math.pow(userStats.level, 2) + 50 * userStats.level + 100;
    if(userStats.xp >= userStats.xpToNextLevel) {
        userStats.level++;
        let guildmember = message.author.id  
        message.guild.members.fetch(guildmember)
        .then((member) => {
            if(userStats.level >= 5){
                member.roles.add('827465180957900821')
            }
            if(userStats.level >= 10){
                member.roles.add('827465047789797427')
            }
            if(userStats.level >= 15){
                member.roles.add('827464469680095253')
            }
            if(userStats.level >= 20){
                member.roles.add('827465775307816992')
                member.roles.add('829467048220295209')
            }
            if(userStats.level >= 25){
                member.roles.add('827465825605779456')
            }
            if(userStats.level >= 30){
                member.roles.add('827465868438011924')
            }
            if(userStats.level >= 35){
                member.roles.add('827465959438417921')
            }
            if(userStats.level >= 40){
                member.roles.add('827465912747032587')
            }
        })
        userStats.xp - userStats.xp - userStats.xpToNextLevel;
        message.reply(`<@${message.author.id}> has reached level ${userStats.level}!`)
        .catch((err)=>{
            console.log(err)});
    }
    } 

    jsonfile.writeFileSync('stats.json', stats);
    jsonfile.writeFileSync('statsbackup.json', stats);

    console.log(message.author.username + ' now has ' + userStats.xp);
    console.log(userStats.xpToNextLevel + ' xp needed for next level. ')

}); 

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`); //Woohooo!
});

client.login(process.env.DISCORD_TOKEN); //Welcome to life Lucario Bot :))