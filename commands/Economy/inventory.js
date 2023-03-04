const profileModel = require("../../models/profileSchema");

module.exports = {
    name: "inventory",
    aliases: ['inv', 'bag'],
    cooldown: 10,
    async execute(client, message, args, Discord, profileData){

      const params = {
        serverID: (message.guild.id),
        userID: (message.author.id)
      }
      
      profileModel.findOne(params, async(err, data) => {
        if(data){

          if(data.inventory.length === 0){
            return message.channel.send('Your inventory is empty.')
          }
          

          let temp_items = data.inventory.map(item => item.name);
          let temp_items_amount = data.inventory.map(item => item.amount)
          let temp_items_emoji = data.inventory.map(item => item.emoji)
          console.log(temp_items_amount)
          console.log(temp_items)
          let items = [];
          
          for(i = 0; i < data.inventory.length; i++){
            var itemName = temp_items[i]
            var itemamount = temp_items_amount[i]
            var itemEmoji = temp_items_emoji[i]
            items.push({
              name: itemName,
              amount: itemamount,
              emoji: itemEmoji
            });
          };

          let coincase = client.emojis.cache.get("922991012626956368")
          let pokecoin = client.emojis.cache.get("860656640457441300")
          let pokeball = client.emojis.cache.get("922906761340534826")
          let greatball = client.emojis.cache.get("922906794156765226")
          let ultraball = client.emojis.cache.get("922906821797224479")
          let masterballemoji = client.emojis.cache.get("922906847474761748")

          items = items.map(item => `${item.emoji} **${item.name}** x\`${item.amount}\``)
  
          const inventory = new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setTitle("Inventory")
          .setAuthor(message.author.username, message.author.avatarURL())
          .addFields(
            { name: 'Currency', value: `${pokecoin} Pokecoins: \t${data.coins} \n ${coincase} Bank: \t${data.bank}`, inline: true},
            { name: 'Pokeballs', value: `${pokeball} ${data.pokeballs}x Pokeballs \n ${greatball} ${data.greatballs}x Greatballs \n ${ultraball} ${data.ultraballs}x Ultraballs \n ${masterballemoji} ${data.masterballs}x Masterballs`, inline: true},
            { name: 'Items', value: `${items.join('\n\t')}`}
          )
          .setTimestamp()
          .setFooter(message.guild.name, message.guild.iconURL())
      
          await message.channel.send({ embeds: [inventory] });

        }
      });
    }
  }