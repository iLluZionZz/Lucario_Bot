const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
    name: "help",
    aliases: ['h', 'commands', 'cmds'],
    description: "Shows all available bot commands.",

   /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    
  run: async (client, interaction, args) => {

    const roleColor =
      interaction.guild.members.me.displayHexColor === "#000000"
        ? "#ffffff"
        : interaction.guild.members.me.displayHexColor;
    if (!args[0]) {
      let categories = [];

      readdirSync("./SlashCommands/").forEach((dir) => {
        const commands = readdirSync(`./SlashCommands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../SlashCommands/${dir}/${command}`);

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
          `Here’s a list of all my functional slash commands! Unfortunately, not all traditional commands may be listed here, this is a work in progress! :(`
        )
        .setFooter(
          `Requested by ${interaction.user.tag}`,
          interaction.user.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return interaction.editReply({ embeds: [embed] });
    }
  }
};