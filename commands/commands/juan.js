const channelvoice = 'You must first enter the voice channel!';

module.exports = {
  name: 'juan',
  category: 'juan',
  description: 'The bot joins on the voice channel and says "ONICHAN" Hiper louded.',
  usage: `juan`,
  run: async (client, message, args) => {
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
      const dispatcher = connection.play('./audio/juan.mp3', {
          volume: 1,
        });
      await message.delete({timeout: 2000});
    } else {
      message.reply(channelvoice).then(d_msg => { d_msg.delete({timeout: 3000}); });
      message.delete({timeout: 2000});
    }
  }
}
