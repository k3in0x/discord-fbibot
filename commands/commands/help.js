const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const Guild = require('../../models/guild');

module.exports = {
    name: 'help',
    aliases: ['h'],
    category: 'commands',
    description: 'Displays bot help message.',
    usage: `help [commandName]`,
    run: async (client, message, args) => {
        const settings = await Guild.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if (err) console.error(err)
            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: process.env.PREFIX
                })
    
                newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));
    
                return message.channel.send('This server was not in our database! We have now added and you should be able to use bot commands.').then(m => m.delete({timeout: 10000}));
            }
        });

        if (args[0]) {
            return getCMD(client, message, args[0]);
        } else {
            return helpMSG(client, message);
        }
    }
}

async function helpMSG(client, message) {
    const settings = await Guild.findOne({
        guildID: message.guild.id
    });

    const embed = new MessageEmbed()
        .setColor(process.env.COLOR)
        .setTitle('Command Help List')
        .setThumbnail(client.user.avatarURL())
        .setDescription(`For a full list of commands, please type \`${settings.prefix}commands\` \n\nTo see more info about a specific command, please type \`${settings.prefix}help <command>\` without the \`<>\``)
        .setFooter(client.user.username, client.user.displayAvatarURL());
        message.reply("Sent to DM").then(d_msg => { d_msg.delete({timeout: 3000}); });
        message.delete({timeout: 2000});
    message.author.send(embed);
}

async function getCMD(client, message, input) {
    const settings = await Guild.findOne({
        guildID: message.guild.id
    });

    const embed = new MessageEmbed()

    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));

    let info = `No information found for command **${input.toLowerCase()}**`;

    if (!cmd) {
        return message.channel.send(embed.setColor('#ff0000').setDescription(info));
    }

    if (cmd.name) info = `**Command Name**: ${cmd.name}`
    if (cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a => `\`{a}\``).join(', ')}`;
    if (cmd.description) info += `\n**Description**: ${cmd.description}`;
    if (cmd.usage) {
        info += `\n**Usage**: ${settings.prefix}${cmd.usage}`;
        embed.setFooter('<> = REQUIRED | [] = OPTIONAL')
    }
    if (cmd.usage2) info += `\n**Usage 2**: ${settings.prefix}${cmd.usage2}`;
    
    message.reply("Sended to DM").then(d_msg => { d_msg.delete({timeout: 3000}); });
    message.delete({timeout: 2000});
    return message.author.send(embed.setColor(process.env.COLOR).setDescription(info));
}