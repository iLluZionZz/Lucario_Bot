require('dotenv').config();
const cooldowns = new Map();
const pokemoncollectionModel = require("../../models/pokemoncollectionSchema");
const profileModel = require("../../models/profileSchema");
module.exports = async (Discord, client, message) => {
    const prefix = process.env.PREFIX;
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd)); //Aliases

    if(!command){ return } //If command doesn't exist then don't do anything

    //If cooldowns map doesn't have a command.name key then create one.
    if(!cooldowns.has(command.name)){
        cooldowns.set(command.name, new Discord.Collection());
    }

    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.name);
    const cooldown_amount = (command.cooldown) * 1000;

    //If time_stamps has a key with the author's id then check the expiration time to send a message to a user.
    if(time_stamps.has(message.author.id)){
        const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;

        if(current_time < expiration_time){
            const time_left = (expiration_time - current_time) / 1000;
            const formatted_time_minutes = time_left / 60;
            const formatted_time_hours = time_left / 60 / 60;
            if(time_left >= 3600){
                return message.reply(`Please wait ${formatted_time_hours.toFixed(1)} more hours before using the command "${command.name}"`);
            } else if(time_left >= 60) {
                return message.reply(`Please wait ${formatted_time_minutes.toFixed(1)} more minutes before using the command "${command.name}"`);
            } else {
                return message.reply(`Please wait ${time_left.toFixed(0)} more seconds before using the command "${command.name}"`);
            }
        }
    }

    //If the author's id is not in time_stamps then add them with the current time.
    time_stamps.set(message.author.id, current_time);
    //Delete the user's id once the cooldown is over.
    setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);

    //Discord Economy Profile Creation
    let profileData;
    let pokemonData;
    try {
        profileData = await profileModel.findOne({ userID: message.author.id });
        pokemonData = await pokemoncollectionModel.findOne({ userID: message.author.id})
        if (!profileData) {
        let profile = await profileModel.create({
            userID: message.author.id,
            serverID: message.guild.id,
            coins: 1000,
            bank: 0,
            pokeballs: 0,
            greatballs: 0,
            ultraballs: 0,
            masterballs: 0,
            premierballs: 0,
            inventory: [],
        });
        profile.save();
        }
        if (!pokemonData) {
        let pokemoncollection = await pokemoncollectionModel.create({
            userID: message.author.id,
            serverID: message.guild.id,
            pokemon: [],
        });
        pokemoncollection.save();
        }
    }
    catch (err) {
        console.log(err);
    }

    try {
        command.execute(client, message, args, Discord, cmd, profileData, pokemonData);
    } catch (err) {
        message.reply('There was an error executing this command!')
        console.log(err);
    }
}