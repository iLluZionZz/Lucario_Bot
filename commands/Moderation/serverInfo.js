const moment = require('moment')
module.exports = {
    name: 'serverinfo',
    description: 'Gets the current servers information.',
    aliases: ['guildinfo', 'currentguild'],
    async execute (client, message, args, Discord){

        const embed = new Discord.MessageEmbed()
        .setTitle(`Server Information`)
        .setColor('#0375ff')
        .addFields(
            { name: `Server Name:`, value: `${message.guild.name}`, inline: true},
            { name: `Owner ID:`, value: `${message.guild.ownerId}`, inline: true},
            { name: `Server ID:`, value: `${message.guild.id}`, inline: true},
            //{ name: `ShardID:`, value: `${message.guild.shardId}`, inline: true},
            { name: `Available:`, value: `${message.guild.available}`, inline: true},
            { name: `Region:`, value: `${message.guild.region}`,inline: true},
            { name: `Icon Server:`, value: `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.webp?size=128`, inline: true},
            { name: `Splash:`, value: `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.splash}`, inline: true},
            { name: `Discovery Splash:`, value: `${message.guild.discoverySplash}`, inline: true},
            { name: `Member Count:`, value: `${message.guild.memberCount}`, inline: true},
            { name: `Large:`, value: `${message.guild.large}`, inline: true},
            { name: `ApplicationID:`, value: `${message.guild.applicationId}`, inline: true},
            { name: `AFK Timeout:`, value: `${message.guild.afkTimeout}`, inline: true},
            { name: `AFK Channel ID:`, value: `${message.guild.afkChannelId}`, inline: true},
            { name: `System Channel ID:`, value: `${message.guild.systemChannelId}`, inline: true},
            { name: `Embed Enabled:`, value: `${message.guild.embedEnabled}`, inline: true},
            { name: `Level Server Boost:`, value: `${message.guild.premiumTier}`, inline: true},
            { name: `Number Boost:`, value: `${message.guild.premiumSubscriptionCount}`, inline: true},
            { name: `Verification Level:`, value: `${message.guild.verificationLevel}`, inline: true},
            { name: `Explicit Content Filter:`, value: `${message.guild.explicitContentFilter}`, inline: true},
            //{ name: `MFA Level:`, value: `${message.guild.mfaLevel}`, inline: true},
            //{ name: `Joined Timestamp:`, value: `${message.guild.joinedTimestamp}`, inline: true},
            //{ name: `Default Message Notifications:`, value: `${message.guild.defaultMessageNotifications}`, inline: true},
            //{ name: `Maximum Members:`, value: `${message.guild.maximumMembers}`, inline: true},
            //{ name: `Maximum Presences:`, value: `${message.guild.maximumPresences}`, inline: true},
            //{ name: `Approximate Member Count:`, value: `${message.guild.approximateMemberCount}`, inline: true},
            //{ name: `Approximate Presence Count:`, value: `${message.guild.approximatePresenceCount}`, inline: true},
            //{ name: `Vanity URL Code:`, value: `${message.guild.vanityURLCode}`, inline: true},
            { name: `Vanity URL Uses:`, value: `${message.guild.vanityURLUses}`, inline: true},
            { name: `Description Server:`, value: `${message.guild.description}`, inline: true},
            { name: `Server Banner:`, value: `${message.guild.banner}`, inline: true},
            { name: `Rules Channel ID:`, value: `${message.guild.rulesChannelId}`, inline: true},
            { name: `Public Updates Channel ID:`, value: `${message.guild.publicUpdatesChannelId}`, inline: true},
            { name: `Preferred Locale:`, value: `${message.guild.preferredLocale}`, inline: true}
        )
        .setTimestamp()
        .setFooter(`This message was requested by ${message.author.username}`);
    
    message.channel.send({ embeds: [embed] })

    .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
    }
}
