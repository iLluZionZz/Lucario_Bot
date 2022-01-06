const axios = require('axios');
module.exports = {
    name: 'banner',
    aliases: ['background'],
    description: 'Return a user(s) avatar picture!',
    //Use your own execute parameters
    async execute(client, message, args, cmd) {
        const user = message.mentions.users.first() || client.users.cache.get(args[0]) || await client.users.fetch(args[0]).catch(err => undefined);
        const data = await axios.get(`https://discord.com/api/users/${user.id}`, {
            headers: {
                Authorization: `Bot ${client.token}`
            }
        }).then(d => d.data);
        //if there is a banner, send it as a gif or png
        if (data.banner) {
            let url = data.banner.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096"
            url = `https://cdn.discordapp.com/banners/${user.id}/${data.banner}${url}`
            message.reply(url)
        }
        //else show info that he has no banner!
        else {
            message.reply(`:x: **Has no Banner!**`)
        }
    }
}