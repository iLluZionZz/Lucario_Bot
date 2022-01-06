const { MessageButton, MessageActionRow } = require("discord.js"); //MILRATO DISCORD
async function swap_pages(client, message, embeds) {
  let currentPage = 0;
  let cmduser = message.author;
  if (embeds.length === 1) return message.channel.send({embeds: [embeds[0]]}).catch(e => console.log("THIS IS TO PREVENT A CRASH"))
  let button_back = new MessageButton().setStyle('SUCCESS').setCustomId('1').setEmoji("◀️").setLabel("Back")
  let button_home = new MessageButton().setStyle('DANGER').setCustomId('2').setEmoji("🏠").setLabel("Home")
  let button_forward = new MessageButton().setStyle('SUCCESS').setCustomId('3').setEmoji('▶️').setLabel("Forward")
  const allbuttons = [new MessageActionRow().addComponents([button_back, button_home, button_forward])]
  let prefix = client.settings.get(message.guild.id, "prefix");
  //Send message with buttons
  let swapmsg = await message.channel.send({   
      content: `***Click on the __Buttons__ to swap the Pages***`,
      embeds: [embeds[0]], 
      components: allbuttons
  });
  //create a collector for the thinggy
  const collector = swapmsg.createMessageComponentCollector({filter: (i) => i.isButton() && i.user && i.user.id == cmduser.id && i.message.author.id == client.user.id, time: 180e3 }); //collector for 5 seconds
  //array of all embeds, here simplified just 10 embeds with numbers 0 - 9
  collector.on('collect', async b => {
      if(b.user.id !== message.author.id)
        return b.reply({content: `<:no:833101993668771842> **Only the one who typed ${prefix}help is allowed to react!**`, ephemeral: true})
        //page forward
        if(b.customId == "1") {
          //b.reply("***Swapping a PAGE FORWARD***, *please wait 2 Seconds for the next Input*", true)
            if (currentPage !== 0) {
              currentPage -= 1
              await swapmsg.edit({embeds: [embeds[currentPage]], components: allbuttons});
              await b.deferUpdate();
            } else {
                currentPage = embeds.length - 1
                await swapmsg.edit({embeds: [embeds[currentPage]], components: allbuttons});
                await b.deferUpdate();
            }
        }
        //go home
        else if(b.customId == "2"){
          //b.reply("***Going Back home***, *please wait 2 Seconds for the next Input*", true)
            currentPage = 0;
            await swapmsg.edit({embeds: [embeds[currentPage]], components: allbuttons});
            await b.deferUpdate();
        } 
        //go forward
        else if(b.customId == "3"){
          //b.reply("***Swapping a PAGE BACK***, *please wait 2 Seconds for the next Input*", true)
            if (currentPage < embeds.length - 1) {
                currentPage++;
                await swapmsg.edit({embeds: [embeds[currentPage]], components: allbuttons});
                await b.deferUpdate();
            } else {
                currentPage = 0
                await swapmsg.edit({embeds: [embeds[currentPage]], components: allbuttons});
                await b.deferUpdate();
            }
      }
  });
}