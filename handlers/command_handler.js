const fs = require('fs');

module.exports = (client, Discord) =>{
    //const command_files = fs.readdirSync(`./commands/`).filter(file => file.endsWith('.js'));
    const command_folders = fs.readdirSync(`./commands/`);

    for (const folder of command_folders){
        const command_files = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
        for (const file of command_files){
            const command = require(`../commands/${folder}/${file}`);
            if(command.name){
                client.commands.set(command.name, command);
            } else {
                continue;
            }
        }    
    }

    // NEW STUFF
    //const commandsArry = [];
    //commandsArry.push(command);            
    //client.on('ready', () => {
    //client.guilds.cache.get("579837419449221233")
    //})
    // NEW STUFF


    //for(const file of command_files){
        //const command = require(`../commands/${file}`);
        //if(command.name){
            //client.commands.set(command.name, command);
        //} else {
            //continue;
        //}
    //}
}