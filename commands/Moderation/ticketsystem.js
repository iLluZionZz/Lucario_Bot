module.exports = {
    name: "ticketcreate",
    permissions: ["ADMINISTRATOR"],
    description: "Setup a Ticket System",
    async execute(client, message, args, Discord, interaction) {

        const guild = message.guild

        const embed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setAuthor(message.guild.name, message.guild.iconURL({
                dynamic: true
            }))
            .setDescription(
                "__**How to make a ticket**__\n" +
                "> Click on the button relating to your issue.\n" +
                "> Please state your reason for opening a ticket, and wait for a staff member to assist you.\n" +
                "> For previous ticket reviews, please supply your ticket number that was Dmed to you."

            )
            .setTitle('Tickets')


        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                .setCustomId('report')
                .setLabel('📝 Player Report')
                .setStyle('PRIMARY'),
                new Discord.MessageButton()
                .setCustomId('support')
                .setLabel('❓ Support Ticket')
                .setStyle('SECONDARY'),
                new Discord.MessageButton()
                .setCustomId('modmail')
                .setLabel('📩 Modmail')
                .setStyle('SUCCESS'),
            );
        

        await guild.channels.cache
            .get(process.env.OPENTICKETID)
            .send({ embeds: [embed], components: [row] });
    }
};    