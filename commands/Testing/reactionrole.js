module.exports = {
    name: 'reactionrole',
    description: "Sets up a reaction role message!",
    async execute(client, message, args, Discord) {
        const channel = '827685511275216897';
        const Male = message.guild.roles.cache.find(role => role.name === "Male");
        const Female = message.guild.roles.cache.find(role => role.name === "Female");
        const NSFW = message.guild.roles.cache.find(role => role.name === "NSFW");
        const ServerUpdates = message.guild.roles.cache.find(role => role.name === "Updates");
        const Giveaways = message.guild.roles.cache.find(role => role.name === "Giveaways");
        const Kanto = message.guild.roles.cache.find(role => role.name === "Kanto Region");
        const Johto = message.guild.roles.cache.find(role => role.name === "Johto Region");
        const Hoenn = message.guild.roles.cache.find(role => role.name === "Hoenn Region");
        const Sinnoh = message.guild.roles.cache.find(role => role.name === "Sinnoh Region");
        const Unova = message.guild.roles.cache.find(role => role.name === "Unova Region");
        const Kalos = message.guild.roles.cache.find(role => role.name === "Kalos Region");
        const Alola = message.guild.roles.cache.find(role => role.name === "Alola Region");
        const Galar = message.guild.roles.cache.find(role => role.name === "Galar Region");
        const MaleEmoji = '🔵'
        const FemaleEmoji = '🔴'
        const NSFWEmoji = '🔞'
        const ServerUpdatesEmoji = '📣'
        const GiveawaysEmoji = '🎉'
        const KantoEmoji = '🏟️'
        const JohtoEmoji = '⛩️'
        const HoennEmoji = '🌊'
        const SinnohEmoji = '🗻'
        const UnovaEmoji = '🏙️'
        const KalosEmoji = '🗼'
        const AlolaEmoji = '🏖️'
        const GalarEmoji = '🚋'
 
        let embed = new Discord.MessageEmbed()
            .setColor('#e42643')
            .setTitle('Welcome to the Roles Channel!')
            .setDescription('Select your role(s) by reacting to the emojis below\n\n')
            .addFields(
                { name: 'General Roles', value: `${MaleEmoji} Male \n ${FemaleEmoji} Female \n ${NSFWEmoji} NSFW \n ${ServerUpdatesEmoji} Server Updates \n ${GiveawaysEmoji} Giveaways`},
                { name: 'Pokemon Roles', value: `${KantoEmoji} Kanto Region \n ${JohtoEmoji} Johto Region \n ${HoennEmoji} Hoenn Region \n ${SinnohEmoji} Sinnoh Region \n ${UnovaEmoji} Unova Region \n ${KalosEmoji} Kalos Region \n ${AlolaEmoji} Alola Region \n ${GalarEmoji} Galar Region`});
 
        let messageEmbed = await message.channel.send(embed);
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
                if (reaction.emoji.name === ServerUpdatesEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(ServerUpdates);
                }
                if (reaction.emoji.name === GiveawaysEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(Giveaways);
                }
                if (reaction.emoji.name === KantoEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(Kanto);
                }
                if (reaction.emoji.name === JohtoEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(Johto);
                }
                if (reaction.emoji.name === HoennEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(Hoenn);
                }
                if (reaction.emoji.name === SinnohEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(Sinnoh);
                }
                if (reaction.emoji.name === UnovaEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(Unova);
                }
                if (reaction.emoji.name === KalosEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(Kalos);
                }
                if (reaction.emoji.name === AlolaEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(Alola);
                }
                if (reaction.emoji.name === GalarEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(Galar);
                }
            } else {
                return;
            }
 
        });
 
        client.on('messageReactionRemove', async (reaction, user) => {
 
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === MaleEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(Male);
                }
                if (reaction.emoji.name === FemaleEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(Female);
                }
                if (reaction.emoji.name === NSFWEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(NSFW);
                }
                if (reaction.emoji.name === ServerUpdatesEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(ServerUpdates);
                }
                if (reaction.emoji.name === GiveawaysEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(Giveaways);
                }
                if (reaction.emoji.name === KantoEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(Kanto);
                }
                if (reaction.emoji.name === JohtoEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(Johto);
                }
                if (reaction.emoji.name === HoennEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(Hoenn);
                }
                if (reaction.emoji.name === SinnohEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(Sinnoh);
                }
                if (reaction.emoji.name === UnovaEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(Unova);
                }
                if (reaction.emoji.name === KalosEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(Kalos);
                }
                if (reaction.emoji.name === AlolaEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(Alola);
                }
                if (reaction.emoji.name === GalarEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(Galar);
                }
            } else {
                return;
            }
        });
    }
 
}