const guildNumber = new Map();
const guildAttempts = new Map();
const profileModel = require('../../models/profileSchema')

function guildNumberMap(message) {
    const guildId = message.guild.id;

    var number = Math.floor(Math.random() * 20000) + 1;
    // If there is no command running map for the guild, create one
    if (!guildNumber.get(guildId)) {
        guildNumber.set(guildId, number);
        console.log(number)
    }
}

function guildAttemptsMap(message) {
    const guildId = message.guild.id;
    // If there is no command running map for the guild, create one
    if (!guildAttempts.get(guildId)) {
        guildAttempts.set(guildId, { attempts: 1 });
    } else {
        guildAttempts.get(guildId).attempts++;
    }
}

module.exports = {
    name: "guesseasy",
    aliases: ['gtn', 'guess the number'],
    category: "games",
    description: {
        usage: 'guesseasy <guesseasy number>',
        content: "Try and guess the number!",
    },
    async execute(client, message, args, Discord, cmd, profileData) {
        const { member, channel, guild } = message;

        const provideaguess = new Discord.MessageEmbed()
            .setColor('#F30B04')
            .setDescription(`**❌ Please provide a guess!**`)

        const pickinganumber = new Discord.MessageEmbed()
            .setColor('#33F304')
            .setDescription(`**Picking a number between 1 and 20000** \n Please keep responding with ${process.env.PREFIX}gtn to continue guessing the number, I'll guide you!`)

        await guildNumberMap(message);
        await guildAttemptsMap(message);

        let guess = args[0];
        if (!guess && guildAttempts.get(guild.id).attempts === 1) {
            return channel.send({ embeds: [pickinganumber] })
        } else if (!guess) {
            return channel.send({ embeds: [provideaguess] });
        }

        if (+guess === guildNumber.get(guild.id)) {
            let attempts = guildAttempts.get(guild.id);
            if(attempts < 20){ var randomHIGHNumber = Math.floor(Math.random() * (10000 - 7500 + 1)) + 7500; } else {
                var randomLOWNumber = Math.floor(Math.random() * (5000 - 2500 + 1)) + 2500;
            }
            const calculatedcoins = randomHIGHNumber || randomLOWNumber;

            const guessedthenumber = new Discord.MessageEmbed()
                .setColor('#33F304')
                .setDescription(`✅ Perfect, <@${member.id}>the number was ${guildNumber.get(guild.id)}, it only took you ${attempts.attempts} attempts! \n As a reward, you recieved ${calculatedcoins} coins deposited into your bank.`)

            channel.send({ embeds: [guessedthenumber] });
            await profileModel.findOneAndUpdate(
                {
                    userID: member.id,
                },
                {
                    $inc: {
                    bank: calculatedcoins,
                    },
                }
                );
            guildNumber.delete(guild.id);
            guildAttempts.delete(guild.id);
            

            return;
        } else if (+ guess < guildNumber.get(guild.id)) {
            return message.reply(`${guess} Is too low!`);
        } else if (+guess > guildNumber.get(guild.id)) {
            return message.reply(`${guess} Is too high!`);
        } else {
            return message.reply("Invalid number please try again");
        }
    },
};