module.exports = {
    name: 'pokemon',
    cooldown: 20,
    description: "Displays a list of Pokemon related content.",
    execute (client, message, args, Discord){
        const TCG = client.emojis.cache.get("858193859309862912")
        const Pokeball = client.emojis.cache.get("922906761340534826")
        const Unite = client.emojis.cache.get("858193465048039425")
        const Sword = client.emojis.cache.get("858193729592360970")
        const Shield = client.emojis.cache.get("858193738782474265")
        const Go = client.emojis.cache.get("858192695485661195")
        const Palkia = client.emojis.cache.get("858193272547573780")
        const Dialga = client.emojis.cache.get("858193144821710858")
        const Snap = client.emojis.cache.get("858194001772150855")
        const Legends = client.emojis.cache.get("858197527748673557")
        const PSV = client.emojis.cache.get("1080960021644464158")
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#0375ff')
        .setTitle('Pokemon Links!')
        .setDescription(`Did you mean " \`${process.env.PREFIX}pokedex\` "? Use this command instead to lookup Pokemon! \n This bot & server is not affiliated with the Pokemon company or Serebii.`)
        .addFields(
            {name: `All Things Pokemon ${Pokeball}`, value: `[The Pokemon Company](https://www.pokemon.com/us/) \n [Serebii](https://www.serebii.net/)`, inline: true},
            {name: `Pokemon TCG ${TCG}`, value: `[The Pokemon Company](https://www.pokemon.com/us/pokemon-tcg/) \n [Serebii Card Dex](https://www.serebii.net/card/english.shtml)`, inline: true},
            {name: `Pokemon Sword and Shield ${Sword}${Shield}`, value: `[The Pokemon Company](https://swordshield.pokemon.com/en-us/) \n [Serebii](https://www.serebii.net/swordshield/)`, inline: true},
            {name: `Pokemon Go ${Go}`, value: `[Niantic](https://pokemongolive.com/en/) \n [Serebii](https://www.serebii.net/pokemongo/)`, inline: true},
            {name: `Pokemon Snap ${Snap}`, value: '[The Pokemon Company](https://newpokemonsnap.pokemon.com/en-us/) \n [Serebii](https://www.serebii.net/newpokemonsnap/)', inline: true},
            {name: `Pokemon BD/SP ${Dialga}${Palkia}`, value: `[The Pokemon Company](https://diamondpearl.pokemon.com/en-us/) \n [Serebii](https://www.serebii.net/brilliantdiamondshiningpearl/)`, inline: true},
            {name: `Pokemon Legends: Arceus ${Legends}`, value: `[The Pokemon Company](https://legends.pokemon.com/en-us/) \n [Serebii](https://www.serebii.net/legendsarceus/)`, inline: true},
            {name: `Pokemon Scarlet/Violet ${PSV}`, value: `[The Pokemon Company](https://scarletviolet.pokemon.com/en-ca/s) \n [Serebii](https://www.serebii.net/scarletviolet/)`, inline: true},
            {name: `Pokemon Unite ${Unite}`, value: `[The Pokemon Company](https://unite.pokemon.com/en-us/) \n [Serebii](https://www.serebii.net/pokemonunite/)`, inline: true},
            {name: '\u200B', value: '\u200B', inline: true},
        )
        .setFooter('This message will be deleted in 20 seconds, to remove clutter.');

        message.channel.send({ embeds: [newEmbed] })
        .then(msg => {
            setTimeout(() => msg.delete(), 20000)
        })
        .catch()
    }
}