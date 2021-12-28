const translate = require('@iamtraction/google-translate');
module.exports = {
    name: "translate",
    description: "translate a given text",
    async execute (client, message, args, Discord, cmd, profileData) {
        if(message.content.includes("@everyone") || message.content.includes("@here"))  return
        if(!args[0]) return message.channel.send('Provide a message to translate!');
        
        msg = args.slice(0).join(" "); // everything including and after args[1]

        const translated = await translate(msg, { to: 'en' });
        message.channel.send(`Translation from **"${msg}"**: \n ${translated.text}`)
    }
}