const fs = require('fs');
const profileModel = require("../../models/profileSchema");

module.exports = {
    name: "sell",
    async execute(client, message, args, Discord, profileData){
    let shop_data = JSON.parse(Buffer.from(fs.readFileSync('./shop.json')).toString());

    let temp_items = Object.keys(shop_data.pages)
    .map(v => shop_data.pages[v].items);
    let items = [];

    temp_items.forEach(tmp_items => {
      items = items.concat(tmp_items)
    });
    let input = args.slice(0).join(' ');
    let formatinput = input.replace(/ \d+$/, "")
    let item = items.find(v => v.name.toLowerCase() == formatinput.toLowerCase());

    if(!item){
      return message.channel.send("No item found");
    }

    const params = {
      serverID: (message.guild.id),
      userID: (message.author.id)
    }

    profileModel.findOne(params, async(err, data) => {
      if(data){
        
        if(data.inventory.length === 0){ //Checking if Inventory array is empty
          return message.channel.send(`You don't own any items, so you cannot sell anything.`)
        }

        if(item.CanBeSold == false){ //Checking if the item can be sold. If Item.CanBeSold = true, it can be sold. 
          return message.channel.send(`You cannot sell this item.`)
        }

        if (message.content.match(/[1-9]/g  )){ // Checking if args contains a digit for the amount of items they want
          let needsformatting = input.replace( /^\D+/g, ''); // replace all leading non-digits with nothing
          let bigamount = needsformatting.trim() // Get rid of literally any white spaces left
          var amounttosell = parseInt(bigamount) // Make sure it is an integer 
          if(isNaN(amounttosell)){
            return message.channel.send('An error occured - Number calculation') // Just in case. 
          }
        } else {
          var amounttosell = 1
        }

        let amounttosellmultiplier = (amounttosell * Math.round(item.cost * 2/3)) // Convert the amount they want to sell to the actual cash they get

        for(i = 0; i < data.inventory.length; i++) { //Loop through the inventory array
          if(data.inventory[i].itemqueryindex == item.QueryIndex) { //Check if inventory item is = to item they want to buy
            if(data.inventory[i].amount < amounttosell){ // If they want to sell more than they own, don't allow it. 
              return message.channel.send(`You cannot sell this many! You only own ${data.inventory[i].amount}`)
            }
            if(data.inventory[i].amount == amounttosell){ // Check if the inventory amount they currently own is equal to the amount they want to sell. If it is, then remove the object completely.
              await profileModel.findOneAndUpdate(
                {
                    userID: message.author.id,
                },
                {
                    $inc: {
                    coins: amounttosellmultiplier,
                    },
                    $pull: {
                      inventory: { 
                        itemqueryindex: item.QueryIndex
                      }
                    }
                }
                );
                return message.channel.send(`You have just sold ${amounttosell} ${item.name} for ${amounttosellmultiplier}`)
            };
            await profileModel.findOneAndUpdate( //Update the amount of the item they already have, instead of removing the object from the inventory array
              {
                userID: message.author.id, "inventory.itemqueryindex": item.QueryIndex
              },
              {
                $inc: {
                  coins: amounttosellmultiplier,
                  "inventory.$.amount": -amounttosell
                }
              }
            );
            return message.channel.send(`You have just sold ${amounttosell} ${item.name} for ${amounttosellmultiplier}`)
          }
        }// Finish array loop
        }
        if(err){
          console.log(err)
          message.channel.send('An error occured.')
          return
        }
        })
  
    }
  }
  