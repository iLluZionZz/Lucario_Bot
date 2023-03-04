const createTranscript = require('discord-html-transcripts');

module.exports = async function (Discord, client, interaction) {
    if(interaction.isUserContextMenu()){
        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd) return interaction.followUp({ content: "An error has occured " });
        
        const args = [];
        
        try {
        cmd.run(client, interaction, args);
        } catch (err) {
            interaction.reply('An error has occured.')
            console.log(err);
        }
    };

    if(interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});
      
        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "An error has occured " });
      
        const args = [];
      
        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(
            interaction.user.id
        );
        try {
        cmd.run(client, interaction, args);
        } catch (err) {
            interaction.reply('An error has occured.')
            console.log(err);
        }
        
        // try {
        //     cmd.execute(interaction, client, args)
        // } catch (err) {
        //     interaction.reply('An error has occured.')
        //     console.log(err);
        // }
        
    };

    if(interaction.isContextMenu()){
        return
    };

    if(interaction.isModalSubmit()){
        return
    };
    
    
    
    if(interaction.isButton()){
            if (interaction.customId === 'report' || interaction.customId === 'support' || interaction.customId === 'modmail') {
                const randomid = Math.floor(Math.random() * 90000) + 10000;
                const ticketreason = interaction.customId
                await interaction.guild.channels.create(ticketreason + '-' + randomid, {
                    type: 'GUILD_TEXT',
                    parent: '827732882872205334',
                    permissionOverwrites: [
                        {
                            id: interaction.user.id,
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
                        },
                        {
                            id: client.user.id,
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
                        },
                        {
                            id: '579854468615766016', //ADMINISTRATOR
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
                        },
                        {
                            id: '827682991131459585', //MODERATOR
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
                        },
                        {
                            id: process.env.EVERYONEID,
                            deny: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                        }
                    ]
                }).then( async (channel) => {
                    const needscapitalization = interaction.customId
                    const capitalized = needscapitalization.charAt(0).toUpperCase() + needscapitalization.slice(1)
                    const embed = new Discord.MessageEmbed()
                    .setTitle(`${capitalized} Ticket - ${randomid}`)
                    .setDescription('Hello there, \n A member of staff will soon come to assist you. \nIn the meantime, please explain your issue; Thank You!')
                    .setColor('GREEN')
                    .setTimestamp()
                    .setAuthor(interaction.guild.name, interaction.guild.iconURL({
                        dynamic: true
                    }));

                const del = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                        .setCustomId('del')
                        .setLabel('🗑️ Delete Ticket!')
                        .setStyle('DANGER'),
                    );
                channel.send({
                    content: `Welcome ${interaction.user.username},`,
                    embeds: [embed],
                    components: [del]
                })
                if(interaction.customId = 'modmail'){
                    channel.send({ content: '<@&579854468615766016>, <@&827682991131459585>'})
                };
                const dmembed = new Discord.MessageEmbed()
                    .setAuthor(interaction.guild.name, interaction.guild.iconURL({
                        dynamic: true
                    }))
                    .setTitle(`Ticket Reciept: ${capitalized} Ticket - ${randomid}`)
                    .setDescription(`Your ticket has been opened. <#${channel.id}>\nTicket Number: ${randomid} \n If you wish to review your ticket or be supplied a copy in the future, please provide a staff member with this number.`)
                    .setColor('GREEN')
                    .setTimestamp()
                interaction.user.send({ embeds: [dmembed] });
                interaction.reply({ content: `Created Ticket! <#${channel.id}>`, ephemeral: true });
                });
            };



            if(interaction.customId === 'del') {
                const channel = interaction.channel

                const attachment = await createTranscript.createTranscript(channel, {
                    limit: -1,
                    returnBuffer: false,
                    fileName: `${channel.name} - ${channel.id}.html`,
                    saveImages: true,
                });
                
                const transcriptembed = new Discord.MessageEmbed()
                .setTitle(`Transcript for ${channel.name} | Channel ID: ${interaction.channel.id}`)
                .setAuthor(interaction.guild.name, interaction.guild.iconURL({
                    dynamic: true
                }))
                .setDescription(`User that closed ticket: <@${interaction.user.id}> | ID:${interaction.user.id}`)
                .setFooter(`This does not include messages that were deleted.`)
                .setTimestamp();

                const transcriptchannel = await interaction.guild.channels.cache.get(`${process.env.TRANSCRIPTSID}`).send({
                    embeds: [
                        transcriptembed
                    ],
                    files: [attachment],
                });

                interaction.reply({ content: `The ticket has been saved and will be closed in 10 seconds.` })
                setTimeout(() => {
                    channel.delete();
                }, 10 * 1000)
            }

            if(interaction.customId === 'refresh') {

                const time = Math.round(process.uptime() * 10) / 10
                if (time > 86400){
                    var formattime = time / 86400
                    var variable = 'day(s)'
                } else if (time > 3600){
                    var formattime = time / 3600
                    var variable = 'hour(s)'
                } else if (time > 60){
                    var formattime = time / 60
                    var variable = 'minute(s)'
                } else {
                    var formattime = time
                    var variable = 'seconds'
                }

                const statembed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setTitle(`**${client.user.username} Stats**`)
                .setAuthor(interaction.guild.name, interaction.guild.iconURL({
                    dynamic: true
                }))
                .addFields(
                    { name: "Discord.js", value: `\`${Discord.version}\``, inline: true },
                    { name: "Node.js", value:`\`${process.version}\``, inline: true },
                    { name: "🕑 Last Refreshed", value: `<t:${(Math.floor(Date.now() / 1000))}:R>`, inline: true },
                    { name: `Latency`, value: `\`${(client.ws.ping.toFixed(2))}ms\``, inline: true },
                    { name: `Uptime`, value: `\`${formattime.toFixed(2)}\` ${variable}`, inline: true },
                    { name: 'Platform:', value: `\`${process.platform} ${process.arch}\``, inline: true },
                    { name: `Commands`, value: `\`${client.commands.size}\``, inline: true },
                    { name: "Servers", value: `\`${client.guilds.cache.size}\``, inline: true },
                    { name: "Users", value: `\`${client.guilds.cache.filter((e) => e.memberCount).reduce((a, g) => a + g.memberCount, 0)}\``, inline: true },
                    )
                .addField("**Cached Data:**", `Users: \`${client.users.cache.size}\`\n Emojis: \`${client.emojis.cache.size}\``)
                .addField("**Memory:**", `\`${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}\` MB RSS \n \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}\` MB Heap (in use)\n \`${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)}\` MB Heap (Total)`, true)


                await interaction.update({
                    embeds: [statembed]
                })
            }

                // const time = Math.round(process.uptime() * 10) / 10
                // if (time > 86400){
                //     var formattime = time / 86400
                //     var variable = 'day(s)'
                // } else if (time > 3600){
                //     var formattime = time / 3600
                //     var variable = 'hour(s)'
                // } else if (time > 60){
                //     var formattime = time / 60
                //     var variable = 'minute(s)'
                // } else {
                //     var formattime = time
                //     var variable = 'seconds'
                // }

                // const statembed = new Discord.MessageEmbed()
                // .setColor('BLUE')
                // .setTitle(`**${client.user.username} Stats**`)
                // .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                // .addField("**Guild/Server Info**", `Servers: \`${client.guilds.cache.size}\`\n Channels: \`${client.channels.cache.size}\` \n Users: \`${client.guilds.cache.filter((e) => e.memberCount).reduce((a, g) => a + g.memberCount, 0)}\``)
                // .addField("**Cached Data:**", `Users: \`${client.users.cache.size}\`\n Emojis: \`${client.emojis.cache.size}\``)
                // .addField("**Performance**", `Ping: \`${(client.ws.ping.toFixed(2))}ms\` \n Uptime: \`${formattime.toFixed(2)}\` ${variable}`)
                // .addField("**Memory:**", `\`${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}\` MB RSS \n \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}\` MB Heap`, true)
                // .addField("**Node environment:**", ` \`${process.version} on ${process.platform} ${process.arch}\``)
                // .addField("**Version**", ` \`1.0\``)
                // .setFooter(`Requested by ${message.author.tag}`, client.user.displayAvatarURL())
                // .setTimestamp()

                // message.channel.send({ embeds: [statembed] })

    };
};