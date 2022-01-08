## Lucario_Bot Patch Notes 

#### Changelogs:
<p>v1.1 STABLE Release:<br />
<p>Fixed deprecated commands from Discord.js v12. This includes:<br />
  <li>play.js</li>
<li>profile.js</li>
<li>leaderboard.js</li>
<li>buy.js</li>
<li>sell.js</li>
<li>claim&createkey.js</li>
<li>Any and ALL commands that use embeds</li>
  
<br />

<p>Music playing is finicky. It will work, but the changes in Discord.js v13 resulted in me removing the queue system completely and creating a new command from scratch. See Known Errors for more about this.<br />
<p>I've added a new Pokemon database in preperation for a new minigame involving catching Pokemon. You can see sneakpeeks in the github repo.<br />
<p>I added several moderation tools for ease of use & to help keep the bot online.<br />
<p>I've moved ALL Discord events to their respective folders, messagecreate is getting a bit large. Regardless, this should cut down on Bot restarting times.<br />
<p>A few commands were removed. I won't be covering them all here. Most of them were causing bugs I couldn't fix myself, and some may return in the future once documentation gets a bit more descriptive then it current is.<br />

#### Squashed Bugs:

<li>Fixed all bugs where the bot would crash after sending an embeds (Looking at you Djs v12)</li>
<li>Fixed Pokedex command fatally crashing the bot upon getting timed out from the host api</li>
<li>Fixed Buy command not registering difference between pokeballs, greatballs & ultraballs</li>
<li>Fixed Buy command only taking pokeballs as the item even when a different one was requested</li>
<li>Fixed Buy command's item cost not multiplying by the amount of items bought</li>
<li>Fixed a bug where if a person left the server, it would cause the bot to crash (fetching a user it cannot find)</li>
<li>Fixed a bug where buy multiple of the same item would create a duplicate object in the inventory array</li>
<li>Fixed Profile command not showing a users roles</li>
<br />

#### New Additions:

<li>New Discord voice channel games have been added. Join a voice channel using the link provided to start playing!</li>
<li>Several utility commands related to the bot's health and condition have been added.</li>
<li>New moderation commands make it ~~easier for me to abuse my powers~~ easier for moderators to utilise.</li>
<li>Started to prepare the bot for multi-guild (server) functionality. I may make the bot public if I get good enough at this.</li>
<li>I've added a welcome message, but have not turned it on. I will do this when I can host it somewhere other than my computer.</li>
<br />

Added new commands:
<li>Poker.js</li>
<li>Fishington.js</li>
<li>Betrayal.js</li>
<li>Randomnumber.js</li>
<li>Coinflip.js</li>
<li>Youtubetogether.js</li>
<li>remind.js</li>
<li>idban&idunban.js</li>
<li>showbans.js</li>
<li>serverinfo.js</li>
<li>ticket.js</li>
<li>botstats.js</li>
<li>uptime.js</li>
<li>restart.js</li>
<li>servers.js</li>
<br />

Revamped commands:
<li>RockPaperScissors.js</li>
<li>Avatar.js</li>
<li>lock&unlockchannels.js</li>
<li>play.js</li>
<br />

Removed commands:
<li>search.js</li>

#### Known Errors/Issues

<p>2 issues have been noticed upon this release:<br />
<p>YDTL-CORE has bitrate limitations with youtube video downloading and crashes mid video playing. This can sometimes result in fatal crashes- a subsitute will be found.<br />
<p>Betrayal.io tends to cause a user to lag out of the activity in the voice channel, but remain connected. I don't know the cause since it doesn't seem to be bot related.<br />
