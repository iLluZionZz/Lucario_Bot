const profileModel = require("../../models/profileSchema");

module.exports = {
  name: "mine",
  aliases: [],
  cooldown: 30,
  permissions: [],
  description: "Mine for random rewards",
  async execute(client, message, args, Discord, cmd, profileData) {

    var d = Math.random();
    if (d <= 0.01) {
        
    }
    else if (d < 0.1){
        
    }
    else if (d <= 0.5) {
      
    }
    else {
        
    }

    const params = {
        serverID: (message.guild.id),
        userID: (message.author.id)
      }

    profileModel.findOne(params, async(err, data) => {
        if(data){

          if(data.inventory.length === 0){
            return message.channel.send(`You don't own any items, you cannot mine.`)
          }

          let i = 15
          if(data.inventory[i].itemqueryindex = 8){
              message.channel.send('Ayyeee')
          } else {
              return message.channel.send(`You don't own an explorer kit, and cannot go mining.`)
          }
        }
    })
  },
};