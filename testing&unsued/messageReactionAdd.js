module.exports = async (reaction, user) => {
    if(user.bot)return;
    if(reaction.message.channel.partial) await reaction.message.channel.fetch()
    if(reaction.message.partial) await reaction.message.fetch()
    if(reaction.partial) await reaction.fetch()
    console.log(`${user.tag} reacted with ${reaction.emoji}`)
}