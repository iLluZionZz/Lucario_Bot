const { DiscordAPIError } = require("discord.js")

module.exports = {
    name: 'getrules',
    description: "Puts rules in rules channel with embed",
    execute (client, message, args, Discord){
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#A0FF3C')
        .setTitle('This embed contains a basic outline of server guidelines. These must be followed at all times by all members.')
        .addFields(
            {name: ':zero: Follow Discords ToS and Guidelines at all times.', value: 'Find them here: https://discord.com/terms | https://discord.com/guidelines'},
            {name: ':one: Be civil, respectful, and kind to the other server members. ', value: 'Do not engage in obnoxious or toxic behavior.'},
            {name: ':two: All moderation decisions are final.', value: 'Failure to comply with directions will result in additional reprimand. Disrespecting staff will not be tolerated.'},
            {name: ':three: NSFW content is not allowed whatsoever.', value: 'If you believe it may be NSFW, or borderline, ask a Mod first. This also includes NSFL, gore, and other sensitive media.'},
            {name: ':four: Unsolicited advertising and spam are prohibited.', value: 'This includes any links or directions given with the primary goal of personal gain of any sort.'},
            {name: ':five: No controversial/heavy topics or hate speech.', value: 'This includes politics, religion, racism, sexism, homophobia, suicide/self harm, etc'},
            {name: ':six: Keep chat understandable and coherent.', value: 'English only, stay on topic. Spaming emotes, reactions, or memes in other channels will result in moderation.'},
            {name: ':seven: Certain content/actions such as, but not limited to, pornographic/NSFL/gore content, unsolicited DM advertising, raiding and trolling upon joining are considered an instant ban.', value: 'Ban evasion of any sort is also an instant ban.'}
        )
        .setFooter(`These rules are a basic outline of our community guidelines. They may change at any time. To read our full rules, consult the respective channel using ${process.env.PREFIX}rules.`);

        message.channel.send({ embeds: [newEmbed] });
    }

    

}