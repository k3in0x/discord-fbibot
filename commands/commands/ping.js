const { MessageEmbed } = require('discord.js');
const Client = require('../structures/Client');
const {Message} = require('discord.js');

module.exports = {
    name: 'ping',
    category: 'commands',
    description: 'Returns bot and API latency in milliseconds.',
    usage: `ping`,
   /**
    * @param {client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
      const msg = await message.channel.send(`Pinging...`)
      await msg.edit(client.embed({
        title: `🏓 Pong!`,
        description: `Bot Latency is **${client.ws.ping}ms**\n Message edit latency is **${msg.createdAt - message.createdAt}ms**`
      }, message));
      await msg.edit("").then(msg => { msg.delete({timeout: 10000})});
      message.delete({timeout: 2000});
     }
}
