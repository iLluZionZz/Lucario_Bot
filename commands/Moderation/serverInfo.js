const moment = require('moment')
module.exports = {
    name: 'serverinfo',
    description: 'gets info from a user',
    aliases: ['guildinfo', 'currentguild'],
    async execute (client, message, args, Discord){

        const embed = new Discord.MessageEmbed()
        .setTitle(`Server Information`)
        .setColor('#0375ff')
        .addFields(
            { name: `Owner ID:`, value: `${message.guild.ownerId}`},
            { name: `Server Name:`, value: `${message.guild.name}`},
            { name: `Available:`, value: `${message.guild.available}`},
            { name: `Server ID:`, value: `${message.guild.id}`},
            { name: `ShardID:`, value: `${message.guild.shardId}`},
            { name: `Icon Server:`, value: `${message.guild.icon}`},
            { name: `Splash:`, value: `${message.guild.splash}`},
            { name: `Discovery Splash:`, value: `${message.guild.discoverySplash}`},
            { name: `Region:`, value: `${message.guild.region}`},
            { name: `Member Count:`, value: `${message.guild.memberCount}`},
            { name: `Large:`, value: `${message.guild.large}`},
            { name: `ApplicationID:`, value: `${message.guild.applicationId}`},
            { name: `AFK Timeout:`, value: `${message.guild.afkTimeout}`},
            { name: `AFK Channel ID:`, value: `${message.guild.afkChannelId}`},
            { name: `System Channel ID:`, value: `${message.guild.systemChannelId}`},
            { name: `Embed Enabled:`, value: `${message.guild.embedEnabled}`},
            { name: `Level Server Boost:`, value: `${message.guild.premiumTier}`},
            { name: `Number Boost:`, value: `${message.guild.premiumSubscriptionCount}`},
            { name: `Verification Level:`, value: `${message.guild.verificationLevel}`},
            { name: `Explicit Content Filter:`, value: `${message.guild.explicitContentFilter}`},
            { name: `MFA Level:`, value: `${message.guild.mfaLevel}`},
            { name: `Joined Timestamp:`, value: `${message.guild.joinedTimestamp}`},
            { name: `Default Message Notifications:`, value: `${message.guild.defaultMessageNotifications}`},
            { name: `Maximum Members:`, value: `${message.guild.maximumMembers}`},
            { name: `Maximum Presences:`, value: `${message.guild.maximumPresences}`},
            { name: `Approximate Member Count:`, value: `${message.guild.approximateMemberCount}`},
            { name: `Approximate Presence Count:`, value: `${message.guild.approximatePresenceCount}`},
            { name: `Vanity URL Code:`, value: `${message.guild.vanityURLCode}`},
            { name: `Vanity URL Uses:`, value: `${message.guild.vanityURLUses}`},
            { name: `Description Server:`, value: `${message.guild.description}`},
            { name: `Server Banner:`, value: `${message.guild.banner}`},
            { name: `Rules Channel ID:`, value: `${message.guild.rulesChannelId}`},
            { name: `Public Updates Channel ID:`, value: `${message.guild.publicUpdatesChannelId}`},
            { name: `Preferred Locale:`, value: `${message.guild.preferredLocale}`}
        )
        .setTimestamp()
        .setFooter(`This message was requested by ${message.author.username}`);
    
    message.channel.send({ embeds: [embed] })

    .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
    }
}
