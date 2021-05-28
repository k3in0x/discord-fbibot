const { Client, Collection } = require('discord.js');
const { config } = require('dotenv');
const fs = require('fs');
const mongoose = require('mongoose');
const client = new Client();

client.commands = new Collection();
client.aliases = new Collection();
client.mongoose = require('./utils/mongoose');

client.categories = fs.readdirSync('./commands/');

config({
    path: `${__dirname}/.env`
});

['command'].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

fs.readdir('./events/', (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const evt = require(`./events/${file}`);
        let evtName = file.split('.')[0];
        console.log(`Loaded event '${evtName}'`);
        client.on(evtName, evt.bind(null, client));
    });
});

// KEEP ALIVE REPL.IT
const keepAlive = require('./events/config');
const Monitor = require('ping-monitor');
 
keepAlive();
const monitor = new Monitor({
    website: 'LINK',
    title: 'Nombre',
    interval: 30 // minutes
});
 
monitor.on('up', (res) => console.log(`${res.website} está encedido.`));
monitor.on('down', (res) => console.log(`${res.website} se ha caído - ${res.statusMessage}`));
monitor.on('stop', (website) => console.log(`${website} se ha parado.`) );
monitor.on('error', (error) => console.log(error));

// END KEEP ALIVE

client.mongoose.init();
client.login(process.env.TOKEN);