module.exports = {
    name: 'placeholder',
    description: "Shows the server store",
    async execute(client, message, args, Discord) {
 
        let embed = new Discord.MessageEmbed()
            .setColor('#e42643')
            .setTitle('Welcome to the Roles Channel!')
            .setDescription('Select your role(s) by reacting to the emojis below\n\n')
            .addFields(
                { name: 'General Roles', value: `${MaleEmoji} Male \n ${FemaleEmoji} Female \n ${NSFWEmoji} NSFW \n ${ServerUpdatesEmoji} Server Updates \n ${GiveawaysEmoji} Giveaways`},
                { name: 'Pokemon Roles', value: `${KantoEmoji} Kanto Region \n ${JohtoEmoji} Johto Region \n ${HoennEmoji} Hoenn Region \n ${SinnohEmoji} Sinnoh Region \n ${UnovaEmoji} Unova Region \n ${KalosEmoji} Kalos Region \n ${AlolaEmoji} Alola Region \n ${GalarEmoji} Galar Region`});
 
        let messageEmbed = await message.channel.send({ embeds: [embed] });
        messageEmbed.react(MaleEmoji);
        messageEmbed.react(FemaleEmoji);
        messageEmbed.react(NSFWEmoji);
        messageEmbed.react(ServerUpdatesEmoji);
        messageEmbed.react(GiveawaysEmoji);
        messageEmbed.react(KantoEmoji);
        messageEmbed.react(JohtoEmoji);
        messageEmbed.react(HoennEmoji);
        messageEmbed.react(SinnohEmoji);
        messageEmbed.react(UnovaEmoji);
        messageEmbed.react(KalosEmoji);
        messageEmbed.react(AlolaEmoji);
        messageEmbed.react(GalarEmoji);
 
        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === MaleEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(Male);
                }
                if (reaction.emoji.name === FemaleEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(Female);
                }
                if (reaction.emoji.name === NSFWEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(NSFW);
                }
            } else {
                return;
            }
 
        });
    }
 
}