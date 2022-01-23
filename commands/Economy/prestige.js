const profileModel = require("../../models/profileSchema");
module.exports = {
  name: "prestige",
  aliases: [],
  cooldown: 172800,
  permissions: [],
  description: "Prestige to earn more rewards",
  async execute(client, message, args, Discord, cmd, profileData) {
    if(fs.existsSync('stats.json')) {
        stats = jsonfile.readFileSync('stats.json'); // Load the Stats for XP system before everything else
    }
    const guildstats = stats[message.guild.id]
    const userStats = guildstats[message.author.id];

    if(userStats.level < 25){
        return message.channel.send('You cannot prestige yet.')
    };
    const amounttoprestige = 10000 * userStats.level * (profileData.prestige+1)
    if(profileData.bank < amounttoprestige) return message.channel.send(`You don't have the funds to prestige.. Transfer the funds to your bank and try again or get more money! \n Amount needed: ${amounttoprestige}`)
    if(profileData.prestige === 5) return message.channel.send(`You've already reached max prestige!`)
    const response = await profileModel.findOneAndUpdate(
      {
        userID: message.author.id,
      },
      {
        $inc: {
            bank: -1,
            prestige: +1,
        },
      }
    );
    return message.channel.send(`Congrats! You've prestiged to level ${profileData.prestige +1}`);
  },
};