const { DiscordAPIError } = require("discord.js");

const channelvoice = 'You must first enter the voice channel!';

module.exports = {
  name: 'join',
  category: 'commands',
  description: 'The bot joins on the voice channel.',
  usage: `join`,
  run: async (client, message, args) => {
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
      await message.delete({timeout: 2000});
    } else {
      message.reply(channelvoice).then(d_msg => { d_msg.delete({timeout: 3000}); });
      message.delete({timeout: 2000});
    }
  }
}