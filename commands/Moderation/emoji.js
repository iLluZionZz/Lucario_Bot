const { MessageEmbed } = require("discord.js");
const moment = require('moment')
const yesno = {
  true: "Yes",
  false: "No"
}

module.exports = {
  name: "emoji-info",
  description: "Get emoji information",
  aliases: ["emoji"],
  category: "Moderation",
  usage: "<emoji>",
  async execute (client, message, args) {

    if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply("**You dont have permission to use this command.**");
    if(!args[0]) return message.reply("Please include an emoji to lookup.");
    const args1 = args[0]
    const regex = args1.replace(/^<a?:\w+:(\d+)>$/, "$1")
    const emoji = message.guild.emojis.cache.find((emoji) => emoji.name === args.join(" ") || emoji.id === regex)
    if (!emoji) return message.reply("That emoji is not in the server!")

    const emojiEmbed = new MessageEmbed()
      .setTitle("EMOJI INFORMATION")
      .addField("Name", `${emoji.name}`, true)
      .addField("ID", `${emoji.id}`, true)
      .addField("Animated", `${yesno[emoji.animated]}`, true)
      .addField("Added By", `${(await emoji.fetchAuthor()).tag}`, true)
      .addField("Added At", `${moment(emoji.createdTimestamp).format("LLL")}`, true)
      .addField("Emoji URL", `[Click Here](${emoji.url})`, true)
      .setColor("RANDOM")
      .setThumbnail(emoji.url)
    message.reply({ embeds: [emojiEmbed] })
  },
}