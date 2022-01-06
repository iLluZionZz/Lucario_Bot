module.exports = {
    name: 'help2',
    aliases: ['help', 'commands', 'cmds'],
    description: "Get a list of commands",
    execute (client, message, args, Discord) {
      const helpEmbed = new Discord.MessageEmbed()
      .setTitle(`Help`)
      .setDescription("Here’s a list of commands. Use help followed by a command name `.help [command]` to see help for that command! ")
      .addField("Command List", client.commands.map((cmd) => `\`${cmd.name}\``).join(', ') || "NONE")

      message.channel.send({ embeds: [helpEmbed] })
    },
};