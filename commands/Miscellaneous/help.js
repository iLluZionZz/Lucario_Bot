const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
  name: "help",
  aliases: ['h', 'commands', 'cmds'],
  description: "Shows all available bot commands.",
  async execute (client, message, args) {


    const roleColor =
      message.guild.members.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.members.me.displayHexColor;

    if (!args[0]) {
      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir,
          value: cmds.length === 0 ? "In progress." : cmds.join(" "),
        };

        categories.push(data);
      });

      const embed = new MessageEmbed()
        .setTitle("Help has arrived:")
        .addFields(categories)
        .setDescription(
          `Here’s a list of all my functional commands. My prefix is " \`${process.env.PREFIX}\` ". \n Use \`${process.env.PREFIX}help\` followed by a command to get additional info! \n To get a list of my slashcommands, use /help!`
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send({ embeds: [embed] });
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Invalid command! Use \`${process.env.PREFIX}help\` for all of my commands!`)
          .setColor("FF0000");
        return message.channel.send({ embeds: [embed] });
      }

      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .addField("PREFIX:", `\`${process.env.PREFIX}\``)
        .addField(
          "COMMAND:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "ALIASES:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "No aliases for this command."
        )
        .addField(
          "USAGE:",
          command.usage
            ? `\`${process.env.PREFIX}${command.name} ${command.usage}\``
            : `\`${process.env.PREFIX}${command.name}\``
        )
        .addField(
          "DESCRIPTION:",
          command.description
            ? command.description
            : "No description for this command."
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send({  embeds: [embed] });
    }
  },
};