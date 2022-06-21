const profileModel = require("../../models/profileSchema");
const fs = require('fs');

module.exports = {
  name: 'mine',
  aliases: ['explore', 'underground'],
  category: 'Economy',
  cooldown: 300,
  async execute (client, message, args, Discord, ProfileData){

      const params = {
        serverID: (message.guild.id),
        userID: (message.author.id)
      }

      await profileModel.findOne(params, async(err, data) => {
        if(data){

          if(data.keyitems.length === 0){
            return message.channel.send(`You don't own any key items, you cannot mine.`)
          }
          
          let keyitems = [];
          for(i = 0; i < data.keyitems.length; i++){
            var itemLocation = data.keyitems[i].itemqueryindex
            keyitems.push(
              itemLocation
            );
          }
          console.log(keyitems)
          if(!keyitems.includes(4)){
            return message.channel.send(`You don't own an explorer kit, and cannot go mining.`)
          };
        }
    });

    let ground = client.emojis.cache.get("934937577708998746")
    let bluesphere = client.emojis.cache.get("934937848627478598")
    let redsphere = client.emojis.cache.get("934937890289504336")
    let greensphere = client.emojis.cache.get("934937857964011540")
    let prismsphere = client.emojis.cache.get("934937830629716060")
    let palesphere = client.emojis.cache.get("934937877488467978")
    let skullfossil = client.emojis.cache.get("934937916646502410")
    let domefossil = client.emojis.cache.get("934937754461147186")
    let clawfossil = client.emojis.cache.get("934937792428003429")
    let helixfossil = client.emojis.cache.get("934937778553253889")
    let rootfossil = client.emojis.cache.get("934937934350663711")

    let clicks = 6;
    let itemnames = [];
    let sphereoptions = {
        gs: greensphere,
        rs: redsphere,
        bs: bluesphere,
        ps: palesphere,
        prs: prismsphere,
    }
    let fossiloptions = {
        sf: skullfossil,
        df: domefossil,
        cf: clawfossil,
        hf: helixfossil,
        rf: rootfossil,
    }
    var keys = Object.keys(fossiloptions);
    const fossiloption = fossiloptions[keys[ keys.length * Math.random() << 0]];
    const randomfossiloption =  fossiloptions[Math.floor(Math.random()*fossiloptions.length)];
    let positions = [
        {
            r: {
                emoji: `${sphereoptions.gs}`,
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
                emoji: `${ground}`,
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
                emoji: `${sphereoptions.rs}`,
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
                emoji: `${sphereoptions.bs}`,
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
                emoji: `${fossiloption}`,
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
                emoji: `${ground}`,
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
                emoji: `${sphereoptions.prs}`,
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
                emoji: `${ground}`,
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
                emoji: `${ground}`,
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
                emoji: `${ground}`,
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
                emoji: `${ground}`,
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
                emoji: `${sphereoptions.gs}`,
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
                emoji: `${sphereoptions.rs}`,
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
                emoji: `${sphereoptions.bs}`,
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
                emoji: `${sphereoptions.ps}`,
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
        .setTitle(`${message.author.username}'s Mining Location`)
        .setDescription(`Items earned: \n You can mine **${clicks}** more parts of the wall before it gives out.`)
        .setFooter(message.guild.name, message.guild.iconURL())
        
        // The main embed (afterwards edited)

    let msg = await message.reply({ embeds: [embed], components: [row1, row2, row3, row4, row5] })
    const filter = i => i.user.id === message.author.id;
    let collector = msg.createMessageComponentCollector({
        filter,
        time: 120000,
        max: 6
    })
    let itemsfound = [];
    collector.on('collect', async (i) => {
        if (!i.isButton()) return;
        i.deferUpdate();
        let used = positions.find(x => x.a.custom_id === i.customId);

        if (used.r.style === 'DANGER') {
            clicks -= 1;
        }
        // If the button is red, user loses 1 mining attempt / field 
        else if (used.r.style === 'SUCCESS') {
          itemsfound.push(used.r.emoji)
          if(used.r.emoji == '<:palesphere:934937877488467978>'){
            itemnames.push('Pale Sphere')
          } else if(used.r.emoji == '<:greensphere:934937857964011540>'){
            itemnames.push('Green Sphere')
          } else if(used.r.emoji == '<:bluesphere:934937848627478598>'){
            itemnames.push('Blue Sphere')
          } else if(used.r.emoji == '<:redsphere:934937890289504336>'){
            itemnames.push('Red Sphere')
          } else if(used.r.emoji == '<:prismsphere:934937830629716060>'){
            itemnames.push('Prism Sphere')
          }

          clicks -= 1;
        }
        // If the buttons is green, user can continue to mine
        else if (used.r.style === 'PRIMARY') {
          itemsfound.push(used.r.emoji)
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
            .setTitle(`${message.author.username}'s Mining Location`)
            .setTimestamp()
            .setDescription(`Items found: ${itemsfound} \n You can mine **${clicks}** more tile(s).`)
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

        let shop_data = JSON.parse(Buffer.from(fs.readFileSync('./shop.json')).toString());

        let temp_items = Object.keys(shop_data.pages)
        .map(v => shop_data.pages[v].items);
        let items = [];

        temp_items.forEach(tmp_items => {
          items = items.concat(tmp_items)
        });

        profileModel.findOne(params, async(err, data) => {
          if(data){

            const counts = {};
            
            for(i = 0; i < itemnames.length; i++){
              let findname = itemnames[i]
              var item = items.find(v => v.name.toLowerCase() == findname.toLowerCase());
              itemnames.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
              let itemamount = Object.values(counts)
              if(!item){
                return message.channel.send("ERROR: Item location");
              }
              for(i = 0; i < data.inventory.length; i++) { //Loop through the inventory array
                if(data.inventory[i].itemqueryindex == item.QueryIndex) { //Check if inventory item is = to item they want to buy
                

                  await profileModel.findOneAndUpdate( //Update the amount of the item they already have, instead of adding a new object to the inventory array
                    {
                      userID: message.author.id, "inventory.itemqueryindex": item.QueryIndex
                    },
                    {
                      $inc: {
                        "inventory.$.amount": +itemamount
                      }
                    }
                  );
                  return

                }
              }
            };// Finish array loop

            for(i = 0; i < itemnames.length; i++){
              var findname = itemnames[i]
              itemnames.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
              let itemamount = Object.values(counts)
              let item = items.find(v => v.name.toLowerCase() == findname.toLowerCase());
              if(!item){
                return message.channel.send("ERROR: Item location");
              }

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
                        $each: [ {name: item.name, amount: itemamount, emoji: item.emoji, itemqueryindex: item.QueryIndex} ],
                        $sort: {itemqueryindex: 1},
                      }
                    }
                }
                );

            }
          }
        });

        embed = new Discord.MessageEmbed()
            .setDescription(`Items found: ${itemsfound.join('\n\t')}`)
            .setColor('RANDOM')
            .setTitle(`${message.author.username}'s Scratch-Off`)
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL())
        msg.edit({ embeds: [embed], components: [row1, row2, row3, row4, row5] })

    })

  }
}