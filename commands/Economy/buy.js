
const fs = require('fs');
const profileModel = require("../../models/profileSchema");

module.exports = {
  name: "buy",
  async execute(client, message, args, Discord, cmd, profileData){
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

    let itemname = item.name.toLowerCase()

    const params = {
      serverID: (message.guild.id),
      userID: (message.author.id)
    }

    if (message.content.match(/[1-9]/g  )){ // Checking if args contains a digit for the amount of items they want
      let needsformatting = input.replace( /^\D+/g, ''); // replace all leading non-digits with nothing
      let bigamount = needsformatting.trim() // Get rid of literally any white spaces left
      var amountbought = parseInt(bigamount) // Make sure it is an integer 
      if(isNaN(amountbought)){
        return message.channel.send('An error occured - Number calculation') // Just in case. 
      }
    } else {
      var amountbought = 1
    }

    let costmultiplier = item.cost * amountbought
    console.log(costmultiplier)
    console.log(profileData.coins)
    if(costmultiplier > profileData.coins){ //Checking if they got enough moolah
      return message.channel.send("You cannot afford this item; transfer money to your wallet or get more!");
    }

    if(itemname === 'pokeball' || 'greatball' || 'ultraball'){
      var itemplaceholder = itemname+'s'
      console.log(itemplaceholder)

      await profileModel.findOneAndUpdate(
        {
            userID: message.author.id,
        },
        {
            $inc: {
            coins: -costmultiplier,
            [itemplaceholder]: +amountbought
            },
        }
        );
        message.channel.send(`You just bought ${amountbought} ${itemname}s!`)

        if(amountbought >= 10){
          var premierballamount = Math.floor(amountbought / 10)
        }
        if(premierballamount >= 1){
          await profileModel.findOneAndUpdate(
            {
              userID: message.author.id,
            },
            {
                $inc: {
                premierball: +premierballamount
                },
            }
            );
            message.channel.send(`..and you got ${premierballamount} Premierballs on the house!`)
        }
      return
    }


    profileModel.findOne(params, async(err, data) => {
      if(data){
        
        if(data.inventory.length === 0){ //Checking if Inventory array is empty
          message.channel.send(`Creating a new inventory, its empty in here! USERID: ${message.author.id}`)
        }

        if(item.OnlyBuyOne == true){ //Checking Item Uniqueness - if they already have 1 'key item', they cannot have another
          for(i = 0; i < data.inventory.length; i++) { //Loop through the inventory array
            if(data.inventory[i].itemqueryindex == item.QueryIndex) { //If the index number in database = item they're trying to buy, don't do anything
              return message.channel.send('You already own this item, you cannot buy another.')
            } 
          }
        }

        for(i = 0; i < data.inventory.length; i++) { //Loop through the inventory array
          if(data.inventory[i].itemqueryindex == item.QueryIndex) { //Check if inventory item is = to item they want to buy
            await profileModel.findOneAndUpdate( //Update the amount of the item they already have, instead of adding a new object to the inventory array
              {
                userID: message.author.id, "inventory.itemqueryindex": item.QueryIndex
              },
              {
                $inc: {
                  coins: -costmultiplier,
                  "inventory.$.amount": +amountbought
                }
              }
            );
            return message.channel.send(`You have just bought ${amountbought} ${item.name}`)
          }
        }// Finish array loop

        await profileModel.findOneAndUpdate( //If they dont already own the item, add a new object to the inventory containing the item
          {
              userID: message.author.id,
          },
          {
              $inc: {
              coins: -item.cost,
              },
              $push: {
                inventory: {
                  $each: [ {name: item.name, amount: amountbought, itemqueryindex: item.QueryIndex} ],
                  $sort: {itemqueryindex: 1},
                }
              }
          }
          );
          return message.channel.send(`You have just bought ${amountbought} brand new ${item.name}`)
        }
        if(err){
          console.log(err)
          message.channel.send('An error occured.')
          return
        }
        })
  }
}
