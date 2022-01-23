## Lucario_Bot Patch Notes 

#### Changelogs:

<br />
<p>v1.1.5 STABLE Release:<br />
<p>Created new Commands, Models & Tweaked old ones
-profile.js
-ready.js
-tcg.js
-switchcode.js
-pkmnhomecode.js
-pkmngocode.js
-safari.js
-prestige.js
<br />

<p>Added new economy commands and revamped all early text based commands to be pretty embeds instead.<br />
<p>Added a new 
<p>A few commands were removed. I won't be covering them all here. Most of them were causing bugs I couldn't fix myself, and some may return in the future once documentation gets a bit more descriptive then it current is.<br />

#### Squashed Bugs:
-Any commands that called for emojis could possibly crash the bot if they weren't already cached, so we've rectified that by preloading the emojis as the bot starts.

#### New Additions:

-The Profile command has been updated to include prestige levels, reputation, Pokemon connection codes & more. Trying to expand the economy profiles of everyone as wide as I can to bring together the community and other aspects of the bot.
-Added a Trading Card lookup command to find prices on cards and display them within embeds
-Added all of generation 8 Pokemon names to pokemon.txt
-Added usage keys/hints to important or difficult to understand commands
-Added ALL pokemon sprites to a new folder called pokemon-media; used for the new Pokemon hunting commands. I won't be uploading it to github due to its sensitive copyrighted content from the Pokemon company. 

Added new commands:
-Tcg.js
-Emoji.js
-prestige.js
-switchcode.js
-pkmnhomecode.js
-pkmngocode.js
-safari.js

Revamped commands:
-Profile.js
-Ready.js

Removed commands:
guildDelete event
MessageDelete event

#### Known Errors/Issues

<p>An actual stable release, holy crap!<br />
