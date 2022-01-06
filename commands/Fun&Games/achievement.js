module.exports = {
    name: 'achievement',
    description: 'Create your own Minecraft Achievement!',
    //Use your own execute parameters
    execute(client, message, args, cmd) {
    const random = Math.floor((Math.random() * 40) + 1)
    const word = `${args.join("%20")}`
    message.delete()
    message.channel.send(`https://minecraftskinstealer.com/achievement/${random}/Achievement+Get%21/${word}`);
}
}