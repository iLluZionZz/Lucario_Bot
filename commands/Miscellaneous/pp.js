module.exports = {
    name: "pp",
    aliases: ["weiner", "size"],
    permissions: [],
    description: "Example Command",
    execute(client, message, args, Discord) {
        let user = message.mentions.users.first() || message.author;
        let random = Math.floor(Math.random() * 10) + 1; // Get a random number
        let size = "";
        
        for(let i = 0; i < random; i++){
           size += "=";
        }
        
        let pp = "8" + size + "D";
        let description = `${user.username} weiner size: \n ${pp}`;
        
        // Create an embed message
        const embed = new Discord.MessageEmbed()
        .setAuthor(user.tag, user.displayAvatarURL())
        .setColor("RANDOM")
        .setTitle("Wang Measuring Machine")
        .setDescription(description)
        .setTimestamp()
        return message.channel.send({ embeds: [embed] });
    },
  };

