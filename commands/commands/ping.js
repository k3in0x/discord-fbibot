const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    category: 'ping',
    description: 'Returns bot and API latency in milliseconds.',
    usage: `ping`,
    run: async (client, message, args) => {
        const msg = await message.channel.send('🏓 Pinging...',{timeout: 5000});

        const embed = new MessageEmbed()
        .setColor(process.env.COLOR)
        .setTitle('🏓 Pong!')
        .setDescription(`Bot Latency is **${Math.floor(msg.createdTimestamp - message.createdTimestamp)} ms** \nAPI Latency is **${Math.round(client.ws.ping)} ms**`);
        message.delete({timeout: 2000});
        message.channel.send(embed,{timeout: 5000});
    }
}
