const ProfileModel = require("../../models/profileSchema");

module.exports = {
    name: 'scratch',
    aliases: ['ticket', 'scratchticket'],
    category: 'Economy',
    cooldown: 300,
    async execute (client, message, args, Discord,){
        let user = await ProfileModel.findOne({ userID: message.author.id });


        const euro = new Discord.MessageEmbed()
            .setColor('RED')
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL())
            .setDescription(`Invalid command usage!\nBet some money!\n\n\`s!scratch <amount>\``)
            
            // The money they would bet
        let moneyEarned = parseInt(args[0]);
        if (moneyEarned > user.coins) return message.reply({ embeds: [euro.setDescription(`You do not have that much money in your wallet!`)] })
        if (!moneyEarned) return message.reply({ embeds: [euro] })
        if (moneyEarned < 1000) return message.reply({ embeds: [euro.setDescription(`Please specify a number higher than \`1000\`!`)] })
        if (moneyEarned > 15000) return message.reply({ embeds: [euro.setDescription(`Please specify a number lower than \`15,000\`!`)] })
        if (isNaN(args[0])) return message.reply({ embeds: [euro.setDescription(`Please specify a valid number!`)] })

        let userQuery = { userID: message.author.id };
                await ProfileModel.updateOne(userQuery, {
                    "$inc": { "coins": -moneyEarned }
                });


        let clicks = 4;
        let options = {
            ic: '💵',
            jc: '🎰'
        }
        let positions = [
            {
                r: {
                    emoji: `${options.ic}`,
                    style: 'SUCCESS',
                    custom_id: 'r1',
                    disabled: true,
                    type: 2,

                },
                a: {
                    label: `-`,
                    style: 'SECONDARY',
                    custom_id: 'a1',
                    type: 2,
                }
            },
            {
                r: {
                    label: `-`,
                    style: 'DANGER',
                    custom_id: 'r2',
                    disabled: true,
                    type: 2,

                },
                a: {
                    label: `-`,
                    style: 'SECONDARY',
                    custom_id: 'a2',
                    type: 2,
                }
            },
            {
                r: {
                    emoji: `${options.ic}`,
                    style: 'SUCCESS',
                    custom_id: 'r3',
                    disabled: true,
                    type: 2,

                },
                a: {
                    label: `-`,
                    style: 'SECONDARY',
                    custom_id: 'a3',
                    type: 2,
                }
            },
            {
                r: {
                    emoji: `${options.ic}`,
                    style: 'SUCCESS',
                    custom_id: 'r4',
                    disabled: true,
                    type: 2,

                },
                a: {
                    label: `-`,
                    style: 'SECONDARY',
                    custom_id: 'a4',
                    type: 2,
                }
            },
            {
                r: {
                    label: `${options.jc}`,
                    style: 'PRIMARY',
                    custom_id: 'r5',
                    disabled: true,
                    type: 2,
                },
                a: {
                    label: `-`, //
                    style: 'SECONDARY',
                    custom_id: 'a5',
                    type: 2,
                }
            },
            {
                r: {
                    label: `-`,
                    style: 'DANGER',
                    custom_id: 'r6',
                    disabled: true,
                    type: 2,

                },
                a: {
                    label: `-`,
                    style: 'SECONDARY',
                    custom_id: 'a6',
                    type: 2,
                }
            },
            {
                r: {
                    emoji: `${options.ic}`,
                    style: 'SUCCESS',
                    custom_id: 'r7',
                    disabled: true,
                    type: 2,

                },
                a: {
                    label: `-`,
                    style: 'SECONDARY',
                    custom_id: 'a7',
                    type: 2,
                }
            },
            {
                r: {
                    label: `-`,
                    style: 'DANGER',
                    custom_id: 'r8',
                    disabled: true,
                    type: 2,

                },
                a: {
                    label: `-`,
                    style: 'SECONDARY',
                    custom_id: 'a8',
                    type: 2,
                }
            },
            {
                r: {
                    label: `-`,
                    style: 'DANGER',
                    custom_id: 'r9',
                    disabled: true,
                    type: 2,

                },
                a: {
                    label: `-`,
                    style: 'SECONDARY',
                    custom_id: 'a9',
                    type: 2,
                },
            },
            {
                r: {
                    label: `-`,
                    style: 'DANGER',
                    custom_id: 'r10',
                    disabled: true,
                    type: 2,

                },
                a: {
                    label: `-`,
                    style: 'SECONDARY',
                    custom_id: 'a10',
                    type: 2,
                },
            },
            {
                r: {
                    label: `-`,
                    style: 'DANGER',
                    custom_id: 'r11',
                    disabled: true,
                    type: 2,

                },
                a: {
                    label: `-`,
                    style: 'SECONDARY',
                    custom_id: 'a11',
                    type: 2,
                },
            },
            {
                r: {
                    emoji: `${options.ic}`,
                    style: 'SUCCESS',
                    custom_id: 'r12',
                    disabled: true,
                    type: 2,

                },
                a: {
                    label: `-`,
                    style: 'SECONDARY',
                    custom_id: 'a12',
                    type: 2,
                },
            },
            {
                r: {
                    emoji: `${options.ic}`,
                    style: 'SUCCESS',
                    custom_id: 'r13',
                    disabled: true,
                    type: 2,

                },
                a: {
                    label: `-`,
                    style: 'SECONDARY',
                    custom_id: 'a13',
                    type: 2,
                }
            },
            {
                r: {
                    emoji: `${options.ic}`,
                    style: 'SUCCESS',
                    custom_id: 'r14',
                    disabled: true,
                    type: 2,

                },
                a: {
                    label: `-`,
                    style: 'SECONDARY',
                    custom_id: 'a14',
                    type: 2,
                }
            },
            {
                r: {
                    emoji: `${options.ic}`,
                    style: 'SUCCESS',
                    custom_id: 'r15',
                    disabled: true,
                    type: 2,

                },
                a: {
                    label: `-`,
                    style: 'SECONDARY',
                    custom_id: 'a15',
                    type: 2,
                }
            },

        ];
        function shuffle(array) {
            let currentIndex = array.length, randomIndex;

            // While there remain elements to shuffle
            while (currentIndex != 0) {

                // Pick a remaining element
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                // And swap it with the current element
                [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]];
            }

            return array;
        }
        positions = shuffle(positions);
        let row1 = new Discord.MessageActionRow()
            .addComponents(positions[0].a, positions[1].a, positions[2].a)
        let row2 = new Discord.MessageActionRow()
            .addComponents(positions[3].a, positions[4].a, positions[5].a)
        let row3 = new Discord.MessageActionRow()
            .addComponents(positions[6].a, positions[7].a, positions[8].a)
        let row4 = new Discord.MessageActionRow()
            .addComponents(positions[9].a, positions[10].a, positions[11].a)
        let row5 = new Discord.MessageActionRow()
            .addComponents(positions[12].a, positions[13].a, positions[14].a)
            
            // Shuffling, putting random positions for the buttons
        let embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTimestamp()
            .setTitle(`${message.author.username}'s Scratch-Off`)
            .setDescription(`Money won: **${moneyEarned.toString()}** \n You can scratch **${clicks}** more field(s).`)
            .setFooter(message.guild.name, message.guild.iconURL())
            
            // The main embed (afterwards edited)

        let msg = await message.reply({ embeds: [embed], components: [row1, row2, row3, row4, row5] })
        const filter = i => i.user.id === message.author.id;
        let collector = msg.createMessageComponentCollector({
            filter,
            time: 120000,
            max: 4
        })
        collector.on('collect', async (i) => {
            if (!i.isButton()) return;
            i.deferUpdate();
            let used = positions.find(x => x.a.custom_id === i.customId);


            if (used.r.style === 'DANGER') {
                let moneylost = moneyEarned * 0.15
                moneyEarned -= Math.trunc(moneylost)
                clicks -= 1;
            }
            // If the button is red, user loses money and loses 1 scratch field 
            else if (used.r.style === 'SUCCESS') {
                let moneywon = moneyEarned * 0.02
                moneyEarned += Math.trunc(moneywon)
                clicks -= 1;
            }
            // If the buttons is green, user wins money and loses 1 scratch field
            else if (used.r.style === 'PRIMARY') {
                let moneyjackpot = moneyEarned * 10
                moneyEarned += moneyjackpot 
                clicks -= 1;
            }
            // If the button is primary, user wins the jackpot
            used.a = used.r;
            let row1 = new Discord.MessageActionRow()
                .addComponents(positions[0].a, positions[1].a, positions[2].a)
            row2 = new Discord.MessageActionRow()
                .addComponents(positions[3].a, positions[4].a, positions[5].a)
            row3 = new Discord.MessageActionRow()
                .addComponents(positions[6].a, positions[7].a, positions[8].a)
            row4 = new Discord.MessageActionRow()
                .addComponents(positions[9].a, positions[10].a, positions[11].a)
            row5 = new Discord.MessageActionRow()
                .addComponents(positions[12].a, positions[13].a, positions[14].a)
            embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`${message.author.username}'s Scratch-Off`)
                .setTimestamp()
                .setDescription(`Money won: **${moneyEarned.toLocaleString()}** \nYou can scratch **${clicks}** more field(s).`)
                .setFooter(message.guild.name, message.guild.iconURL())


            msg.edit({ embeds: [embed], components: [row1, row2, row3, row4, row5] })


        })
        collector.on('end', async (end) => {
            positions.forEach((g) => {
                g.a = g.r
                row1 = new Discord.MessageActionRow()
                    .addComponents(positions[0].a, positions[1].a, positions[2].a)
                row2 = new Discord.MessageActionRow()
                    .addComponents(positions[3].a, positions[4].a, positions[5].a)
                row3 = new Discord.MessageActionRow()
                    .addComponents(positions[6].a, positions[7].a, positions[8].a)
                row4 = new Discord.MessageActionRow()
                    .addComponents(positions[9].a, positions[10].a, positions[11].a)
                row5 = new Discord.MessageActionRow()
                    .addComponents(positions[12].a, positions[13].a, positions[14].a)
            })
            // Disable

            let userQuery = { userID: message.author.id };

                await ProfileModel.updateOne(userQuery, {
                    "$inc": { "coins": Math.trunc(moneyEarned) }
                });

                let user3 = await ProfileModel.findOne(userQuery);

            embed = new Discord.MessageEmbed()
                .setDescription(`You scratched: **${moneyEarned.toString()}** \nYou now have: **${user3.coins.toString()}** `)
                .setColor('RANDOM')
                .setTitle(`${message.author.username}'s Scratch-Off`)
                .setTimestamp()
                .setFooter(message.guild.name, message.guild.iconURL())
            msg.edit({ embeds: [embed], components: [row1, row2, row3, row4, row5] })

        })

    }
}