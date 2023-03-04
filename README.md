## Lucario_Bot
Lucario Bot is a private Discord Bot made for a Pokemon Discord community. 
Although its use is private, its code is completely open sourced, and will remain that way until it becomes obsolete. If you care to use it- or blatantly rebrand it; is up to you. The github commits are not a complete representation of the bots functionality either way, since I may not commit every change.

Some of its features include:
- Basic Server Moderation
- Music Playing
- Basic Economy System
- A Pokemon Minigame similar to PokeMeow

Features I hope to include:
- Minigame similar to mining in Diamond and Pearl
- Minigame similar to the safari zone ft. Discord Buttons
- Voltorb switch??
- A more diverse range of commands, both in moderation, utility & general functionality. Really anything useful I can think of, I might implement.

Some of its commands are unfinished, and may be out of date with the current packages it uses.
If you do plan to use this bot, read package.json for the required installed packages in order to run; and create the following blank files:
- stats.json
- statsbackup.json
- warns.json
- keys.json

The .ENV file MUST contain:
- PREFIX - The prefix used for the bot.
- MONGODB_SRV - Token for logging into mongoDB 
- DISCORD_TOKEN - Bot Token for logging onto discord
- WELCOME - 0 or 1, for a welcome message - 1 turns it on. 

