const channelvoice = 'You must first enter the voice channel!';

module.exports = {
    name: 'leave',
    category: 'commands',
    description: 'The bot leaves the voice channel.',
    usage: `leave`,
    run: async (client, message, args) => {
    message.guild.me.voice.channel.leave();
    await message.delete({timeout: 2000});
    }
}