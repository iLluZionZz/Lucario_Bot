const axios = require('axios');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const fs = require('fs')
const pokemon = require('pokemontcgsdk');
const pokemonsearch = require('pokemon');

pokemon.configure({ //REQUIRE https://dev.pokemontcg.io/ api key!
    apiKey: `${process.env.TCG_API_TOKEN}`
})

module.exports = {
    name: 'tcg',
    cooldown: 10,
    aliases: [`tradingcard`, 'cardsearch', 'card'],
    description: "Displays a Pokemon's card info",
    usage: "\` pokemonname \` \` cardtype \`: mega, v, vmax, ex",
    async execute(client, message, args, Discord) {
        const subtypearray = [
            "break",
            "baby",
            "basic",
            "ex",
            "gx",
            "legend",
            "mega",
            "rapid strike",
            "single strike",
            "special",
            "stadium",
            "supporter",
            "tag team",
            "v",
            "vmax"
          ];
        if (!args[0]) return message.reply("Enter a Pokemon name.");
        const formatname = args[0].charAt(0).toUpperCase() + args[0].slice(1);
        const formattolowercase = args[0].toLowerCase();
        if(pokemonsearch.all().includes(formatname)){ 
            var pokemonname = formattolowercase 
        } else {
            return message.channel.send(`${args[0]} is not a valid Pokemon name.`)
        };
        const reformattingargs1 = args.slice(1).join(' ')
        if(!args[1]){
            var subtype = ''
            var placeholderforsubtype = ''
        } else {
            if(subtypearray.includes(reformattingargs1.toLowerCase())){
                var placeholderforsubtype = ' subtypes:'
                var subtype = reformattingargs1.toUpperCase()
            } else {
                var subtype = ''
                var placeholderforsubtype = ''
            }
        };
        pokemon.card.where({ //WERE USING POKEMONTCG SDK instead of Axios because we have an extended rate limit api key
                q: `name:${pokemonname}${placeholderforsubtype}${subtype}`, orderBy: '-set.releaseDate', pageSize: 10, page: 1
            })
            .then( async result => {
                console.log(result)
                const AmountofCardsFound = parseInt(result.data.length);
                const backId = 'back'
                const forwardId = 'forward'
                const backButton = new MessageButton({
                    style: 'SECONDARY',
                    label: 'Back',
                    emoji: '⬅️',
                    customId: backId
                })
                const forwardButton = new MessageButton({
                    style: 'SECONDARY',
                    label: 'Forward',
                    emoji: '➡️',
                    customId: forwardId
                })

                const {
                    author,
                    channel
                } = message

                /**
                 * Creates an embed with guilds starting from an index.
                 * @param {number} start The index to start from.
                 * @returns {Promise<MessageEmbed>}
                 */
                const generateEmbed = async start => {
                    const current = result.data.slice(start, start + 1)
                    console.log(current)
                    if(current[0].legalities.standard == 'Legal'){
                        var verify1emoji = '✅'
                        var standardlegality = current[0].legalities.standard
                    } else {
                        var verify1emoji = '❌'
                        var standardlegality = 'Banned'
                    }
                    if(current[0].legalities.expanded == 'Legal'){
                        var verify2emoji = '✅'
                        var expandedlegality = current[0].legalities.expanded
                    } else {
                        var verify2emoji = '❌'
                        var expandedlegality = 'Banned'
                    }
                    if(!current[0].tcgplayer.prices.normal){
                        if(!current[0].tcgplayer.prices.holofoil){
                            if(!current[0].tcgplayer.prices.reverseHolofoil){
                                var tcgprice = 'Unknown'
                            } else {
                                const tcgpriceplaceholder3 = current[0].tcgplayer.prices.reverseHolofoil.market
                                const tcgpriceplaceholder33 = current[0].tcgplayer.prices.reverseHolofoil.low
                                var tcgprice = tcgpriceplaceholder3
                                var tcgpricelow =tcgpriceplaceholder33.toString()
                            }
                        } else {
                            const tcgpriceplaceholder1 = current[0].tcgplayer.prices.holofoil.market
                            const tcgpriceplaceholder11 = current[0].tcgplayer.prices.holofoil.low
                            var tcgprice = tcgpriceplaceholder1.toString()
                            var tcgpricelow =tcgpriceplaceholder11.toString()
                        }
                    } else {
                        const tcgpriceplaceholder2 = current[0].tcgplayer.prices.normal.market
                        const tcgpriceplaceholder22 = current[0].tcgplayer.prices.normal.low
                        var tcgprice = tcgpriceplaceholder2.toString()
                        var tcgpricelow =tcgpriceplaceholder22.toString()
                    }
                    return new MessageEmbed({
                        title: `${current[0].name} #${current[0].number}/${current[0].set.total}`,
                        description: `Showing card result ${start + 1} out of ${AmountofCardsFound}`,
                        fields: [
                            {
                                name: `Legality:`,
                                value: `Standard: ${verify1emoji} ${standardlegality} || Expanded: ${verify2emoji} ${expandedlegality}`,
                                inline: false,
                            },
                            {
                                name: `TCGPlayer Price:`,
                                value: `Market Price: [$${tcgprice} USD](${current[0].tcgplayer.url}) \n  Lowest Price: [$${tcgpricelow} USD](${current[0].tcgplayer.url})`,
                                inline: true,
                            },
                            {
                                name: `Additional Info:`,
                                value: `PCTGO Code: ${current[0].set.ptcgoCode} \n Release Date: ${current[0].set.releaseDate}`,
                                inline: true,
                            },
                        ],
                        image: {
                            url: `${current[0].images.large}`,
                        },
                        footer: {
                            text: `${current[0].set.name} - ${current[0].set.series}`,
                            icon_url: `${current[0].set.images.symbol}`,
                        },
                        
                    })
                }

                // Send the embeds if you only find one result, no need for buttons
                const noNeedForButtons = AmountofCardsFound <= 1
                const embedMessage = await channel.send({
                    embeds: [await generateEmbed(0)],
                    components: noNeedForButtons ? [] : [new MessageActionRow({
                        components: [forwardButton]
                    })]
                })
                // Exit if there is only one page of guilds (no need for all of this)
                if (noNeedForButtons) return

                // Collect button interactions (when a user clicks a button),
                // but only when the button as clicked by the original message author
                const collector = embedMessage.createMessageComponentCollector({
                    filter: ({
                        user
                    }) => user.id === author.id
                })

                let currentIndex = 0
                collector.on('collect', async interaction => {
                    // Increase/decrease index
                    interaction.customId === backId ? (currentIndex -= 1) : (currentIndex += 1)
                    // Respond to interaction by updating message with new embed
                    await interaction.update({
                        embeds: [await generateEmbed(currentIndex)],
                        components: [
                            new MessageActionRow({
                                components: [
                                    // back button if it isn't the start
                                    ...(currentIndex ? [backButton] : []),
                                    // forward button if it isn't the end
                                    ...(currentIndex + 1 < AmountofCardsFound ? [forwardButton] : [])
                                ]
                            })
                        ]
                    })
                })
            })
            .catch(err => { // Error handling for axios request using pokemonsearch
                console.log(err)
                if (err.response && err.response.status === 404){
                    return message.channel.send("There was an error connecting to the site to display card info.")
                } else if (err.response && err.response.status === 400){
                    return message.channel.send("That is not a valid search term.")
                } else if (err.response && err.response.status === 429){
                    return message.channel.send("I am rate limited, try again later.")
                };
            });
    }
}