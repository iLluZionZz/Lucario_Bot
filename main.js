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
            name: `${process.env.PREFIX}help`,  //The message shown
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
client.slashCommands = new Discord.Collection();

['command_handler', 'event_handler', 'slashcommand_handler'].forEach(handler =>{
	require(`./handlers/${handler}`)(client, Discord);
})

mongoose.connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(()=>{
    console.log('Connected to MongoDB database!')
}).catch((err) =>{
    console.log(err)
});



client.on("warn", console.log) //Anything Wrong with the bot
client.on("debug", console.log)
client.on("rateLimit", console.log)
client.on("error", console.log)

client.login(process.env.DISCORD_TOKEN); //Welcome to life Lucario Bot :))