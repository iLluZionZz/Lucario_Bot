/**
 *
 * @param {VoiceState} state
 */
 async function isVoiceChannelEmpty(state) {
    const voiceChannel = state.guild.me.voice.channel;
    if (!voiceChannel) return false;
    let members = await voiceChannel.members.filter((m) => !m.user.bot);
    return !members.size;
  }